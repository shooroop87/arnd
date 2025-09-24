from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.template import TemplateDoesNotExist


# @login_required
def root_page_view(request):
    try:
        return render(request, 'pages/index.html')
    except TemplateDoesNotExist:
        return render(request, 'pages/404-v1.html')


@login_required
def dynamic_pages_view(request, template_name):
    try:
        return render(request, f'pages/{template_name}.html')
    except TemplateDoesNotExist:
        return render(request, f'pages/404-v1.html')
