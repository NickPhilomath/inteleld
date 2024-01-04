from .common import *

DEBUG = True
CORS_ALLOW_ALL_ORIGINS = True

# Database
DATABASES = {
    "default": {
        # default
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
        # mysql
        # 'ENGINE': 'django.db.backends.mysql',
        # 'HOST': 'localhost',
        # 'NAME': MYSQL_DATABASE_NAME,
        # 'USER': MYSQL_USER,
        # 'PASSWORD': MYSQL_PASSWORD,
    }
}
