# signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from api.models import Session, UserResponse
from datetime import timedelta


@receiver(post_save, sender=UserResponse)
def calculate_session_score(sender, instance, created, **kwargs):
    """Signal handler to calculate the score of a session after a UserResponse object is created or updated."""
    instance.session.calculate_score()


@receiver(post_save, sender=Session)
def calculate_session_endtime(sender, instance, created, **kwargs):
    """
    Signal handler to calculate the end time of a session
    after a Session object is created.
    """
    # set session endtime based on the start time of the session and duration of the test
    # the test duration is in minutes,
    # so calculate the endtime by adding the duration to the start time
    if created and instance.start_time:
        endtime = instance.start_time + timedelta(
            minutes=instance.test.minutes_duration
        )

        # save the calculated endtime to the session object
        instance.end_time = endtime
        instance.save()
