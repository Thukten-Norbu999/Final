from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Course, Modules, Category, Video,Thumbnail, Resource, SubModules
from django.urls import reverse
# Create your views here.

def login(request):
    return render(
        request,
        'auth/login.html'
    )


def signup(request):
    return render(
        request,
        'auth/signup/html'
    )

def home(request):
    return render(
        request,
        'main/home.html'
    )

def about_us(request):
    return render(
        request,
        'main/about_us.html'
    )

def course(request):
    categories = Category.objects.all()
    courses = Course.objects.all()
    thumbnail = Thumbnail.objects.all()
    return render(
        request,
        'main/courses.html',
        {'courses': courses, 
         'category': categories, 
         'thumbnail': thumbnail
        }
    )

def category_view(request, category):
    pass

def search_view(request):
    if request.method == 'POST':
        seacrh = request.POST.get('search')
    return render(
        request,
        'main/search.html'
    )

#@login_required
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

def learn_module(request,course_title, module_name):
    course = get_object_or_404(Course, title=course_title)
    module = get_object_or_404(Modules, course=course, name=module_name)
    sub_modules = SubModules.objects.filter(module=module)
    video = Video.objects.filter(modules=module)
    resources = Resource.objects.filter(modules=module)
    
    return render(request, 'main/learn_module.html', {'course': course, 'module': module, 'video':video, 'resources':resources, 'sub_module':sub_modules})


def sub_module(request, course_title, module_name, topic):
    course = get_object_or_404(Course, title=course_title)
    module = get_object_or_404(Modules, course=course, name=module_name)
    sub_modules = get_object_or_404(SubModules, module=module, name=topic)
    return render(
        request,
        'main/sub_module.html',
        {'course': course,
         'module': module,
         'sub_modules': sub_modules
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
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

load_dotenv()

api_key = os.getenv("OPENAI_KEY", None)

@csrf_exempt
def botAPI(request):
    # Your existing code to fetch course, module, and resources

    response = None
    if request.method == "POST":
        openai.api_key = api_key
        question = request.POST.get('question')
        prompt = question

        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=prompt,
            max_tokens=256,
            temperature=.1
        )
        
        return JsonResponse({'response':response['choices'][0].text})
    else:
        return HttpResponseNotAllowed(['POST'])

