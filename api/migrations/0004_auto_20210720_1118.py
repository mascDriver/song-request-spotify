# Generated by Django 3.1.5 on 2021-07-20 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210120_1207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='stream_link',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
