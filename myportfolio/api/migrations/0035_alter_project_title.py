# Generated by Django 4.1.2 on 2023-07-05 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_alter_layout_portfolio_page_helper'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='title',
            field=models.CharField(max_length=40),
        ),
    ]
