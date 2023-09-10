from django.db import models

# Create your models here.
class City(models.Model):
    name = models.CharField(max_length=120, unique=True)
    status = models.BooleanField(default=True)

    def _str_(self):
        return self.name
