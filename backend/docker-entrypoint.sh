#!/bin/bash

# Apply database migrations
echo "Apply database migrations"
poetry run python manage.py migrate

# Start server
echo "Starting server"
poetry run python manage.py runserver 0.0.0.0:8000