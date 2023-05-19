from forms import UserCreationForms
from django import forms

from django.contrib.auth.models import User

from .models import Course, Modules

class UserForm(UserCreationForms):
    class Meta:
        model = User
        fields = ['username','emails','password1','password2']

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course