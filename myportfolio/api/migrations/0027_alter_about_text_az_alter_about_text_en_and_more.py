# Generated by Django 4.1.3 on 2023-06-28 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_alter_about_text_az_alter_about_text_en_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='about',
            name='text_az',
            field=models.TextField(max_length=800),
        ),
        migrations.AlterField(
            model_name='about',
            name='text_en',
            field=models.TextField(max_length=800),
        ),
        migrations.AlterField(
            model_name='about',
            name='text_ru',
            field=models.TextField(max_length=800),
        ),
    ]
