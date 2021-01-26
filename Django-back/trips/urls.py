from django.urls import include, path
from django.conf.urls import url
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'trips', views.TripViewSet)
router.register(r'flights', views.FlightViewSet)
router.register(r'hotels', views.HotelViewSet)
router.register(r'cities', views.CityViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'costs', views.CostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    url(r'^authenticate/', views.CustomObtainAuthToken.as_view()),
]