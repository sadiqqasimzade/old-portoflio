from django.urls import path
from .views import index


urlpatterns = [
    path('',index),
    path('about',index),
    path('portfolio',index),
    path('contact',index),
]
