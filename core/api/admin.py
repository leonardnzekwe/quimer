import os
from django.contrib import admin
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


@admin.register(Issuer)
class IssuerAdmin(admin.ModelAdmin):
    """Custom admin panel settings for the Issuer model."""

    list_display = ("name",)
    search_fields = ("name",)


@admin.register(IssuedYear)
class IssuedYearAdmin(admin.ModelAdmin):
    """Custom admin panel settings for the IssuedYear model."""

    list_display = ("year",)
    search_fields = ("year",)


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    """Custom admin panel settings for the Subject model."""

    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    """Custom admin panel settings for the Topic model."""

    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    """Custom admin panel settings for the Test model."""

    list_display = (
        "title",
        "date_created",
        "subject",
        "description",
        "minutes_duration",
    )
    search_fields = (
        "title",
        "subject__name",
        "description",
        "date_created",
        "minutes_duration",
    )
    list_filter = ("date_created", "subject", "minutes_duration")


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    """Custom admin panel settings for the Question model."""

    list_display = ("text", "subject", "topic", "issuer", "issued_year", "difficulty")
    search_fields = (
        "text",
        "subject__name",
        "topic__name",
        "issuer__name",
        "issued_year__year",
        "difficulty",
    )
    list_filter = ("subject", "difficulty")


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    """Custom admin panel settings for the Answer model."""

    list_display = ("text", "is_correct")
    search_fields = ("text",)
    list_filter = ("is_correct",)


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    """Custom admin panel settings for the Session model."""

    list_display = ("user", "test", "start_time", "end_time", "score")
    search_fields = ("user__username", "test__title")
    list_filter = ("test",)


@admin.register(UserResponse)
class UserResponseAdmin(admin.ModelAdmin):
    """Custom admin panel settings for the UserResponse model."""

    list_display = ("session", "question", "chosen_answer")
    search_fields = ("session__user__username", "question__text", "chosen_answer__text")
    list_filter = ("session",)


# Admin Dashboard Settings
admin.site.site_header = os.getenv("SITE_HEADER", default="Quimer Admin Dashboard")
admin.site.site_title = os.getenv("SITE_TITLE", default="Quimer")
admin.site.index_title = os.getenv("SITE_INDEX_TITLE", default="Quimer System")
