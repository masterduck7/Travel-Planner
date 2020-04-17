from django.db import models
from datetime import datetime

# Create your models here.

class Trip(models.Model):
    destination = models.CharField(max_length=250, blank=False)
    start_date = models.DateTimeField(default=datetime.today(), blank=False)
    end_date = models.DateTimeField(default=datetime.today(), blank=False)
    planning_file = models.CharField(max_length=250, blank=True)

    def __str__(self):
        return self.destination

class Flight(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='flights')
    origin = models.CharField(max_length=250, blank=False)
    destination = models.CharField(max_length=250, blank=False)
    start_date = models.DateTimeField(default=datetime.today(), blank=False)
    end_date = models.DateTimeField(default=datetime.today(), blank=False)
    airline_name = models.CharField(max_length=100, blank=True)
    flight_number = models.CharField(max_length=20, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.destination

class City(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='cities')
    name_city = models.CharField(max_length=250, blank=False)
    map_link = models.CharField(max_length=250, blank=True)

    def __str__(self):
        return self.city

class Hotel(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='hotels')
    name = models.CharField(max_length=250, blank=False)
    start_date = models.DateTimeField(default=datetime.today(), blank=False)
    end_date = models.DateTimeField(default=datetime.today(), blank=False)
    number_beds = models.CharField(max_length=2, blank=True)
    breakfast = models.BooleanField(default=False)
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    amount_paid = models.DecimalField(max_digits=8, decimal_places=2)
    amount_not_paid = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name