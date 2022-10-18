import datetime

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from api.models import Blog
from api.permissions import IsManagerUser
from api.serializers import BlogSerializer


@api_view(['GET'])
def getPosts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    posts = Blog.objects.filter(
        title__icontains=query
    ).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(posts, 4)

    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = BlogSerializer(posts, many=True)
    return Response({'posts': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopPosts(request):
    posts = Blog.objects.filter(createdAt__gte=timezone.now())
    serializer = BlogSerializer(posts, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getFashionPosts(request):
    posts = Blog.objects.filter(type__exact='Fashion')
    serializer = BlogSerializer(posts, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getBeautyPosts(request):
    posts = Blog.objects.filter(type__exact='Beauty')
    serializer = BlogSerializer(posts, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getLifeStylePosts(request):
    posts = Blog.objects.filter(type__exact='Lifestyle')
    serializer = BlogSerializer(posts, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getPeoplePosts(request):
    posts = Blog.objects.filter(type__exact='People')
    serializer = BlogSerializer(posts, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getPost(request, pk):
    post = Blog.objects.get(id=pk)
    serializer = BlogSerializer(post, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsManagerUser])
def createPost(request):
    data = request.data
    post = Blog.objects.create(
        title=data['title'],
        type=data['type'],
        home_image=data['home_image'],
        image=data['image'],
        description=data['description']
    )
    post.save()
    serializer = BlogSerializer(post, many=False)

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsManagerUser])
def updatePost(request, pk):
    data = request.data
    post = Blog.objects.get(id=pk)

    post.type = data['type']
    post.title = data['title']
    post.description = data['description']

    post.save()
    serializer = BlogSerializer(post, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsManagerUser])
def deletePost(request, pk):
    post = Blog.objects.get(id=pk)
    post.delete()

    return Response('Posted Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    post_id = data['post_id']
    post = Blog.objects.get(id=post_id)

    post.home_image = request.FILES.get('home_image')
    post.image = request.FILES.get('image')
    post.save()

    return Response('Image was Uploaded')
