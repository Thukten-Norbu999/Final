# Generated by Django 4.2 on 2023-05-24 14:42

import builtins
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_remove_category_course_course_cateogory'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(default=builtins.id, max_length=255),
        ),
        migrations.AlterField(
            model_name='course',
            name='cateogory',
            field=models.ForeignKey(default=builtins.id, on_delete=django.db.models.deletion.DO_NOTHING, to='main.category'),
        ),
    ]