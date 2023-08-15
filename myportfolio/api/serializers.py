from os import link
from rest_framework import serializers
from .models import *


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'


class TechnologySerializer_name(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['name']



class TechnologySerializer_name_img(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()
    class Meta:
        model = Technology
        fields = ['name', 'img']

    def get_img(self, obj):
        return str(obj.img)[21:]


class SkillSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer_name(many=True)

    class Meta:
        model = Skill
        exclude = ['id']


class LayoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Layout
        exclude = ['id', 'lang']


class ProjectSerializerEn(serializers.ModelSerializer):
    technologies = TechnologySerializer_name_img(many=True)
    description = serializers.CharField(source='description_en')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        exclude = ['id', 'description_en', 'description_ru', 'description_az']

    def get_image(self, obj):
        return str(obj.image)[21:]


class ProjectSerializerAz(serializers.ModelSerializer):
    technologies = TechnologySerializer_name_img(many=True)
    description = serializers.CharField(source='description_az')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        exclude = ['id', 'description_en', 'description_ru', 'description_az']

    def get_image(self, obj):
        return str(obj.image)[21:]


class ProjectSerializerRu(serializers.ModelSerializer):
    technologies = TechnologySerializer_name_img(many=True)
    description = serializers.CharField(source='description_ru')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        exclude = ['id', 'description_en', 'description_ru', 'description_az']

    def get_image(self, obj):
        return str(obj.image)[21:]
