# signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserResponse


@receiver(post_save, sender=UserResponse)
def calculate_session_score(sender, instance, created, **kwargs):
    """Signal handler to calculate the score of a session after a UserResponse object is created or updated."""
    instance.session.calculate_score()
