from trips.models import CustomUser, Trip, Flight, Hotel, City, Activity, Cost
from rest_framework import serializers
from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'country']

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
        fields = ('url','trip_id','destination','start_date','end_date','status','planning_file','total_cost','flights','cities')

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    country = serializers.CharField(required=True, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(
                _("The two password fields didn't match."))
        return data

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.country = self.validated_data.get('country', '')
        user.save()
        return user