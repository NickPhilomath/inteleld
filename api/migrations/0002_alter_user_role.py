# Generated by Django 4.2.8 on 2024-01-09 05:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('dev', 'Developer'), ('own', 'Owner'), ('adm', 'Admin'), ('dis', 'Dispatcher'), ('upd', 'Updater'), ('flm', 'Fleet manager'), ('sam', 'Safety manager'), ('acc', 'Accountant'), ('gue', 'Guest')], max_length=3),
        ),
    ]
