from django.urls import path
from . import views, simulation_views, tutor_views


urlpatterns = [
    path('login', views.login, name='login'),
    path('signup', views.signup, name='signup'),

    path('tutor/create',tutor_views.create_course, name='create_course'),
    path('tutor/update',tutor_views.update_course, name='update_course'),
    path('tutor/delete',tutor_views.delete_course, name='delete_course'),
    path('api/createAPI/', tutor_views.createAPI, name='createAPI'),
    ###
    path('', views.home, name='home'),
    path('home', views.home, name='home'),
    path('about-us', views.about_us, name='about_us'),
    path('test-home',views.test_home, name='test_home'),
    path('search', views.search_view, name='search-view'),
    path('courses', views.course, name='course'),
    ###
    path('courses/<str:course_title>/', views.course_modules,name='course_modules'),
    path('courses/<str:course_title>/modules/<str:module_name>/', views.learn_module, name='learn_module'),
    path('courses/<str:course_title>/modules/<str:module_name>/learning/<str:topic>', views.sub_module, name='sub_module'),
    path('api/chat/', views.botAPI, name='botAPI'),
    ###

    path('simulations/', simulation_views.simulations, name='simulations'),
    path('simulations/simple-pendulum', simulation_views.simple_pendulum, name='simple-pendulum'),
    path('simulations/air-resistance', simulation_views.air_resistance, name='air_resistance'),
    path('simulations/projectile', simulation_views.projectile, name='projectile'),
    path('simulations/gravity', simulation_views.gravity, name='gravity'),
    path('simulations/cradle', simulation_views.cradle, name='cradle')
]