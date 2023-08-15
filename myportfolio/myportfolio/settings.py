import os
from pathlib import Path
DEBUG = False if os.environ.get('DEBUG')=='False' else True 

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.environ.get('SECRET_KEY') if os.environ.get('SECRET_KEY') else 'abc'
ALLOWED_HOSTS = [os.environ.get('CURRENT_HOST'),'127.0.0.1']

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
ADMINS = os.environ.get('ADMINS')
ADMIN_EMAIL=os.environ.get('ADMIN_EMAIL')
EMAIL_HOST = os.environ.get('MAIN_EMAIL_HOST')
EMAIL_PORT = os.environ.get('MAIN_EMAIL_PORT')
EMAIL_HOST_USER = os.environ.get('MAIN_EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('MAIN_EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL=os.environ.get('MAIN_EMAIL_FROM')
EMAIL_USE_SSL = os.environ.get('MAIN_EMAIL_SSL')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'frontend',
    'api',
]

MIDDLEWARE = [
    'django.middleware.gzip.GZipMiddleware',
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
WHITENOISE_MAX_AGE = int(os.environ.get('CACHE_AGE')) if not DEBUG else 0
ROOT_URLCONF = 'myportfolio.urls'
WSGI_APPLICATION = 'myportfolio.wsgi.app'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]




DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}



AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_TZ = True
STATIC_URL = '/dist/'if DEBUG else '/'
MEDIA_URL='/media/'
STATIC_ROOT=os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR,'frontend', 'dist'),
]
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.db.DatabaseCache",
        "LOCATION": "my_cache_table",
    }
}


