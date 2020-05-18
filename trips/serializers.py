from trips.models import Trip, Flight, Hotel, City, Activity, Cost
from rest_framework import serializers

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ('url','trip_id','destination','start_date','end_date','status','planning_file')

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ('url','flight_id','trip','origin','destination','start_date',
        'end_date','airline_name','flight_number','price')

        def to_representation(self, instance):
            self.fields['trip'] =  TripSerializer(read_only=True)
            return super(FlightSerializer, self).to_representation(instance)

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('url','city_id','trip','name','map_link')

        def to_representation(self, instance):
            self.fields['trip'] =  TripSerializer(read_only=True)
            return super(CitySerializer, self).to_representation(instance)

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ('url','hotel_id','city','name','start_date','end_date','number_beds',
        'breakfast','total_price','amount_paid','amount_not_paid')

        def to_representation(self, instance):
            self.fields['city'] =  CitySerializer(read_only=True)
            return super(HotelSerializer, self).to_representation(instance)

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('url','activity_id','city','name','total_price','amount_paid','amount_not_paid','activity_date')

        def to_representation(self, instance):
            self.fields['city'] =  CitySerializer(read_only=True)
            return super(ActivitySerializer, self).to_representation(instance)

class CostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cost
        fields = ('url','cost_id','city','name','total_price')

        def to_representation(self, instance):
            self.fields['city'] =  CitySerializer(read_only=True)
            return super(CostSerializer, self).to_representation(instance)