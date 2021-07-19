"""
Django settings for song_request project.

Generated by 'django-admin startproject' using Django 3.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
from .common import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'song_request',
        'USER': 'user_default',
        'PASSWORD': 'defaultdatabase',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


CLIENT_ID = "8702eedd9ee148f884b744615aaa78b0"
CLIENT_SECREET = "ff5ca7ad453d431383257072b6a51d62"
REDIRECT_URI = "http://127.0.0.1:8000/spotify/redirect"