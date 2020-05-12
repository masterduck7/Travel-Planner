from trips.models import Trip, Flight, Hotel, City, Activity
from rest_framework import serializers

class TripSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trip
        fields = ('url','trip_id','destination','start_date','end_date','status','planning_file')

class FlightSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Flight
        fields = ('url','flight_id','trip','origin','destination','start_date',
        'end_date','airline_name','flight_number','price')

class HotelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hotel
        fields = ('url','hotel_id','city','name','start_date','end_date','number_beds',
        'breakfast','total_price','amount_paid','amount_not_paid')

class CitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = City
        fields = ('url','city_id','trip','name','map_link')

class ActivitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Activity
        fields = ('url','activity_id','name','total_price','amount_paid','amount_not_paid','activity_date')