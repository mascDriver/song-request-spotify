# Generated by Django 3.1.5 on 2021-01-18 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='stream_link',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
