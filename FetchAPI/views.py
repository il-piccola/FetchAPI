import os
import io
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import torch
from torch import autocast
from diffusers import LMSDiscreteScheduler
from japanese_stable_diffusion import JapaneseStableDiffusionPipeline
from .settings import *

scheduler = LMSDiscreteScheduler(beta_start=0.00085, beta_end=0.012, beta_schedule="scaled_linear", num_train_timesteps=1000)
pipe = JapaneseStableDiffusionPipeline.from_pretrained(MODEL_ID, torch_dtype=torch.float16, scheduler=scheduler, use_auth_token=os.environ['HF_TOKEN']).to(DEVICE)

@csrf_exempt
def index(request) :
    params = {
        'title' : 'FetchAPI Test',
    }
    if request.POST :
        params['sentence'] = request.POST['sentence']
        params['num'] = 3
        print('session = ', request.session['sentence'])
    return render(request, 'FetchAPI/index.html', params)

@csrf_exempt
def img(request) :
    print('session = ', request.session['sentence'])
    with autocast(DEVICE):
        image = pipe(request.POST['sentence'], guidance_scale=7.5).images[0]
        binary = io.BytesIO()
        image.save(binary, format="PNG")
        binary.seek(0)
        return HttpResponse(binary, content_type='image/png')
