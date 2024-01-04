import os
import requests
from dotenv import load_dotenv

load_dotenv()

SAMSARA_API_KEY = os.getenv('SAMSARA_API_KEY')
print(SAMSARA_API_KEY)

url = "https://api.samsara.com/fleet/vehicles/locations"

headers = {
    "accept": "application/json",
    "authorization": f"Bearer {SAMSARA_API_KEY}"
}

response = requests.get(url, headers=headers)

print(response.text)