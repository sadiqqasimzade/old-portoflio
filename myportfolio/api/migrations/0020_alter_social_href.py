# Generated by Django 4.1.3 on 2022-11-04 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_layout_msg_invalid_email_layout_msg_sended_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='social',
            name='href',
            field=models.CharField(max_length=100),
        ),
    ]
