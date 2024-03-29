import graphene
from graphene_django.types import DjangoObjectType
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


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class IssuerType(DjangoObjectType):
    class Meta:
        model = Issuer
        fields = "__all__"


class IssuedYearType(DjangoObjectType):
    class Meta:
        model = IssuedYear
        fields = "__all__"


class SubjectType(DjangoObjectType):
    class Meta:
        model = Subject
        fields = "__all__"


class TopicType(DjangoObjectType):
    class Meta:
        model = Topic
        fields = "__all__"


class TestType(DjangoObjectType):
    class Meta:
        model = Test
        fields = "__all__"


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question
        fields = "__all__"


class AnswerType(DjangoObjectType):
    class Meta:
        model = Answer
        fields = "__all__"


class SessionType(DjangoObjectType):
    is_expired = graphene.Boolean()

    class Meta:
        model = Session
        fields = "__all__"

    def resolve_is_expired(self, info):
        return self.is_expired()


class UserResponseType(DjangoObjectType):
    class Meta:
        model = UserResponse
        fields = "__all__"
