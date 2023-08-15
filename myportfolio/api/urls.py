from django.urls import path
from .views import EmailView, AboutView, LayoutView, NavView, ProjectView, SkillView, SocialView, TechnologyView
urlpatterns = [
  path('about',AboutView.as_view(),name='About api')  ,
  path('skill',SkillView.as_view(),name='Skill api'),
  path('project',ProjectView.as_view(),name='Project api'),
  path('technology',TechnologyView.as_view(),name='Technology api'),
  path('email',EmailView.as_view(),name='Email'),
  path('nav',NavView.as_view(),name='Nav api'),
  path('social',SocialView.as_view(),name='Scoial api'),
  path('layout',LayoutView.as_view(),name='Layout api'),
]
