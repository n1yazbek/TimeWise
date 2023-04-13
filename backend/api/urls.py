from django.urls import path
from . import views

urlpatterns = [
    path('spotify/', views.spotify, name='spotify'),
]
