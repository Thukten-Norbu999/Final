from django.urls import path
from . import views, simulation_views



urlpatterns = [
    path('', views.home, name='home'),
    path('home', views.home, name='home'),
    path('test-home',views.test_home, name='test_home'),
    path('search', views.search_view, name='search-view'),
    path('courses', views.course, name='course'),
    path('courses/<str:course_title>/', views.course_modules,name='course_modules'),
    path('courses/<str:course_title>/module/<str:module_name>/', views.learn_module, name='learn_module'),
    path('api/chat/', views.botAPI, name='botAPI'),
    path('simulations/', simulation_views.simulations, name='simulations'),
    path('simulations/simple-pendulum', simulation_views.simple_pendulum, name='simple-pendulum'),
    path('simulations/air-resistance', simulation_views.air_resistance, name='air_resistance'),
    path('simulations/projectile', simulation_views.projectile, name='projectile'),
    path('simulations/gravity', simulation_views.gravity, name='gravity'),
    path('simulations/cradle', simulation_views.cradle, name='cradle')
]