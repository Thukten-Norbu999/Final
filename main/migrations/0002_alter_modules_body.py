# Generated by Django 4.2 on 2023-05-07 15:31

from django.db import migrations
import django_quill.fields


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modules',
            name='body',
            field=django_quill.fields.QuillField(max_length=10000),
        ),
    ]
