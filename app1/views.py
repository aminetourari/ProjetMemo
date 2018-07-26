
from django.shortcuts import render

def index(request):
	return render(request,'app1/appliw/singlePageApp.html')
	
def menu(request):
	return render(request,'app1/appliw/menu.html')
