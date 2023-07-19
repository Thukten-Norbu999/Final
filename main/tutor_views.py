from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Course, Modules, Category, Video,Thumbnail, Resource
from django.urls import reverse
from .forms import CourseForm

def create_course(request):
    
    return render(
        request,
        'tutor/create_course.html'
    )

def update_course(request):
    return render(
        request,
        'tutor/update_course.html'
    )

def delete_course(request):
    return render(
        request,
        'tutor/delete_course.html'
    )

@csrf_exempt
def createAPI(request):
    if request.method == 'POST':
        author = request.POST.get('author')
        title = request.POST.get('title')
        description =  request.POST.get('description')
        print((author, title, description))
        return JsonResponse((author, title, description),safe=False)