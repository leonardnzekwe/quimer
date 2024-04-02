import graphene
from api.models import (
    Issuer,
    IssuedYear,
    Subject,
    Topic,
    Test,
    Question,
    Answer,
    Session,
    UserResponse,
)
from django.contrib.auth.models import User
from .types import (
    UserType,
    IssuerType,
    IssuedYearType,
    SubjectType,
    TopicType,
    TestType,
    QuestionType,
    AnswerType,
    SessionType,
    UserResponseType,
)
from .inputs import (
    UserInput,
    IssuerInput,
    IssuedYearInput,
    SubjectInput,
    TopicInput,
    TestInput,
    QuestionInput,
    AnswerInput,
    SessionInput,
    UserResponseInput,
)


# User mutation classes
class CreateUser(graphene.Mutation):
    class Arguments:
        input = UserInput(required=True)

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, input):
        user_instance = User(
            username=input.username,
            email=input.email,
            first_name=input.first_name,
            last_name=input.last_name,
        )
        user_instance.set_password(input.password)
        user_instance.save()
        return CreateUser(user=user_instance)


class UpdateUser(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = UserInput(required=True)

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, id, input):
        user_instance = User.objects.get(pk=id)
        if user_instance:
            if input.username:
                user_instance.username = input.username
            if input.email:
                user_instance.email = input.email
            if input.first_name:
                user_instance.first_name = input.first_name
            if input.last_name:
                user_instance.last_name = input.last_name
            if input.password:
                user_instance.set_password(input.password)
            user_instance.save()
            return UpdateUser(user=user_instance)
        return UpdateUser(user=None)


class DeleteUser(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, id):
        user_instance = User.objects.get(pk=id)
        if user_instance:
            user_instance.delete()
            return DeleteUser(user=None)
        return None


# Issuer mutation classes
class CreateIssuer(graphene.Mutation):
    class Arguments:
        input = IssuerInput(required=True)

    issuer = graphene.Field(IssuerType)

    @staticmethod
    def mutate(root, info, input):
        issuer_instance = Issuer(name=input.name, description=input.description)
        issuer_instance.save()
        return CreateIssuer(issuer=issuer_instance)


