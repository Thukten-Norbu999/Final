from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Course, Modules, Category, Video
from django.urls import reverse
# Create your views here.

def home(request):
    return render(
        request,
        'main/home.html'
    )

def course(request):
    courses = Course.objects.all()
    categories = Category.objects.all()
    return render(
        request,
        'main/courses.html',
        {'courses': courses, 
         'category': categories, 
        }
    )

def course_modules(request, course_title):
    course = get_object_or_404(Course, title=course_title)
    modules = Modules.objects.filter(course=course)
    
    return render(
        request,
        'main/course_modules.html',
        {'course':course,
        'modules':modules
    }
    )


def test_home(request):
    from django.template.defaultfilters import truncatewords_html
    categories = Category.objects.all
    courses = Course.objects.all
    des = truncatewords_html(Course.description, 50)
    return render(
        request,
        'main/test.html',
        {'courses':courses, 'des':des, 'categories':categories}
    )


###
import openai, os
from dotenv import load_dotenv
from django.http import JsonResponse

load_dotenv()

api_key = os.getenv("OPENAI_KEY", None)


def learn_module(request,course_title, module_name):
    course = get_object_or_404(Course, title=course_title)
    module = get_object_or_404(Modules, course=course, name=module_name)
    video = Video.objects.filter(modules=module)
    
    response = None
    if api_key is not None and  request.method == "POST":
        openai.api_key = api_key
        question = request.POST.get('question')
        prompt = question


        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=prompt,
            max_tokens=256,
            #stop='.',
            temperature=.1
        )
        
        #print(response['choices'][0]['text'])
    
    return render(request, 'main/learn_module.html', {'course': course, 'module': module, 'video':video})


