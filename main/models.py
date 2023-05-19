from django.db import models
from django.contrib.auth.models import User
from django import forms
from django_quill.fields import QuillField
from tinymce.models import HTMLField
import uuid

import misaka
# Create your models here.



class Course(models.Model):
    #uuid = models.UUIDField(default=uuid.uuid4)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    thumbnail = models.ImageField(default="stemified.png",upload_to='thumbnail')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=200)
    description = HTMLField()
    
    class Meta:
        ordering = ['-updated_at','-created_at']

    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=255, default='None')
    course = models.ManyToManyField(Course, related_name='categories')
    def __str__(self):
        return self.name

class Modules(models.Model):
    #uuid = models.UUIDField(default=uuid.uuid4)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="Modules")
    name = models.CharField(max_length=200)
    intro = HTMLField(null=True,blank=True)
    body = QuillField(max_length=10000)
    resource = models.FileField(upload_to='main/upload', default='default.pdf')
    def __str__(self):
        return self.name

class Video(models.Model):
    #uuid = models.UUIDField(def)
    caption = models.CharField(blank=True, null=True, max_length=150)
    modules = models.ForeignKey(Modules, on_delete=models.CASCADE)
    video = models.FileField(upload_to='modules_vid/%y')

    def __str__(self):
        return self.caption

class Quiz(models.Model):
    module = models.ForeignKey(Modules, on_delete=models.CASCADE)

class QQuestions(models.Model):
    Quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

class QAnswers(models.Model):
    question = models.ForeignKey(QQuestions, on_delete=models.CASCADE)
    isRight = models.BooleanField(null=False)


