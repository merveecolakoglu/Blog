from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from api.models import *

# Register your models here.

class UserModelAdmin(UserAdmin):
    list_display = ['username', 'first_name', 'last_name']

    class Meta:
        model=User

admin.site.register(User,UserModelAdmin)
admin.site.register(Blog)
