# Generated by Django 4.0.6 on 2022-10-05 22:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_project_technology_skill'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='technology',
            name='name_az',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='name_ru',
        ),
    ]