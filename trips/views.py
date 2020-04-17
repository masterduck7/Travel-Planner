from rest_framework import viewsets
from trips.models import Trip
from trips.serializers import TripSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer