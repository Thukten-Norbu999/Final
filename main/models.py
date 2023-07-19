from django.db import models
from django.contrib.auth.models import User
from django import forms
from django_quill.fields import QuillField
from tinymce.models import HTMLField
import uuid

import misaka
# Create your models here.


class Category(models.Model):
    #uuid = models.UUIDField(default=uuid.uuid4)
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name
    

class Course(models.Model):
    #uuid = models.UUIDField(default=uuid.uuid4)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='courses_thumbnail/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=200)
    description = HTMLField()
    
    class Meta:
        ordering = ['-updated_at','-created_at']

    def __str__(self):
        return self.title
    
    @staticmethod
    def get_image_url(obj):
        if obj.image and hasattr(obj.image, 'url'):
            return obj.image.url
        else:
            return '/media/courses_thumbnail/'


class Modules(models.Model):
    #uuid = models.UUIDField(default=uuid.uuid4)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="Modules")
    name = models.CharField(max_length=200)
    intro = HTMLField(null=True,blank=True)
    body = QuillField(max_length=10000)
    #md_vidLink = models.CharField(max_length=1000)
    #resource = models.FileField(upload_to='main/upload', default='default.pdf')
    def __str__(self):
        return f'{self.name}-{self.course.title}'

class SubModules(models.Model):
    module = models.ForeignKey(Modules, on_delete=models.CASCADE,  related_name="SubModules")
    name = models.CharField(max_length=150)
    body = QuillField(max_length=1000000)

    def __str__(self):
        return f'{self.name}-{self.module.name}'
    

class Video(models.Model):
    #uuid = models.UUIDField(def)
    caption = models.CharField(blank=True, null=True, max_length=150)
    modules = models.ForeignKey(Modules, on_delete=models.CASCADE)
    video = models.FileField(upload_to='modules_vid/%y')

    def __str__(self):
        return self.caption

class Thumbnail(models.Model):
    caption = models.CharField(blank=True, null=True, max_length=150)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='courses_thumbnail/%y')

    def __str__(self):
        return self.caption


class Resource(models.Model):
    courses = models.ForeignKey(Course, on_delete=models.CASCADE)
    modules = models.ForeignKey(Modules, on_delete=models.CASCADE)
    resource = models.FileField(upload_to='modules_resource/%y')

class Simulation(models.Model):
    pass

class Quiz(models.Model):
    module = models.ForeignKey(Modules, on_delete=models.CASCADE)

class QQuestions(models.Model):
    Quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

class QAnswers(models.Model):
    question = models.ForeignKey(QQuestions, on_delete=models.CASCADE)
    isRight = models.BooleanField(null=False)


