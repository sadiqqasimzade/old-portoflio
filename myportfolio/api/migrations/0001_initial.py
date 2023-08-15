# Generated by Django 4.0.6 on 2022-10-05 19:47

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_path', models.FileField(upload_to='frontend/images/', validators=[django.core.validators.FileExtensionValidator(['svg'])])),
                ('title_en', models.TextField(max_length=20)),
                ('title_ru', models.TextField(max_length=20)),
                ('title_az', models.TextField(max_length=20)),
                ('text_en', models.TextField(max_length=60)),
                ('text_ru', models.TextField(max_length=60)),
                ('text_az', models.TextField(max_length=60)),
            ],
        ),
    ]
