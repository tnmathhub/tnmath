from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken import views as auth_token_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token-auth/", auth_token_views.obtain_auth_token),
    path("api/hub/", include("hub.urls")),
]