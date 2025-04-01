from django.urls import path
from . import views

urlpatterns = [
    path('api/update-search-count/', views.update_search_count, name='update_search_count'),
    path('api/trending-movies/', views.get_trending_movies, name='get_trending_movies'),
]