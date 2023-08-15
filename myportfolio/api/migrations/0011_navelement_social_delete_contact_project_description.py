# Generated by Django 4.1.2 on 2022-10-14 15:14

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_contact'),
    ]

    operations = [
        migrations.CreateModel(
            name='Navelement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_path', models.FileField(upload_to='frontend/images/', validators=[django.core.validators.FileExtensionValidator(['svg'])])),
                ('title_en', models.CharField(max_length=20)),
                ('title_ru', models.CharField(max_length=20)),
                ('title_az', models.CharField(max_length=20)),
                ('href', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Social',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('href', models.CharField(max_length=50)),
                ('file_path', models.FileField(upload_to='frontend/images/', validators=[django.core.validators.FileExtensionValidator(['svg'])])),
            ],
        ),
        migrations.DeleteModel(
            name='Contact',
        ),
        migrations.AddField(
            model_name='project',
            name='description',
            field=models.TextField(default='', max_length=480),
            preserve_default=False,
        ),
    ]
