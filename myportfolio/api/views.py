from django.db.models import F

from api.forms import ContactForm
from api.serializers import LayoutSerializer, ProjectSerializerAz, ProjectSerializerEn, ProjectSerializerRu
from .models import  About, Layout, Navelement, Project, Skill, Social, Technology
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models.functions import Substr


class AboutView(APIView):
    def get(self, request):
        lang = request.headers.get('Accept-Language')
        if lang == 'ru' or lang=='az':
            about = list(About.objects.values(path=Substr(('file_path'), 22), title=F(f'title_{lang}'), desc=F(f'text_{lang}')))
            return Response(about)

        about = list(About.objects.values(path=Substr(
            F('file_path'), 22), title=F('title_en'), desc=F('text_en')))
        return Response(about)


class SkillView(APIView):
    def get(self, request):
        from api.serializers import SkillSerializer
        return Response(SkillSerializer(Skill.objects.all(), many=True).data)


class ProjectView(APIView):
    def get(self, request):
        lang = request.headers.get('Accept-Language')
        if lang == 'ru':
            return Response(ProjectSerializerRu(Project.objects.all(), many=True).data)
        elif lang == 'az':
            return Response(ProjectSerializerAz(Project.objects.all(), many=True).data)
        return Response(ProjectSerializerEn(Project.objects.all(), many=True).data)


class TechnologyView(APIView):
    def get(self, request):
        lang = request.headers.get('Accept-Language')
        if lang == 'ru' or lang == 'az':
            return Response(Technology.objects.values('name', file_path=Substr(
                F'img', 22), help_text=F(f'help_text_{lang}')))

        return Response(Technology.objects.values('name', file_path=Substr(
            F'img', 22), help_text=F("help_text_en")))


class NavView(APIView):
    def get(self, request):
        lang = request.headers.get('Accept-Language')
        if lang == 'ru' or lang == 'az':
            return Response(Navelement.objects.values('href', file_path=Substr(
                'img', 22), title=F(f'title_{lang}')))
        
        return Response(Navelement.objects.values('href', file_path=Substr(
            'img', 22), title=F("title_en")))


class SocialView(APIView):
    def get(self, request):
        return Response(Social.objects.values('href', svg=Substr('file_path', 22)))


class EmailView(APIView):
    def post(self, request):
        data = request.data
        contactdata = ContactForm(data)
        if not contactdata.is_valid():
            return Response(contactdata.errors, status=400)
        from django.template.loader import render_to_string
        from django.core.mail import send_mail
        from django.utils.html import strip_tags
        from django.core.validators import validate_email
        html_message = render_to_string('email/contact.html', data)
        message = strip_tags(html_message)
        try:
            validate_email(data['email'])
            import os
            send_mail(data['name'], message, None, [
                      os.environ.get('ADMIN_EMAIL')], html_message=html_message)

        except Exception as e:
            return Response(status=500, data={e})
        return Response(status=200)


class LayoutView(APIView):
    def get(self, request):
        lang = request.headers.get('Accept-Language')
        if lang == 'ru' or lang == 'az':
            return Response(LayoutSerializer(Layout.objects.get(lang=lang)).data)

        return Response(LayoutSerializer(Layout.objects.get(lang='en')).data)
