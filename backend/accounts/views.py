from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate


@csrf_exempt  # Disable CSRF protection
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        data = {
            'token': token.key,
            'user': serializer.data
        }
        return Response(data, status=201)
    return Response(serializer.errors, status=400)


@csrf_exempt  # Disable CSRF protection
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        data = {
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
            }
        }
        return Response(data)
    else:
        return Response({'error': 'Invalid credentials'}, status=400)
