from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import ping_pong
from .view.companies import companies, company
from .view.drivers import drivers, driver, driver_deactivate
from .view.logs import logs
from .view.trucks import trucks, truck
from .view.users import users, user

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # ####
    path("ping/", ping_pong),
    path("companies/", companies),
    path("companies/<int:id>", company),
    path("drivers/", drivers),
    path("drivers/<int:id>", driver),
    path("drivers/deactivate/<int:id>", driver_deactivate),
    path("logs/", logs),
    path("trucks/", trucks),
    path("trucks/<int:id>", truck),
    path("users/", users),
    path("users/<int:id>", user),
]