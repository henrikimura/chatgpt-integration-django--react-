from django.urls import path

from . import views

urlpatterns = [
    # ex: /polls/
    path("", views.domains, name="domains"),

    path("citys/", views.citys, name="citys"),
    path("domaindetail/", views.domaindetail, name="domaindetail"),
    path("domainupdate/", views.domainupdate, name="domainupdate"),
    path("citydetail/", views.citydetail, name="citydetail")
    
]