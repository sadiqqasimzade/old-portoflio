# Generated by Django 4.0.6 on 2022-10-06 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_skill_technologies_skill_technologies'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='technology',
            options={'verbose_name_plural': 'Technologies'},
        ),
        migrations.AddField(
            model_name='project',
            name='github_link',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='technologies',
            field=models.ManyToManyField(to='api.technology'),
        ),
        migrations.AddField(
            model_name='project',
            name='title',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='technology',
            name='help_text_az',
            field=models.CharField(default='', max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='technology',
            name='help_text_en',
            field=models.CharField(default='', max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='technology',
            name='help_text_ru',
            field=models.CharField(default='', max_length=40),
            preserve_default=False,
        ),
    ]