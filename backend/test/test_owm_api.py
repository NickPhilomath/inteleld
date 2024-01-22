import os
from dotenv import load_dotenv
from pyowm import OWM
load_dotenv()

OWM_API_KEY = os.getenv('OWM_API_KEY')
print(OWM_API_KEY)
# https://tile.openweathermap.org/map/wind_new/0/0/0.png?appid=fak
# https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=fak
# ---------- FREE API KEY examples ---------------------

owm = OWM(OWM_API_KEY)
mgr = owm.weather_manager()

observation = mgr.weather_at_coords(41.260555, 69.421825)
w = observation.weather

print(w.detailed_status)
print(w.wind())
print(w.humidity)
print(w.temperature('celsius'))
print(w.rain)                    # {}
print(w.heat_index)              # None
print(w.clouds)                  # 75