from django.contrib import admin
from .models import City

class CityAdmin(admin.ModelAdmin):
    list_display = ('name', 'status')

# Register your models here.

admin.site.register(City, CityAdmin)