class UpdateIssuer(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = IssuerInput(required=True)

    issuer = graphene.Field(IssuerType)

    @staticmethod
    def mutate(root, info, id, input):
        issuer_instance = Issuer.objects.get(pk=id)
        if issuer_instance:
            if input.name:
                issuer_instance.name = input.name
            if input.description:
                issuer_instance.description = input.description
            issuer_instance.save()
            return UpdateIssuer(issuer=issuer_instance)
        return UpdateIssuer(issuer=None)


class DeleteIssuer(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    issuer = graphene.Field(IssuerType)

    @staticmethod
    def mutate(root, info, id):
        issuer_instance = Issuer.objects.get(pk=id)
        if issuer_instance:
            issuer_instance.delete()
            return DeleteIssuer(issuer=None)
        return None


# IssuedYear mutation classes
class CreateIssuedYear(graphene.Mutation):
    class Arguments:
        input = IssuedYearInput(required=True)

    issued_year = graphene.Field(IssuedYearType)

    @staticmethod
    def mutate(root, info, input):
        issued_year_instance = IssuedYear(year=input.year)
        issued_year_instance.save()
        return CreateIssuedYear(issued_year=issued_year_instance)


class UpdateIssuedYear(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = IssuedYearInput(required=True)

    issued_year = graphene.Field(IssuedYearType)

    @staticmethod
    def mutate(root, info, id, input):
        issued_year_instance = IssuedYear.objects.get(pk=id)
        if issued_year_instance:
            if input.year:
                issued_year_instance.year = input.year
            issued_year_instance.save()
            return UpdateIssuedYear(issued_year=issued_year_instance)
        return UpdateIssuedYear(issued_year=None)


class DeleteIssuedYear(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    issued_year = graphene.Field(IssuedYearType)

    @staticmethod
    def mutate(root, info, id):
        issued_year_instance = IssuedYear.objects.get(pk=id)
        if issued_year_instance:
            issued_year_instance.delete()
            return DeleteIssuedYear(issued_year=None)
        return None


# Subject mutation classes
class CreateSubject(graphene.Mutation):
    class Arguments:
        input = SubjectInput(required=True)

    subject = graphene.Field(SubjectType)

    @staticmethod
    def mutate(root, info, input):
        subject_instance = Subject(name=input.name)
        subject_instance.save()
        return CreateSubject(subject=subject_instance)


class UpdateSubject(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = SubjectInput(required=True)

    subject = graphene.Field(SubjectType)

    @staticmethod
    def mutate(root, info, id, input):
        subject_instance = Subject.objects.get(pk=id)
        if subject_instance:
            if input.name:
                subject_instance.name = input.name
            subject_instance.save()
            return UpdateSubject(subject=subject_instance)
        return UpdateSubject(subject=None)


class DeleteSubject(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    subject = graphene.Field(SubjectType)

    @staticmethod
    def mutate(root, info, id):
        subject_instance = Subject.objects.get(pk=id)
        if subject_instance:
            subject_instance.delete()
            return DeleteSubject(subject=None)
        return None


# Topic mutation classes
class CreateTopic(graphene.Mutation):
    class Arguments:
        input = TopicInput(required=True)

    topic = graphene.Field(TopicType)

    @staticmethod
    def mutate(root, info, input):
        topic_instance = Topic(name=input.name)
        topic_instance.save()
        return CreateTopic(topic=topic_instance)


class UpdateTopic(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = TopicInput(required=True)

    topic = graphene.Field(TopicType)

    @staticmethod
    def mutate(root, info, id, input):
        topic_instance = Topic.objects.get(pk=id)
        if topic_instance:
            if input.name:
                topic_instance.name = input.name
            topic_instance.save()
            return UpdateTopic(topic=topic_instance)
        return UpdateTopic(topic=None)


class DeleteTopic(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    topic = graphene.Field(TopicType)

    @staticmethod
    def mutate(root, info, id):
        topic_instance = Topic.objects.get(pk=id)
        if topic_instance:
            topic_instance.delete()
            return DeleteTopic(topic=None)
        return None


# Test mutation classes
class CreateTest(graphene.Mutation):
    class Arguments:
        input = TestInput(required=True)

    test = graphene.Field(TestType)

    @staticmethod
    def mutate(root, info, input):
        test_instance = Test(
            title=input.title,
            description=input.description,
            subject_id=input.subject_id,
            minutes_duration=input.minutes_duration,
        )
        test_instance.save()
        test_instance.questions.set(input.question_ids)
        test_instance.save()
        return CreateTest(test=test_instance)


class UpdateTest(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = TestInput(required=True)

    test = graphene.Field(TestType)

    @staticmethod
    def mutate(root, info, id, input):
        test_instance = Test.objects.get(pk=id)
        if test_instance:
            if input.title:
                test_instance.title = input.title
            if input.description:
                test_instance.description = input.description
            if input.subject_id:
                test_instance.subject_id = input.subject_id
            if input.minutes_duration:
                test_instance.minutes_duration = input.minutes_duration
            if input.question_ids:
                test_instance.questions.set(input.question_ids)
            test_instance.save()
            return UpdateTest(test=test_instance)
        return UpdateTest(test=None)


class DeleteTest(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    test = graphene.Field(TestType)

    @staticmethod
    def mutate(root, info, id):
        test_instance = Test.objects.get(pk=id)
        if test_instance:
            test_instance.delete()
            return DeleteTest(test=None)
        return None


# Question mutation classes
class CreateQuestion(graphene.Mutation):
    class Arguments:
        input = QuestionInput(required=True)

    question = graphene.Field(QuestionType)

    @staticmethod
    def mutate(root, info, input):
        question_instance = Question(
            text=input.text,
            subject_id=input.subject_id,
            topic_id=input.topic_id,
            issuer_id=input.issuer_id,
            issuer_year_id=input.issuer_year_id,
            difficulty=input.difficulty,
        )
        question_instance.save()
        question_instance.answers.set(input.answer_ids)
        question_instance.save()
        return CreateQuestion(question=question_instance)


class UpdateQuestion(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = QuestionInput(required=True)

    question = graphene.Field(QuestionType)

    @staticmethod
    def mutate(root, info, id, input):
        question_instance = Question.objects.get(pk=id)
        if question_instance:
            if input.text:
                question_instance.text = input.text
            if input.answer_ids:
                question_instance.answers.set(input.answer_ids)
            if input.subject_id:
                question_instance.subject_id = input.subject_id
            if input.topic_id:
                question_instance.topic_id = input.topic_id
            if input.issuer_id:
                question_instance.issuer_id = input.issuer_id
            if input.issuer_year_id:
                question_instance.issuer_year_id = input.issuer_year_id
            if input.difficulty:
                question_instance.difficulty = input.difficulty
            question_instance.save()
            return UpdateQuestion(question=question_instance)
        return UpdateQuestion(question=None)


class DeleteQuestion(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    question = graphene.Field(QuestionType)

    @staticmethod
    def mutate(root, info, id):
        question_instance = Question.objects.get(pk=id)
        if question_instance:
            question_instance.delete()
            return DeleteQuestion(question=None)
        return None


# Answer mutation classes
class CreateAnswer(graphene.Mutation):
    class Arguments:
        input = AnswerInput(required=True)

    answer = graphene.Field(AnswerType)

    @staticmethod
    def mutate(root, info, input):
        answer_instance = Answer(
            text=input.text,
            is_correct=input.is_correct,
        )
        answer_instance.save()
        return CreateAnswer(answer=answer_instance)


class UpdateAnswer(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = AnswerInput(required=True)

    answer = graphene.Field(AnswerType)

    @staticmethod
    def mutate(root, info, id, input):
        answer_instance = Answer.objects.get(pk=id)
        if answer_instance:
            if input.text:
                answer_instance.text = input.text
            if input.is_correct is not None:
                answer_instance.is_correct = input.is_correct
            answer_instance.save()
            return UpdateAnswer(answer=answer_instance)
        return UpdateAnswer(answer=None)


class DeleteAnswer(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    answer = graphene.Field(AnswerType)

    @staticmethod
    def mutate(root, info, id):
        answer_instance = Answer.objects.get(pk=id)
        if answer_instance:
            answer_instance.delete()
            return DeleteAnswer(answer=None)
        return None


# Session mutation classes
class CreateSession(graphene.Mutation):
    class Arguments:
        input = SessionInput(required=True)

    session = graphene.Field(SessionType)

    @staticmethod
    def mutate(root, info, input):
        session_instance = Session(
            user_id=input.user_id,
            test_id=input.test_id,
        )
        session_instance.save()
        return CreateSession(session=session_instance)


class UpdateSession(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = SessionInput(required=True)

    session = graphene.Field(SessionType)

    @staticmethod
    def mutate(root, info, id, input):
        session_instance = Session.objects.get(pk=id)
        if session_instance:
            if input.user_id:
                session_instance.user_id = input.user_id
            if input.test_id:
                session_instance.test_id = input.test_id
            if input.time_limit:
                session_instance.time_limit = input.time_limit
            session_instance.save()
            return UpdateSession(session=session_instance)
        return UpdateSession(session=None)


class DeleteSession(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    session = graphene.Field(SessionType)

    @staticmethod
    def mutate(root, info, id):
        session_instance = Session.objects.get(pk=id)
        if session_instance:
            session_instance.delete()
            return DeleteSession(session=None)
        return None


# UserResponse mutation classes
class CreateUserResponse(graphene.Mutation):
    class Arguments:
        input = UserResponseInput(required=True)

    user_response = graphene.Field(UserResponseType)

    @staticmethod
    def mutate(root, info, input):
        user_response_instance = UserResponse(
            session_id=input.session_id,
            question_id=input.question_id,
            chosen_answer_id=input.chosen_answer_id,
        )
        user_response_instance.save()
        return CreateUserResponse(user_response=user_response_instance)


class UpdateUserResponse(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = UserResponseInput(required=True)

    user_response = graphene.Field(UserResponseType)

    @staticmethod
    def mutate(root, info, id, input):
        user_response_instance = UserResponse.objects.get(pk=id)
        if user_response_instance:
            if input.session_id:
                user_response_instance.session_id = input.session_id
            if input.question_id:
                user_response_instance.question_id = input.question_id
            if input.chosen_answer_id:
                user_response_instance.chosen_answer_id = input.chosen_answer_id
            user_response_instance.save()
            return UpdateUserResponse(user_response=user_response_instance)
        return UpdateUserResponse(user_response=None)


class DeleteUserResponse(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    user_response = graphene.Field(UserResponseType)

    @staticmethod
    def mutate(root, info, id):
        user_response_instance = UserResponse.objects.get(pk=id)
        if user_response_instance:
            user_response_instance.delete()
            return DeleteUserResponse(user_response=None)
        return None
