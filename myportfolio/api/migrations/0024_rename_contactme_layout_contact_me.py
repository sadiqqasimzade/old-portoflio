# Generated by Django 4.1.3 on 2023-06-25 17:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_about_delete_feature'),
    ]

    operations = [
        migrations.RenameField(
            model_name='layout',
            old_name='contactme',
            new_name='contact_me',
        ),
    ]
