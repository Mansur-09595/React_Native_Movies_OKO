# views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SearchTerm
from .serializers import SearchTermSerializer

@api_view(['POST'])
def update_search_count(request):
    try:
        query = request.data.get('search_term')
        movie_id = request.data.get('movie_id')
        title = request.data.get('title')
        poster_path = request.data.get('poster_url')

        if not all([query, movie_id, title, poster_path]):
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            search_term = SearchTerm.objects.get(search_term=query)
            search_term.count += 1
            search_term.save()
        except SearchTerm.DoesNotExist:
            search_term = SearchTerm.objects.create(
                search_term=query,
                movie_id=movie_id,
                title=title,
                count=1,
                poster_url=poster_path
            )

        serializer = SearchTermSerializer(search_term)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_trending_movies(request):
    try:
        trending_movies = SearchTerm.objects.order_by('-count')[:5]
        serializer = SearchTermSerializer(trending_movies, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)