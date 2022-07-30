from django.db import models
from django.contrib.auth.models import AbstractUser,PermissionsMixin,BaseUserManager
from datetime import timezone
from django.contrib.auth.hashers import make_password


class CustomUserManager(BaseUserManager):

    def create_user(self,email,username,password):
        if not email :
            raise ValueError("User must have an email")
        email = self.normalize_email(email)
        user = self.model(email=email,username=username)
        user.set_password(password)

        user.save(using=self._db)
        return user 

    def create_superuser(self,email,password,username):
        user = self.create_user(email=email,password=password,username=username)
        user.is_staff = True 
        user.is_superuser = True
        user.save(using=self._db)
        return user 

class CustomUser(AbstractUser,PermissionsMixin):
    username = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = CustomUserManager()

    def __str__(self):
        return self.email 