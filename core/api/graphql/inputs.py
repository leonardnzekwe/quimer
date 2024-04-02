from datetime import datetime
import graphene


class UserInput(graphene.InputObjectType):
    id = graphene.Int()
    username = graphene.String()
    email = graphene.String()
    first_name = graphene.String()
    last_name = graphene.String()
    password = graphene.String()


class IssuerInput(graphene.InputObjectType):
    id = graphene.Int()
    name = graphene.String()
    description = graphene.String(optional=True)


class IssuedYearInput(graphene.InputObjectType):
    id = graphene.Int()
    year = graphene.Int()


class SubjectInput(graphene.InputObjectType):
    id = graphene.Int()
    name = graphene.String()


class TopicInput(graphene.InputObjectType):
    id = graphene.Int()
    name = graphene.String()


class TestInput(graphene.InputObjectType):
    id = graphene.Int()
    title = graphene.String()
    description = graphene.String(optional=True)
    subject_id = graphene.Int()
    question_ids = graphene.List(graphene.Int)
    minutes_duration = graphene.Int(default_value=2)


class QuestionInput(graphene.InputObjectType):
    id = graphene.Int()
    text = graphene.String()
    answer_ids = graphene.List(graphene.Int)
    subject_id = graphene.Int()
    topic_id = graphene.Int()
    issuer_id = graphene.Int()
    issuer_year_id = graphene.Int()
    difficulty = graphene.String(choices=["Easy", "Medium", "Hard"])


class AnswerInput(graphene.InputObjectType):
    id = graphene.Int()
    text = graphene.String()
    is_correct = graphene.Boolean(default_value=False)


class SessionInput(graphene.InputObjectType):
    id = graphene.Int()
    user_id = graphene.Int()
    test_id = graphene.Int()


class UserResponseInput(graphene.InputObjectType):
    id = graphene.Int()
    session_id = graphene.Int()
    question_id = graphene.Int()
    chosen_answer_id = graphene.Int(nullable=True, optional=True, default_value=None)
