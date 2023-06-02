from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=200, allow_blank=True, default='')

    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Note
        fields = ('id', 'user', 'title', 'content', 'created_at', 'updated_at')
