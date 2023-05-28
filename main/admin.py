from django.contrib import admin

from django.contrib.auth.models import User
from .models import Course, Modules, Category, Video, Thumbnail, Resource
# Register your models here.
admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Modules)
admin.site.register(Video)
admin.site.register(Thumbnail)
admin.site.register(Resource)