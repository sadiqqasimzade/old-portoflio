# Generated by Django 4.1.3 on 2023-06-28 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_alter_about_text_az_alter_about_text_en_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='layout',
            name='something_went_wrong',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
    ]