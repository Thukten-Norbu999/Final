# Generated by Django 4.2 on 2023-05-28 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0021_course_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='image',
            field=models.ImageField(blank=True, default='default.jpg', upload_to='courses_thumbnail/'),
        ),
    ]
