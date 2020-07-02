from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import now

# Create your models here.


class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trips')
    trip_id = models.AutoField(primary_key=True)
    destination = models.CharField(max_length=250, blank=False)
    start_date = models.DateField(default=now, blank=False)
    end_date = models.DateField(default=now, blank=False)
    planning_file = models.CharField(max_length=250, blank=True)
    status = models.CharField( max_length=10, default="Active", blank=False )
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, default=0)

    def __str__(self):
        return self.destination

class Flight(models.Model):
    flight_id = models.AutoField(primary_key=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='flights')
    origin = models.CharField(max_length=250, blank=False)
    destination = models.CharField(max_length=250, blank=False)
    start_date = models.DateField(default=now, blank=False)
    end_date = models.DateField(default=now, blank=False)
    airline_name = models.CharField(max_length=100, blank=True)
    flight_number = models.CharField(max_length=20, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.destination

class City(models.Model):
    city_id = models.AutoField(primary_key=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='cities')
    name = models.CharField(max_length=250, blank=False)
    country = models.CharField(max_length=250, blank=True)
    map_link = models.CharField(max_length=250, blank=True)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, default=0)

    def __str__(self):
        return self.name

class Hotel(models.Model):
    hotel_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='hotels')
    name = models.CharField(max_length=250, blank=False)
    start_date = models.DateField(default=now, blank=False)
    end_date = models.DateField(default=now, blank=False)
    number_beds = models.CharField(max_length=2, blank=True)
    breakfast = models.BooleanField(default=False)
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    amount_paid = models.DecimalField(max_digits=8, decimal_places=2)
    amount_not_paid = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name

class Activity(models.Model):
    activity_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='activities')
    name = models.CharField(max_length=250, blank=False)
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    amount_paid = models.DecimalField(max_digits=8, decimal_places=2)
    amount_not_paid = models.DecimalField(max_digits=8, decimal_places=2)
    activity_date = models.DateField(default=now, blank=False)

    def __str__(self):
        return self.name

class Cost(models.Model):
    cost_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='costs')
    name = models.CharField(max_length=250, blank=False)
    total_price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name