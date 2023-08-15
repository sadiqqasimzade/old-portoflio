from django.db import models
from django.core.validators import FileExtensionValidator



class About(models.Model):
    file_path=models.FileField(upload_to='frontend/dist/images/about/',validators=[FileExtensionValidator(['svg'])])

    title_en=models.CharField(max_length=20)
    title_ru=models.CharField(max_length=20)
    title_az=models.CharField(max_length=20)

    text_en=models.TextField(max_length=800)
    text_ru=models.TextField(max_length=800)
    text_az=models.TextField(max_length=800)

    def __str__(self) -> str:
        return self.title_en




class Technology(models.Model):
    img=models.FileField(upload_to='frontend/dist/images/technologies/',validators=[FileExtensionValidator(['svg'])])
    name=models.CharField(max_length=20)

    help_text_en=models.TextField(max_length=120)
    help_text_ru=models.TextField(max_length=120)
    help_text_az=models.TextField(max_length=120)

    
    def __str__(self) -> str:
        return self.name   
        
    class Meta:
        verbose_name_plural = ("Technologies")

class Skill(models.Model):
    title=models.CharField(max_length=40)
    technologies=models.ManyToManyField(Technology)

    def __str__(self) -> str:
        return self.title


class Project(models.Model):
    image=models.ImageField(upload_to='frontend/dist/images/projects/')
    title=models.CharField(max_length=40)
    description_en=models.TextField(max_length=480)
    description_ru=models.TextField(max_length=480)
    description_az=models.TextField(max_length=480)
    link=models.CharField(max_length=100)
    technologies=models.ManyToManyField(Technology)
    def __str__(self) -> str:
        return self.title
    

class Navelement(models.Model):
    img=models.FileField(upload_to='frontend/dist/images/nav/',validators=[FileExtensionValidator(['svg'])])

    title_en=models.CharField(max_length=20)
    title_ru=models.CharField(max_length=20)
    title_az=models.CharField(max_length=20)

    href=models.CharField(max_length=20)
    def __str__(self) -> str:
        return self.title_en

class Social(models.Model):
    href=models.CharField(max_length=100)    
    file_path=models.FileField(upload_to='frontend/dist/images/social/',validators=[FileExtensionValidator(['svg'])])
    
    def __str__(self) -> str:
        return self.href


class Layout(models.Model):
    lang=models.CharField(max_length=10)
    welcome_text=models.CharField(max_length=100)
    contact_me=models.CharField(max_length=40)
    msg_name=models.CharField(max_length=20)
    msg_message=models.CharField(max_length=20)
    msg_sended=models.CharField(max_length=20)
    msg_invalid_email=models.CharField(max_length=20)
    projects_notfound=models.CharField(max_length=50)
    all_technologies=models.CharField(max_length=20)
    selected_technologies=models.CharField(max_length=20)
    something_went_wrong=models.CharField(max_length=20)
    loading=models.CharField(max_length=20)
    portfolio_page_helper=models.CharField(max_length=60)
    def __str__(self) -> str:
        return self.lang