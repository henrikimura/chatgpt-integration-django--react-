from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from domains.models import Domain
from citys.models import City
from contents.models import Content
from django.db.models import Q
from django.conf import settings

import openai
openai.api_key = settings.CHATGPT_APIKEY
  
def domains(request):
    result = []
    conversation = [
        {"role" : "system", "content" : "You are a helpful assistant."}
    ]
    for each in Domain.objects.all():
        domain_info = Domain.objects.get(name=each.name)
        # if not domain_info.description:
        #     conversation.append({
        #         "role" : "user",
        #         "content" : f"I want to know about {each.name} with 700 words"
        #     })
        #     response = openai.ChatCompletion.create(
        #         model="gpt-3.5-turbo",  # Choose the appropriate engine
        #         messages=conversation
        #     )
            
        #     domain_info.description = response['choices'][0]['message']['content']
        #     domain_info.save()
        #     result.append({
        #         "name" : each.name,
        #         "description" : response['choices'][0]['message']['content']
        #     })
        # else:
        result.append({
            "name" : domain_info.name,
            "description" : domain_info.description,
        })

    return JsonResponse(result, safe=False)

def citys(request):
    result = []
    keyword = request.GET.get('keyword', '')
    filtered_records = City.objects.filter(Q(name__icontains=keyword))[:10]

    # Serialize the filtered records to JSON and return them
    data = [{'name': record.name} for record in filtered_records]
    return JsonResponse(data, safe=False)

def domaindetail(request):
    result = []
    domainname = request.GET.get('name', '')
    domain = Domain.objects.get(name=domainname)
    domaininfo = {
        'name': domain.name,
        'description': domain.description
    }
    cities = list(City.objects.values())
    # Serialize the filtered records to JSON and return them
    data = {'domaininfo': domaininfo, 'cities': cities}
    return JsonResponse(data)

def domainupdate(request):
    result = []
    domainname = request.GET.get('domain', '')
    domain_info = Domain.objects.get(name=domainname)
    conversation = [
        {"role" : "system", "content" : "You are a helpful assistant."}
    ]
    conversation.append({
        "role" : "user",
        "content" : f"I want to know about {domainname} with 700 words"
    })
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Choose the appropriate engine
        messages=conversation
    )
    description = response['choices'][0]['message']['content']
    domain_info.description = description
    domain_info.save()

    # Serialize the filtered records to JSON and return them
    data = {'description': description}
    return JsonResponse(data)

def citydetail(request):
    result = {}
    domain = request.GET.get('domain', '')
    city = request.GET.get('city', '')
    
    try:
        contentinfo = Content.objects.get(domain=domain, city=city)
    except Content.DoesNotExist:
        contentinfo = {}

    

    if not contentinfo:
        conversation = [
            {"role" : "system", "content" : "You are a helpful assistant."}
        ]
        conversation.append({
            "role" : "user",
            "content" : f"I want to know about {domain} in {city} with 500 words"
        })
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Choose the appropriate engine
            messages=conversation
        )
        description = response['choices'][0]['message']['content']

        instance = Content(domain=domain, city=city, description=description)
        instance.save()

        result = {
            'city': city,
            'domain': domain,
            'description': description
        }
    else:
        result = {
            'city': city,
            'domain': domain,
            'description': contentinfo.description
        }
    
    # Serialize the filtered records to JSON and return them
    return JsonResponse(result)
