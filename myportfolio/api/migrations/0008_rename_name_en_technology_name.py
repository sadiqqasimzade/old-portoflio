# Generated by Django 4.0.6 on 2022-10-06 19:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_technology_options_project_github_link_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='technology',
            old_name='name_en',
            new_name='name',
        ),
    ]