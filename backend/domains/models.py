from django.db import models

# Create your models here.
class Domain(models.Model):
    name = models.CharField(max_length=120, unique=True)
    links = models.CharField(max_length=120, blank=True, default="")
    description = models.TextField(blank=True, default="")
    value = models.FloatField(blank=True, default=0)
    status = models.BooleanField(default=True)

    def _str_(self):
        return self.name
