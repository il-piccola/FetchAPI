import mimetypes
import os
import time
from subprocess import Popen, PIPE
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

def img(request) :
    time.sleep(5)
    imgpath = os.path.join(STATIC_URL, 'profile01.JPG')
    binary = open(imgpath, "rb").read()
    return HttpResponse(binary, content_type='image/jpeg')
