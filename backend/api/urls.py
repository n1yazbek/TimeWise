from django.urls import path
from .views import create_note, get_notes, get_note_detail, update_note, delete_note

urlpatterns = [
    path('notes/create/', create_note, name='create_note'),
    path('notes/', get_notes, name='get_notes'),
    path('notes/<int:note_id>/', get_note_detail, name='get_note_detail'),
    path('notes/<int:note_id>/update/', update_note, name='update_note'),
    path('notes/<int:note_id>/delete/', delete_note, name='delete_note'),
]
