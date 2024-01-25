from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import ping_pong
from .view.companies import companies, company
from .view.drivers import drivers, driver, driver_deactivate
from .view.logs import drivers_logs, driver_logs
from .view.trucks import trucks, truck, truck_deactivate
from .view.users import users, user

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # ####
    path("ping/", ping_pong),
    path("companies/", companies),
    path("companies/<int:id>", company),
    #
    path("drivers/", drivers),
    path("drivers/logs", drivers_logs),
    path("drivers/<int:id>", driver),
    path("drivers/<int:id>/logs/<str:date>", driver_logs),
    path("drivers/deactivate/<int:id>", driver_deactivate),
    #
    path("trucks/", trucks),
    path("trucks/<int:id>", truck),
    path("users/", users),
    path("users/<int:id>", user),
    path("trucks/deactivate/<int:id>", truck_deactivate),
]
