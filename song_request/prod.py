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
DEBUG = False

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
        'NAME': 'db9ldrs54a016f',
        'USER': 'kzcvlriaotixlo',
        'PASSWORD': 'f2704430e6d0c55a1081ed395a0122ae0907c953008ce6956f89955ff212b87a',
        'HOST': 'ec2-34-193-101-0.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}


CLIENT_ID = "8702eedd9ee148f884b744615aaa78b0"
CLIENT_SECREET = "ff5ca7ad453d431383257072b6a51d62"
REDIRECT_URI = "https://song-request-spotify.herokuapp.com/spotify/redirect"