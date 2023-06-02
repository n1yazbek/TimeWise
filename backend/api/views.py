from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import NoteSerializer
from .models import Note
from django.contrib.auth import get_user_model


UserModel = get_user_model()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_note(request):
    user = request.user
    serializer = NoteSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    notes = Note.objects.filter(user=request.user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_note_detail(request, note_id):
    note = Note.objects.get(id=note_id, user=request.user)
    serializer = NoteSerializer(note)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_note(request, note_id):
    note = Note.objects.get(id=note_id, user=request.user)
    serializer = NoteSerializer(note, data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_note(request, note_id):
    note = Note.objects.get(id=note_id, user=request.user)
    note.delete()
    return Response(status=204)
