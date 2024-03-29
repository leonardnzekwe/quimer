from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import (
    IssuerViewSet,
    SubjectViewSet,
    TopicViewSet,
    TestViewSet,
    QuestionViewSet,
    AnswerViewSet,
    SessionViewSet,
    UserResponseViewSet,
)
from dj_rest_auth.views import (
    LoginView,
    LogoutView,
    UserDetailsView,
    PasswordChangeView,
)
from rest_framework_simplejwt.views import TokenVerifyView
from dj_rest_auth.jwt_auth import get_refresh_view

# Create a router and register viewsets with it
router = DefaultRouter()
router.register(r"issuers", IssuerViewSet)
router.register(r"subjects", SubjectViewSet)
router.register(r"topics", TopicViewSet)
router.register(r"tests", TestViewSet)
router.register(r"questions", QuestionViewSet)
router.register(r"answers", AnswerViewSet)
router.register(r"sessions", SessionViewSet)
router.register(r"user-responses", UserResponseViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    # API URL Routes
    path("", include(router.urls)),
    # API Auth Views
    path("auth/login/", LoginView.as_view(), name="auth_login"),
    path("auth/logout/", LogoutView.as_view(), name="auth_logout"),
    path("auth/user/", UserDetailsView.as_view(), name="rest_user_details"),
    path(
        "auth/password/change/",
        PasswordChangeView.as_view(),
        name="auth_password_change",
    ),
    path("auth/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("auth/token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
]
