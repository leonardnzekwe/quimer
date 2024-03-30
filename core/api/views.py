from rest_framework import viewsets, pagination
from api.models import (
    Subject,
    Topic,
    Test,
    Question,
    Answer,
    Session,
    UserResponse,
    Issuer,
)
from api.serializers import (
    UserSerializer,
    UserCRUDSerializer,
    IssuerSerializer,
    SubjectSerializer,
    TopicSerializer,
    TestSerializer,
    QuestionSerializer,
    AnswerSerializer,
    SessionSerializer,
    UserResponseSerializer,
)
from django.contrib.auth.models import User
from dj_rest_auth.views import LoginView
from rest_framework import status


class APILoginView(LoginView):
    """
    API Login View
    Login with username and password
    Returns the Auth Key and extra user data on successful authentication.
    """

    def get_response(self):
        """Customizes the response with extra data."""
        # Call the parent class method to get the default response
        response = super().get_response()

        response.data["user"] = UserSerializer(self.user).data

        return response

    def post(self, request, *args, **kwargs):
        # Call the parent class method to handle the login and return a customized response
        response = super().post(request, *args, **kwargs)

        # If the login is successful, customize the response
        if response.status_code == status.HTTP_200_OK:
            return self.get_response()

        return response


class CustomPagination(pagination.PageNumberPagination):
    """Custom pagination class to allow client to specify the page size."""

    page_size_query_param = "page_size"  # Client can specify the page size using the 'page_size' query parameter
    max_page_size = 100  # Maximum page size (optional)


class UserViewSet(viewsets.ModelViewSet):
    """API endpoint that allows users to be viewed or edited."""

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserCRUDSerializer
    pagination_class = CustomPagination


class IssuerViewSet(viewsets.ModelViewSet):
    """API endpoint that allows issuers to be viewed or edited."""

    queryset = Issuer.objects.all()
    serializer_class = IssuerSerializer
    pagination_class = CustomPagination


class SubjectViewSet(viewsets.ModelViewSet):
    """API endpoint that allows subjects to be viewed or edited."""

    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    pagination_class = CustomPagination


class TopicViewSet(viewsets.ModelViewSet):
    """API endpoint that allows topics to be viewed or edited."""

    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    pagination_class = CustomPagination


class TestViewSet(viewsets.ModelViewSet):
    """API endpoint that allows tests to be viewed or edited."""

    queryset = Test.objects.all()
    serializer_class = TestSerializer
    pagination_class = CustomPagination


class QuestionViewSet(viewsets.ModelViewSet):
    """API endpoint that allows questions to be viewed or edited."""

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    pagination_class = CustomPagination


class AnswerViewSet(viewsets.ModelViewSet):
    """API endpoint that allows answers to be viewed or edited."""

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    pagination_class = CustomPagination


class SessionViewSet(viewsets.ModelViewSet):
    """API endpoint that allows sessions to be viewed or edited."""

    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    pagination_class = CustomPagination


class UserResponseViewSet(viewsets.ModelViewSet):
    """API endpoint that allows user responses to be viewed or edited."""

    queryset = UserResponse.objects.all()
    serializer_class = UserResponseSerializer
    pagination_class = CustomPagination
