from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from uuid import uuid4

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Collections are dropped directly in MongoDB before running this command

        # Create teams
        marvel = Team.objects.create(id=str(uuid4()), name='Marvel')
        dc = Team.objects.create(id=str(uuid4()), name='DC')

        # Create users
        ironman = User.objects.create(id=str(uuid4()), name='Iron Man', email='ironman@marvel.com', team=marvel)
        captain = User.objects.create(id=str(uuid4()), name='Captain America', email='cap@marvel.com', team=marvel)
        superman = User.objects.create(id=str(uuid4()), name='Superman', email='superman@dc.com', team=dc)
        batman = User.objects.create(id=str(uuid4()), name='Batman', email='batman@dc.com', team=dc)

        # Create activities
        Activity.objects.create(id=str(uuid4()), user=ironman, type='Running', duration=30, date='2025-12-09')
        Activity.objects.create(id=str(uuid4()), user=captain, type='Swimming', duration=45, date='2025-12-08')
        Activity.objects.create(id=str(uuid4()), user=superman, type='Flying', duration=60, date='2025-12-07')
        Activity.objects.create(id=str(uuid4()), user=batman, type='Martial Arts', duration=40, date='2025-12-06')

        # Create workouts
        Workout.objects.create(id=str(uuid4()), name='Pushups', description='Upper body strength', difficulty='Medium')
        Workout.objects.create(id=str(uuid4()), name='Sprints', description='Speed training', difficulty='Hard')

        # Create leaderboard
        Leaderboard.objects.create(id=str(uuid4()), team=marvel, points=200)
        Leaderboard.objects.create(id=str(uuid4()), team=dc, points=180)

        self.stdout.write(self.style.SUCCESS('Database populated with superhero test data.'))
