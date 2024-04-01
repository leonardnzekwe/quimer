import graphene


class UserInput(graphene.InputObjectType):
    id = graphene.ID()
    username = graphene.String()
    email = graphene.String()
    first_name = graphene.String()
    last_name = graphene.String()
    password = graphene.String()


class IssuerInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String()
    description = graphene.String(optional=True)


class IssuedYearInput(graphene.InputObjectType):
    id = graphene.ID()
    year = graphene.Int()


class SubjectInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String()


class TopicInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String()


class TestInput(graphene.InputObjectType):
    id = graphene.ID()
    title = graphene.String()
    description = graphene.String(optional=True)
    subject_id = graphene.ID()
    question_ids = graphene.List(graphene.ID)


class QuestionInput(graphene.InputObjectType):
    id = graphene.ID()
    text = graphene.String()
    answer_ids = graphene.List(graphene.ID)
    subject_id = graphene.ID()
    topic_id = graphene.ID()
    issuer_id = graphene.ID()
    issuer_year_id = graphene.ID()
    difficulty = graphene.String(choices=["Easy", "Medium", "Hard"])


class AnswerInput(graphene.InputObjectType):
    id = graphene.ID()
    text = graphene.String()
    is_correct = graphene.Boolean(default_value=False)


class SessionInput(graphene.InputObjectType):
    id = graphene.ID()
    user_id = graphene.ID()
    test_id = graphene.ID()
    start_time = graphene.String(optional=True)
    end_time = graphene.String(optional=True)
    time_limit = graphene.Int(optional=True)
    score = graphene.Float(optional=True)


class UserResponseInput(graphene.InputObjectType):
    id = graphene.ID()
    session_id = graphene.ID()
    question_id = graphene.ID()
    chosen_answer_id = graphene.ID()
