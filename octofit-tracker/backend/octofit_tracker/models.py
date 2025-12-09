from django.db import models

class Team(models.Model):
    id = models.CharField(primary_key=True, max_length=24, default=None, editable=False)
    name = models.CharField(max_length=100, unique=True)

class User(models.Model):
    id = models.CharField(primary_key=True, max_length=24, default=None, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')

class Activity(models.Model):
    id = models.CharField(primary_key=True, max_length=24, default=None, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    type = models.CharField(max_length=100)
    duration = models.IntegerField()  # minutes
    date = models.DateField()

class Workout(models.Model):
    id = models.CharField(primary_key=True, max_length=24, default=None, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)

class Leaderboard(models.Model):
    id = models.CharField(primary_key=True, max_length=24, default=None, editable=False)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='leaderboard')
    points = models.IntegerField(default=0)
