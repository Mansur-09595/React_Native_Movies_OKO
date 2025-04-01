from django.db import models

class SearchTerm(models.Model):
    search_term = models.CharField(max_length=255)
    movie_id = models.IntegerField()
    title = models.CharField(max_length=255)
    count = models.IntegerField(default=1)
    poster_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-count']
        
    def __str__(self):
        return f"{self.search_term} ({self.count})"