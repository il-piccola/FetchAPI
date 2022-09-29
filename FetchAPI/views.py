import os
from subprocess import Popen, PIPE
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from .settings import *

@csrf_exempt
def index(request) :
    params = {
        'title' : 'FetchAPI Test',
    }
    return render(request, 'FetchAPI/index.html', params)
