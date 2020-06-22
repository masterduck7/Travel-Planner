from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'trips', views.TripViewSet)
router.register(r'flights', views.FlightViewSet)
router.register(r'hotels', views.HotelViewSet)
router.register(r'cities', views.CityViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'costs', views.CostViewSet)
router.register(r'users', views.CustomUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]