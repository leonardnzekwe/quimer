# Generated by Django 4.2.8 on 2024-04-02 02:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Answer",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("text", models.TextField()),
                ("is_correct", models.BooleanField(default=False)),
            ],
            options={
                "db_table": "answer",
                "ordering": ["text"],
            },
        ),
        migrations.CreateModel(
            name="IssuedYear",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("year", models.IntegerField(unique=True)),
            ],
            options={
                "db_table": "issued_year",
                "ordering": ["year"],
            },
        ),
        migrations.CreateModel(
            name="Issuer",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("description", models.TextField(blank=True, null=True)),
            ],
            options={
                "db_table": "issuer",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="Question",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("text", models.TextField()),
                (
                    "difficulty",
                    models.CharField(
                        choices=[
                            ("Easy", "Easy"),
                            ("Medium", "Medium"),
                            ("Hard", "Hard"),
                        ],
                        max_length=10,
                    ),
                ),
                ("answers", models.ManyToManyField(to="api.answer")),
                (
                    "issued_year",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.issuedyear"
                    ),
                ),
                (
                    "issuer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.issuer"
                    ),
                ),
            ],
            options={
                "db_table": "question",
                "ordering": ["text"],
            },
        ),
        migrations.CreateModel(
            name="Subject",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
            ],
            options={
                "db_table": "subject",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="Topic",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
            ],
            options={
                "db_table": "topic",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="Test",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200, unique=True)),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("description", models.TextField(blank=True, null=True)),
                ("minutes_duration", models.IntegerField(default=2)),
                ("questions", models.ManyToManyField(to="api.question")),
                (
                    "subject",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.subject"
                    ),
                ),
            ],
            options={
                "db_table": "test",
                "ordering": ["title"],
            },
        ),
        migrations.CreateModel(
            name="Session",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("start_time", models.DateTimeField(default=django.utils.timezone.now)),
                ("end_time", models.DateTimeField(blank=True, null=True)),
                ("score", models.FloatField(default=0.0)),
                (
                    "test",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.test"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "db_table": "session",
                "ordering": ["-start_time"],
            },
        ),
        migrations.AddField(
            model_name="question",
            name="subject",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="api.subject"
            ),
        ),
        migrations.AddField(
            model_name="question",
            name="topic",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="api.topic"
            ),
        ),
        migrations.CreateModel(
            name="UserResponse",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "chosen_answer",
                    models.ForeignKey(
                        blank=True,
                        default=None,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="api.answer",
                    ),
                ),
                (
                    "question",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.question"
                    ),
                ),
                (
                    "session",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.session"
                    ),
                ),
            ],
            options={
                "db_table": "user_response",
                "ordering": ["-session"],
                "unique_together": {("session", "question")},
            },
        ),
    ]
