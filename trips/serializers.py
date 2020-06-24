from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from trips.models import Trip, Flight, Hotel, City, Activity, Cost


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ('url','flight_id','trip','origin','destination','start_date',
        'end_date','airline_name','flight_number','price')

        def to_representation(self, instance):
            self.fields['trip'] =  TripSerializer(read_only=True)
            return super(FlightSerializer, self).to_representation(instance)

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

class CitySerializer(serializers.ModelSerializer):
    hotels = HotelSerializer(many=True, read_only=True)
    activities = ActivitySerializer(many=True, read_only=True)
    costs = CostSerializer(many=True, read_only=True)
    class Meta:
        model = City
        fields = ('url','city_id','trip','country','name','map_link','total_cost','hotels','activities','costs')

        def to_representation(self, instance):
            self.fields['trip'] =  TripSerializer(read_only=True)
            return super(CitySerializer, self).to_representation(instance)

class TripSerializer(serializers.ModelSerializer):
    flights = FlightSerializer(many=True, read_only=True)
    cities = CitySerializer(many=True, read_only=True)
    class Meta:
        model = Trip
        fields = ('user','url','trip_id','destination','start_date','end_date','status','planning_file','total_cost','flights','cities')

        def to_representation(self, instance):
            self.fields['user'] =  UserSerializer(read_only=True)
            return super(TripSerializer, self).to_representation(instance)