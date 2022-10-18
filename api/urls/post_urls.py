from django.urls import path

from api.views import post_views as views

urlpatterns = [
    path('', views.getPosts, name='posts'),

    path('create/', views.createPost, name='post-create'),
    path('upload/', views.uploadImage, name='image-upload'),

    path('top/', views.getTopPosts, name='top-posts'),

    path('fashion/', views.getFashionPosts, name='fashion-posts'),
    path('beauty/', views.getBeautyPosts, name='beauty-posts'),
    path('lifestyle/', views.getLifeStylePosts, name='life-style-posts'),
    path('people/', views.getPeoplePosts, name='people-posts'),

    path('<str:pk>/', views.getPost, name='post'),

    path('update/<str:pk>/', views.updatePost, name='post-update'),
    path('delete/<str:pk>/', views.deletePost, name='post-delete'),

]
