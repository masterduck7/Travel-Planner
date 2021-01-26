# Generated by Django 3.0.7 on 2020-06-24 20:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('city_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=250)),
                ('country', models.CharField(blank=True, max_length=250)),
                ('map_link', models.CharField(blank=True, max_length=250)),
                ('total_cost', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Trip',
            fields=[
                ('trip_id', models.AutoField(primary_key=True, serialize=False)),
                ('destination', models.CharField(max_length=250)),
                ('start_date', models.DateField(default=django.utils.timezone.now)),
                ('end_date', models.DateField(default=django.utils.timezone.now)),
                ('planning_file', models.CharField(blank=True, max_length=250)),
                ('status', models.CharField(default='Active', max_length=10)),
                ('total_cost', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trips', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('hotel_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=250)),
                ('start_date', models.DateField(default=django.utils.timezone.now)),
                ('end_date', models.DateField(default=django.utils.timezone.now)),
                ('number_beds', models.CharField(blank=True, max_length=2)),
                ('breakfast', models.BooleanField(default=False)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('amount_paid', models.DecimalField(decimal_places=2, max_digits=8)),
                ('amount_not_paid', models.DecimalField(decimal_places=2, max_digits=8)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hotels', to='trips.City')),
            ],
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('flight_id', models.AutoField(primary_key=True, serialize=False)),
                ('origin', models.CharField(max_length=250)),
                ('destination', models.CharField(max_length=250)),
                ('start_date', models.DateField(default=django.utils.timezone.now)),
                ('end_date', models.DateField(default=django.utils.timezone.now)),
                ('airline_name', models.CharField(blank=True, max_length=100)),
                ('flight_number', models.CharField(blank=True, max_length=20)),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('trip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='flights', to='trips.Trip')),
            ],
        ),
        migrations.CreateModel(
            name='Cost',
            fields=[
                ('cost_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=250)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='costs', to='trips.City')),
            ],
        ),
        migrations.AddField(
            model_name='city',
            name='trip',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cities', to='trips.Trip'),
        ),
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('activity_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=250)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('amount_paid', models.DecimalField(decimal_places=2, max_digits=8)),
                ('amount_not_paid', models.DecimalField(decimal_places=2, max_digits=8)),
                ('activity_date', models.DateField(default=django.utils.timezone.now)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activities', to='trips.City')),
            ],
        ),
    ]