# Generated by Django 3.0.6 on 2020-05-18 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0005_auto_20200518_1534'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='country',
            field=models.CharField(blank=True, max_length=250),
        ),
    ]
