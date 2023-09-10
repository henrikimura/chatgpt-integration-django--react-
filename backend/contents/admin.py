from django.contrib import admin
from .models import Content

# Register your models here.
class ContentAdmin(admin.ModelAdmin):
    list_display = ('domain', 'city', 'description')

admin.site.register(Content, ContentAdmin)