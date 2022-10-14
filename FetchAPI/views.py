import os
import time
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import torch
from torch import autocast
from diffusers import LMSDiscreteScheduler
from japanese_stable_diffusion import JapaneseStableDiffusionPipeline
from .settings import *

@csrf_exempt
def index(request) :
    params = {
        'title' : 'FetchAPI Test',
    }
    return render(request, 'FetchAPI/index.html', params)

def img(request, n) :
    scheduler = LMSDiscreteScheduler(beta_start=0.00085, beta_end=0.012, beta_schedule="scaled_linear", num_train_timesteps=1000)
    pipe = JapaneseStableDiffusionPipeline.from_pretrained(MODEL_ID, torch_dtype=torch.float16, scheduler=scheduler, use_auth_token=os.environ['HF_TOKEN'])
    # pipe = JapaneseStableDiffusionPipeline.from_pretrained(MODEL_ID, torch_dtype=torch.float16, scheduler=scheduler, use_auth_token="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")
    pipe = pipe.to(DEVICE)

    imgpath = os.path.join(IMGDIR, IMGLIST[n])
    if os.path.exists(imgpath) :
        os.remove(imgpath)
    with autocast(DEVICE):
        image = pipe(SENTENSE, guidance_scale=7.5)["sample"][0]
        image.save(imgpath)
    while not os.path.exists(imgpath) :
        time.sleep(1)
    binary = open(imgpath, "rb").read()
    return HttpResponse(binary, content_type='image/png')
