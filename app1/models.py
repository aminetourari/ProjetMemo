from django.db import models

# Create your models here.
class Memoire(models.Model):
    mot = models.CharField(max_length=30)
    url = models.CharField(max_length=1000)

    def __str__(self):
    	return self.mot