
# send_scheduled_messages.py

from dotenv import load_dotenv
load_dotenv()

import os
import asyncio
import requests

from datetime import datetime, timezone
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient


# ==========================================
# LOAD ENV
# ==========================================

ROOT_DIR = Path(__file__).parent

load_dotenv(ROOT_DIR / '.env')


# ==========================================
# MONGODB
# ==========================================

mongo_url = os.environ['MONGO_URL']

client = AsyncIOMotorClient(mongo_url)

db = client[os.environ['DB_NAME']]


# ==========================================
# SEND WHATSAPP MESSAGE
# ==========================================

async def send_messages():

    # Current UTC Time
    now = datetime.now(timezone.utc)

    # Find users whose scheduled time has arrived
    users = await db.form_submissions.find({

        "whatsapp_sent": False,

        "scheduled_at": {
            "$lte": now
        }

    }).to_list(length=100)

    print(f"Found {len(users)} scheduled users")

    # ==========================================
    # LOOP USERS
    # ==========================================

    for user in users:

        try:

            # ==========================================
            # SELECT CAMPAIGN
            # ==========================================

            if user.get("flow_type") == "saturday":

                campaign_name = "Saturday Final Message"

            else:

                campaign_name = "After Hours Final Message"

            # ==========================================
            # AISENSY PAYLOAD
            # ==========================================

            payload = {

                "apiKey": os.environ.get("AISENSY_API_KEY"),

                "campaignName": campaign_name,

                "destination": user["phone"],

                "userName": user["name"],

                "templateParams": [
                    user["name"]
                ]
            }

            # ==========================================
            # SEND MESSAGE
            # ==========================================

            response = requests.post(

                "https://backend.aisensy.com/campaign/t1/api/v2",

                json=payload,

                headers={

                    "Content-Type": "application/json",

                    "Authorization":
                        f"Bearer {os.environ.get('AISENSY_API_KEY')}"
                }

            )

            # print("AISENSY RESPONSE:", response.text)

            # ==========================================
            # UPDATE STATUS
            # ==========================================

            await db.form_submissions.update_one(

                {"id": user["id"]},

                {
                    "$set": {

                        "whatsapp_sent": True,

                        "whatsapp_sent_at": now
                    }
                }

            )

            print(f"Sent to {user['destination']}")

        except Exception as e:

            print(f"Error sending message: {str(e)}")


# ==========================================
# RUN SCRIPT
# ==========================================

asyncio.run(send_messages())
