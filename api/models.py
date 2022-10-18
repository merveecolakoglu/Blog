
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_manager = models.BooleanField(default=False)


class Blog(models.Model):
    type = models.CharField(max_length=25, null=True, blank=True)
    title = models.CharField(max_length=500, null=True, blank=True)
    home_image = models.ImageField(null=True, blank=True, upload_to='blogs/home/%Y/%m/', default='/default.jpg')
    image = models.ImageField(null=True, blank=True, upload_to='blogs/post/%Y/%m/', default='/default.jpg')
    description = models.TextField(null=True, blank=True)
    id = models.AutoField(primary_key=True, editable=False)
    createdAt = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Postlar'

    def __str__(self):
        return self.title

