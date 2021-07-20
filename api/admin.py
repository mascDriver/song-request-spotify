from django.contrib import admin
from rest_framework.authtoken.models import TokenProxy
from rest_framework.authtoken.admin import TokenAdmin


class TokenAdminCustom(TokenAdmin):
    """
    classe para colocar user em raw id na criação de tokens
    """
    autocomplete_fields = ("user",)
    fields = ('user', 'key')


admin.site.unregister(TokenProxy)
admin.site.register(TokenProxy, TokenAdminCustom)