#!/bin/sh
echo "start migrate"
python manage.py makemigrations
python manage.py migrate
exec "$@"
