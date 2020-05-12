from django.contrib import admin
from .models import Trip, Flight, City, Hotel, Activity

# Register your models here.
admin.site.register(Trip)
admin.site.register(Flight)
admin.site.register(City)
admin.site.register(Hotel)
admin.site.register(Activity)
