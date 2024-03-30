from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import (
    Issuer,
    Subject,
    Topic,
    Test,
    Question,
    Answer,
    Session,
    UserResponse,
)


class UserCRUDSerializer(serializers.ModelSerializer):
    """A serializer for the User model. Used for CRUD operations."""

    class Meta:
        model = User
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    """A serializer for the User model. Used for read-only operations."""

    last_login = serializers.DateTimeField(format="%A, %B %d, %Y %I:%M %p")
    date_joined = serializers.DateTimeField(format="%A, %B %d, %Y %I:%M %p")

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "last_login",
            "date_joined",
            "is_active",
        ]


class IssuerSerializer(serializers.ModelSerializer):
    """A serializer for the Issuer model."""

    class Meta:
        model = Issuer
        fields = "__all__"


class SubjectSerializer(serializers.ModelSerializer):
    """A serializer for the Subject model."""

    class Meta:
        model = Subject
        fields = "__all__"


class TopicSerializer(serializers.ModelSerializer):
    """A serializer for the Topic model."""

    class Meta:
        model = Topic
        fields = "__all__"


class TestSerializer(serializers.ModelSerializer):
    """A serializer for the Test model."""

    class Meta:
        model = Test
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    """A serializer for the Question model."""

    class Meta:
        model = Question
        fields = "__all__"


class AnswerSerializer(serializers.ModelSerializer):
    """A serializer for the Answer model."""

    class Meta:
        model = Answer
        fields = "__all__"


class SessionSerializer(serializers.ModelSerializer):
    """A serializer for the Session model."""

    class Meta:
        model = Session
        fields = "__all__"


class UserResponseSerializer(serializers.ModelSerializer):
    """A serializer for the UserResponse model."""

    class Meta:
        model = UserResponse
        fields = "__all__"
