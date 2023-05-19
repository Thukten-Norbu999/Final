# Generated by Django 4.2 on 2023-05-13 16:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_remove_category_course_category_course'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='thumbnail',
            field=models.ImageField(default='stemified.png', upload_to='thumbnail'),
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('caption', models.CharField(blank=True, max_length=150, null=True)),
                ('video', models.FileField(upload_to='modules_vid')),
                ('modules', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.modules')),
            ],
        ),
    ]