from django.contrib import admin
from .models import Domain

# Register your models here.
class DomainAdmin(admin.ModelAdmin):
    list_display = ('name', 'links', 'value', 'status')

admin.site.register(Domain, DomainAdmin)