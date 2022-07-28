from rest_framework.response import Response 
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import CustomUser
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from django.db import IntegrityError

class User(APIView):
    permission_classes = [AllowAny,]
    authentication_classes = [TokenAuthentication]

    def post(self,request):
        
        try:

            data = request.data 
            print(data)
            username  = data["username"]
            password = data["password"]
            email = data["email"]
            new_user = CustomUser.objects.create_user(username=username,password=password,email=email)
            new_user.save()
            return Response(data={"message":"success"},status=status.HTTP_201_CREATED)
        except  IntegrityError:
            return Response(data={"message":"failure","error":"email already taken" },status=status.HTTP_200_OK)
        except   KeyError :
            return Response(data={"message":"failure","error":"some fields are not provided"},status=status.HTTP_400_BAD_REQUEST)

        return Response(data={"message":"failure","error":"internal server error"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
