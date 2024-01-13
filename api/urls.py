from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import ping_pong
from .view.companies import companies
from .view.drivers import drivers, driver
from .view.logs import logs
from .view.trucks import trucks
from .view.users import users

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # ####
    path("ping/", ping_pong),
    path("companies/", companies),
    path("drivers/", drivers),
    path("driver/<int:id>", driver),
    path("logs/", logs),
    path("trucks/", trucks),
    path("users/", users),
]
