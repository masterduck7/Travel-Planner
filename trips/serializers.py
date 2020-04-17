from trips.models import Trip, Flight, Hotel, City
from rest_framework import serializers

class TripSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trip
        fields = "__all__"

class FlightSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Flight
        fields = "__all__"

class HotelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hotel
        fields = "__all__"

class CitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = City
        fields = "__all__"