# Generated by Django 4.1.3 on 2023-06-30 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_alter_skill_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='layout',
            name='loading',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
    ]
