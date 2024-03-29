import graphene
from django.db.models import Q
from .mutations import (
    CreateUser,
    UpdateUser,
    DeleteUser,
    CreateIssuer,
    UpdateIssuer,
    DeleteIssuer,
    CreateIssuedYear,
    UpdateIssuedYear,
    DeleteIssuedYear,
    CreateSubject,
    UpdateSubject,
    DeleteSubject,
    CreateTopic,
    UpdateTopic,
    DeleteTopic,
    CreateTest,
    UpdateTest,
    DeleteTest,
    CreateQuestion,
    UpdateQuestion,
    DeleteQuestion,
    CreateAnswer,
    UpdateAnswer,
    DeleteAnswer,
    CreateSession,
    UpdateSession,
    DeleteSession,
    CreateUserResponse,
    UpdateUserResponse,
    DeleteUserResponse,
)
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
from api.models import (
    User,
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


# Mutation root class
class Mutation(graphene.ObjectType):
    # User mutations
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()

    # Issuer mutations
    create_issuer = CreateIssuer.Field()
    update_issuer = UpdateIssuer.Field()
    delete_issuer = DeleteIssuer.Field()

    # IssuedYear mutations
    create_issued_year = CreateIssuedYear.Field()
    update_issued_year = UpdateIssuedYear.Field()
    delete_issued_year = DeleteIssuedYear.Field()

    # Subject mutations
    create_subject = CreateSubject.Field()
    update_subject = UpdateSubject.Field()
    delete_subject = DeleteSubject.Field()

    # Topic mutations
    create_topic = CreateTopic.Field()
    update_topic = UpdateTopic.Field()
    delete_topic = DeleteTopic.Field()

    # Test mutations
    create_test = CreateTest.Field()
    update_test = UpdateTest.Field()
    delete_test = DeleteTest.Field()

    # Question mutations
    create_question = CreateQuestion.Field()
    update_question = UpdateQuestion.Field()
    delete_question = DeleteQuestion.Field()

    # Answer mutations
    create_answer = CreateAnswer.Field()
    update_answer = UpdateAnswer.Field()
    delete_answer = DeleteAnswer.Field()

    # Session mutations
    create_session = CreateSession.Field()
    update_session = UpdateSession.Field()
    delete_session = DeleteSession.Field()

    # UserResponse mutations
    create_user_response = CreateUserResponse.Field()
    update_user_response = UpdateUserResponse.Field()
    delete_user_response = DeleteUserResponse.Field()


class Query(graphene.ObjectType):
    users = graphene.List(
        UserType,
        id=graphene.Int(),
        first=graphene.Int(),
        last=graphene.Int(),
        search=graphene.String(),
    )
    issuers = graphene.List(
        IssuerType,
        id=graphene.Int(),
        first=graphene.Int(),
        last=graphene.Int(),
        search=graphene.String(),
    )
    issued_years = graphene.List(
        IssuedYearType,
        id=graphene.Int(),
        first=graphene.Int(),
        last=graphene.Int(),
        search=graphene.String(),
    )
    subjects = graphene.List(
        SubjectType,
        id=graphene.Int(),
        first=graphene.Int(),
        last=graphene.Int(),
        search=graphene.String(),
    )
    topics = graphene.List(
        TopicType,
        id=graphene.Int(),
        first=graphene.Int(),
        last=graphene.Int(),
        search=graphene.String(),
    )
    tests = graphene.List(
        TestType,
        id=graphene.Int(),
        first=graphene.Int(),
        last=graphene.Int(),
        search=graphene.String(),
    )
    questions = graphene.List(
        QuestionType,
        id=graphene.Int(),
        first=graphene.Int(),
        last=graphene.Int(),
        search=graphene.String(),
    )
    answers = graphene.List(
        AnswerType,
        id=graphene.Int(),
        first=graphene.Int(),
        last=graphene.Int(),
        search=graphene.String(),
    )
    sessions = graphene.List(
        SessionType,
        id=graphene.Int(),
        first=graphene.Int(),
        last=graphene.Int(),
        search=graphene.String(),
    )
    user_responses = graphene.List(
        UserResponseType,
        id=graphene.Int(),
        first=graphene.Int(),
        last=graphene.Int(),
        search=graphene.String(),
    )

    def resolve_users(
        self, info, id=None, first=None, last=None, search=None, **kwargs
    ):
        users = User.objects.all()

        if id:
            users = users.filter(id=id)

        if search:
            users = users.filter(
                Q(username__icontains=search) | Q(email__icontains=search)
            )

        if first:
            users = users[:first]
        elif last:
            total_count = users.count()
            start_index = max(total_count - last, 0)
            users = users[start_index:]

        return users

    def resolve_issuers(
        self, info, id=None, first=None, last=None, search=None, **kwargs
    ):
        issuers = Issuer.objects.all()

        if id:
            issuers = issuers.filter(id=id)

        if search:
            issuers = issuers.filter(name__icontains=search)

        if first:
            issuers = issuers[:first]
        elif last:
            total_count = issuers.count()
            start_index = max(total_count - last, 0)
            issuers = issuers[start_index:]

        return issuers

    def resolve_issued_years(
        self, info, id=None, first=None, last=None, search=None, **kwargs
    ):
        issued_years = IssuedYear.objects.all()

        if id:
            issued_years = issued_years.filter(id=id)

        if search:
            issued_years = issued_years.filter(year__icontains=search)

        if first:
            issued_years = issued_years[:first]
        elif last:
            total_count = issued_years.count()
            start_index = max(total_count - last, 0)
            issued_years = issued_years[start_index:]

        return issued_years

    def resolve_subjects(
        self, info, id=None, first=None, last=None, search=None, **kwargs
    ):
        subjects = Subject.objects.all()

        if id:
            subjects = subjects.filter(id=id)

        if search:
            subjects = subjects.filter(name__icontains=search)

        if first:
            subjects = subjects[:first]
        elif last:
            total_count = subjects.count()
            start_index = max(total_count - last, 0)
            subjects = subjects[start_index:]

        return subjects

    def resolve_topics(
        self, info, id=None, first=None, last=None, search=None, **kwargs
    ):
        topics = Topic.objects.all()

        if id:
            topics = topics.filter(id=id)

        if search:
            topics = topics.filter(name__icontains=search)

        if first:
            topics = topics[:first]
        elif last:
            total_count = topics.count()
            start_index = max(total_count - last, 0)
            topics = topics[start_index:]

        return topics

    def resolve_tests(
        self, info, id=None, first=None, last=None, search=None, **kwargs
    ):
        tests = Test.objects.all()

        if id:
            tests = tests.filter(id=id)

        if search:
            tests = tests.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )

        if first:
            tests = tests[:first]
        elif last:
            total_count = tests.count()
            start_index = max(total_count - last, 0)
            tests = tests[start_index:]

        return tests

    def resolve_questions(
        self, info, id=None, first=None, last=None, search=None, **kwargs
    ):
        questions = Question.objects.all()

        if id:
            questions = questions.filter(id=id)

        if search:
            questions = questions.filter(text__icontains=search)

        if first:
            questions = questions[:first]
        elif last:
            total_count = questions.count()
            start_index = max(total_count - last, 0)
            questions = questions[start_index:]

        return questions

    def resolve_answers(
        self, info, id=None, first=None, last=None, search=None, **kwargs
    ):
        answers = Answer.objects.all()

        if id:
            answers = answers.filter(id=id)

        if search:
            answers = answers.filter(text__icontains=search)

        if first:
            answers = answers[:first]
        elif last:
            total_count = answers.count()
            start_index = max(total_count - last, 0)
            answers = answers[start_index:]

        return answers

    def resolve_sessions(
        self, info, id=None, first=None, last=None, search=None, **kwargs
    ):
        sessions = Session.objects.all()

        if id:
            sessions = sessions.filter(id=id)

        if search:
            sessions = sessions.filter(
                Q(user_id__icontains=search) | Q(test_id__icontains=search)
            )

        if first:
            sessions = sessions[:first]
        elif last:
            total_count = sessions.count()
            start_index = max(total_count - last, 0)
            sessions = sessions[start_index:]

        return sessions

    def resolve_user_responses(
        self, info, id=None, first=None, last=None, search=None, **kwargs
    ):
        user_responses = UserResponse.objects.all()

        if id:
            user_responses = user_responses.filter(id=id)

        if search:
            user_responses = user_responses.filter(
                Q(session_id__icontains=search) | Q(question_id__icontains=search)
            )

        if first:
            user_responses = user_responses[:first]
        elif last:
            total_count = user_responses.count()
            start_index = max(total_count - last, 0)
            user_responses = user_responses[start_index:]

        return user_responses


# Define the schema with queries and mutations
schema = graphene.Schema(query=Query, mutation=Mutation)
