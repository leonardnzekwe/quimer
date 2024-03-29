# serializers.py

from rest_framework import serializers
from .models import (
    Issuer,
    Subject,
    Topic,
    Test,
    Question,
    Answer,
    Session,
    UserResponse,
)


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
