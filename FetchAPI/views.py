import os
import time
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .settings import *

@csrf_exempt
def index(request) :
    params = {
        'title' : 'FetchAPI Test',
    }
    return render(request, 'FetchAPI/index.html', params)

def img(request, n) :
    time.sleep(5)
    imgfile = 'image{:02}.PNG'.format(n)
    imgpath = os.path.join(STATIC_URL, imgfile)
    binary = open(imgpath, "rb").read()
    return HttpResponse(binary, content_type='image/png')
