import os
import requests
from time import sleep
from celery import shared_task
from django.core.cache import cache
from .models import Truck

from django.conf import settings
# from logistics.celery import app


# @app.task
@shared_task
def notify_customers(message):
    print("*** Sending 1000 messages....")
    print("***", message)
    sleep(3)
    print("*** Emails were successfully sent!")


SAMSARA_TRUCKS_URL = "https://api.samsara.com/fleet/vehicles/locations"


def get_header(api_key):
    return {"accept": "application/json", "authorization": f"Bearer {api_key}"}


@shared_task
def update_trucks():
    # get all trucks from api
    data = []
    for key in settings.SAMSARA_API_KEYS:
        response = requests.get(SAMSARA_TRUCKS_URL, headers=get_header(key)).json()
        data = data + response["data"]

    # check for new trucks and add them to database if exists
    for d in data:
        if not Truck.objects.filter(samsara_id=d["id"]).exists():
            Truck.create_from_data(d)

        #  check weather in the location
        loc = d["location"]
        # d["weather"] = get_weather(loc["latitude"], loc["longitude"])

    cache.set("trucks", data)


# @shared_task
# def update_trailers():
#     # requesting data
#     response = requests.request("GET", SAMSARA_TRAILERS_URL, headers={
#         "Accept": "application/json",
#         "Authorization": SAMSARA_API_KEY_SAM
#     }).json()
#     response2 = requests.request("GET", SAMSARA_TRAILERS_URL, headers={
#         "Accept": "application/json",
#         "Authorization": SAMSARA_API_KEY_ASCOT
#     }).json()

#     # separating required data
#     data = []
#     db_trailers = Trailer.objects.all().values('id', 'samsara_id', 'number')

#     for r in response['assets'] + response2['assets']:
#         trailer = {
#             'id': None,
#             'samsara_id': r['id'],
#             'number': r['name'],
#             # 'assetSerialNumber': r['assetSerialNumber'],
#             'location': r['location'][0]['location'],
#             'latitude': r['location'][0]['latitude'],
#             'longitude': r['location'][0]['longitude'],
#             'speed': r['location'][0]['speedMilesPerHour'],
#             # 'timeMs': r['location'][0]['timeMs'],
#         }
#         for db_t in db_trailers:
#             if trailer['samsara_id'] == db_t['samsara_id']:
#                 trailer['id'] = db_t['id']
#                 break

#         # create new trailer if not found
#         if not trailer['id']:
#             new_trailer = Trailer()
#             new_trailer.number = trailer['number']
#             new_trailer.samsara_id = trailer['samsara_id']
#             new_trailer.status = 'ius'
#             new_trailer.save()

#         data.append(trailer)

#     cache.set('trailers', data)


# @shared_task
# def log_trailers():
#     # latest_log = TrailerLog.objects.filter(trailer_id=81).latest('time')
#     # print(latest_logs.id, latest_logs.time)
#     data = cache.get('trailers')
#     for d in data:
#         if d['id']:
#             if d['speed'] == 0:
#                 status = 's'
#             else:
#                 status = 'm'

#             try:
#                 latest_log = TrailerLog.objects.values('status').filter(trailer_id=d['id']).latest('time')
#             except:
#                 latest_log = {'status': 's'}

#             if not latest_log['status'] == status:
#                 log = TrailerLog()
#                 log.trailer_id = d['id']
#                 log.status = status
#                 log.latitude = d['latitude']
#                 log.longitude = d['longitude']
#                 log.location = d['location']
#                 log.save()
