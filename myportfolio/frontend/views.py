from django.shortcuts import render,HttpResponse

# Create your views here.
def index(request):
    return HttpResponse(render(request,'frontend/index.html'),headers={
       'Cache-Control': 'max-age=604800'})


        


