from django.db import models

# Create your models here.
class Content(models.Model):
    domain = models.CharField(max_length=120)
    city = models.CharField(max_length=120)
    description = models.TextField(blank=True, default="")

    def _str_(self):
        return self.domain + ' ' + self.city + ' ' + self.description
