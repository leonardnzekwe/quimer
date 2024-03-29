from django.apps import AppConfig


class ApiConfig(AppConfig):
    """App configuration for the API app."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "api"

    def ready(self):
        """Import signals when the app is ready."""
        import api.signals
