from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Issuer(models.Model):
    """Model representing the issuer of a test. An issuer is associated with multiple tests."""

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "issuer"
        ordering = ["name"]


class IssuedYear(models.Model):
    """Model representing the year in which a test was issued. An issued year is associated with multiple questions."""

    year = models.IntegerField(unique=True)

    def __str__(self):
        return str(self.year)

    class Meta:
        db_table = "issued_year"
        ordering = ["year"]


class Subject(models.Model):
    """Model representing a subject. A subject is associated with multiple tests and questions."""

    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "subject"
        ordering = ["name"]


class Topic(models.Model):
    """Model representing a topic. A topic is associated with multiple tests."""

    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "topic"
        ordering = ["name"]


class Test(models.Model):
    """Model representing a test. A test is associated with an issuer, a subject, and multiple topics."""

    title = models.CharField(max_length=200, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)
    description = models.TextField(null=True, blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    questions = models.ManyToManyField("Question")
    minutes_duration = models.IntegerField(default=2)  # Duration of the test in minutes

    def __str__(self):
        return self.title

    class Meta:
        db_table = "test"
        ordering = ["title"]


class Question(models.Model):
    """Model representing a question. A question is associated with a subject and multiple topics."""

    DIFFICULTY_CHOICES = [
        ("Easy", "Easy"),
        ("Medium", "Medium"),
        ("Hard", "Hard"),
    ]
    text = models.TextField()
    answers = models.ManyToManyField("Answer")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    issuer = models.ForeignKey(Issuer, on_delete=models.CASCADE)
    issued_year = models.ForeignKey(IssuedYear, on_delete=models.CASCADE)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)

    def __str__(self):
        return self.text

    class Meta:
        db_table = "question"
        ordering = ["text"]


class Answer(models.Model):
    """Model representing an answer. An answer is associated with a question."""

    text = models.TextField()
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

    class Meta:
        db_table = "answer"
        ordering = ["text"]


class Session(models.Model):
    """
    Model representing a session.
    A session is associated with a user, a test, and multiple user responses.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(null=True, blank=True)
    score = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.user.username}'s session for {self.test.title}"

    def is_expired(self):
        # Check if end_time attribute is set
        if self.end_time:
            # Check if end_time has passed the current time
            return timezone.now() > self.end_time

        # Calculate the expiration time based on start_time and test duration
        expiration_time = self.start_time + timezone.timedelta(
            minutes=self.test.minutes_duration
        )

        # Check if current time is greater than expiration time
        if timezone.now() > expiration_time:
            # If current time exceeds expiration time, return True indicating object is expired
            return True

        # If none of the conditions are met, return False indicating object is not expired
        return False

    def calculate_score(self):
        # Count the total number of questions in the test
        total_questions = self.test.questions.count()

        # Filter the UserResponse objects related to this instance (self)
        # to get only those where the chosen_answer is correct
        correct_responses = self.userresponse_set.filter(
            chosen_answer__is_correct=True
        ).count()

        # Calculate the score by dividing the number of correct responses
        # by the total number of questions and multiplying by 100 to get a percentage
        self.score = (correct_responses / total_questions) * 100

        # Save the calculated score to the instance
        self.save()

    class Meta:
        db_table = "session"
        ordering = ["-start_time"]


class UserResponse(models.Model):
    """Model representing a user's response to a question in a session. A user response is associated with a session, a question, and an answer."""

    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    chosen_answer = models.ForeignKey(
        Answer, on_delete=models.SET_NULL, null=True, blank=True, default=None
    )

    def __str__(self):
        return f"{self.session.user.username}'s response for {self.question.text}"

    class Meta:
        db_table = "user_response"
        ordering = ["-session"]
        unique_together = ["session", "question"]
