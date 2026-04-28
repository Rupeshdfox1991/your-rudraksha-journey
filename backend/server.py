from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List, Optional
import os, logging, uuid, jwt, bcrypt
from datetime import datetime, timezone, timedelta
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(
    root_path="/proxy/8002"
)
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ---- Auth Utils ----
def get_jwt_secret():
    return os.environ.get("JWT_SECRET", "rudralife-dev-secret-key")

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())

def create_token(admin_id: str, email: str) -> str:
    payload = {
        "sub": admin_id, "email": email, "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
        "type": "access"
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm="HS256")

async def get_current_admin(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(credentials.credentials, get_jwt_secret(), algorithms=["HS256"])
        if payload.get("type") != "access" or payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---- Recommendation Engine ----
MUKHI_INFO = {
    1: {"name": "1 Mukhi", "deity": "Lord Shiva", "benefit": "Liberation & Consciousness", "planet": "Sun",
        "description": "The rarest Rudraksha representing pure consciousness and liberation. It connects the wearer directly to the divine and is said to erase all negative karma."},
    2: {"name": "2 Mukhi", "deity": "Ardhanareeshwar", "benefit": "Harmony & Relationships", "planet": "Moon",
        "description": "Represents the union of Shiva and Parvati. Brings emotional balance, harmony in relationships and inner peace."},
    3: {"name": "3 Mukhi", "deity": "Agni (Fire God)", "benefit": "Confidence & Karma Cleansing", "planet": "Mars",
        "description": "Represents Agni, the fire of transformation. Removes negative karmic patterns and builds confidence and self-esteem."},
    4: {"name": "4 Mukhi", "deity": "Lord Brahma", "benefit": "Wisdom & Creativity", "planet": "Mercury",
        "description": "Enhances intellect, memory, creativity, and eloquence. Ideal for students, teachers, and creative professionals seeking mental clarity."},
    5: {"name": "5 Mukhi", "deity": "Kalagni Rudra", "benefit": "Health & Peace", "planet": "Jupiter",
        "description": "The most versatile and universally beneficial Rudraksha. Promotes good health, inner peace, and overall wellbeing for anyone who wears it."},
    6: {"name": "6 Mukhi", "deity": "Lord Kartikeya", "benefit": "Focus & Willpower", "planet": "Venus",
        "description": "The bead of Kartikeya, the warrior god. Sharpens focus, determination, and willpower. Ideal for professionals and high-achievers."},
    7: {"name": "7 Mukhi", "deity": "Mahalakshmi", "benefit": "Wealth & Prosperity", "planet": "Saturn",
        "description": "Associated with Goddess Lakshmi. Opens pathways to financial abundance, prosperity, and material comfort for the wearer."},
    8: {"name": "8 Mukhi", "deity": "Lord Ganesha", "benefit": "Removing Obstacles", "planet": "Rahu",
        "description": "Ganesha's bead removes obstacles in all pursuits of life, bringing clarity and paving the path to unobstructed success."},
    9: {"name": "9 Mukhi", "deity": "Goddess Durga", "benefit": "Power & Energy", "planet": "Ketu",
        "description": "Channels divine energy of Mother Durga. Brings fearlessness, vitality, dynamic power, and protection to the wearer."},
    10: {"name": "10 Mukhi", "deity": "Lord Vishnu", "benefit": "Protection & Calm", "planet": "All planets",
         "description": "The protective Rudraksha of Vishnu. Shields from negative energies and evil eye, while cultivating deep inner calm."},
    11: {"name": "11 Mukhi", "deity": "Ekadash Rudra", "benefit": "Meditation & Higher Wisdom", "planet": "All planets",
         "description": "One of the most powerful beads for deep meditation and awakening intuition. Opens the door to higher states of consciousness."},
    12: {"name": "12 Mukhi", "deity": "Lord Surya (Sun)", "benefit": "Leadership & Confidence", "planet": "Sun",
         "description": "Bestows the radiance and authority of the Sun. Perfect for leaders, executives, and anyone seeking recognition, power, and confidence."},
    13: {"name": "13 Mukhi", "deity": "Lord Indra", "benefit": "Charm & Fulfillment", "planet": "Venus",
         "description": "The bead of Indra, king of gods. Attracts magnetic charm, charisma, and the fulfillment of heartfelt desires."},
    14: {"name": "14 Mukhi", "deity": "Lord Hanuman", "benefit": "Intuition & Foresight", "planet": "Saturn/Mars",
         "description": "The most powerful protective bead. Activates the third eye and awakens deep intuition, prophetic foresight, and protection."},
}

GOAL_TO_MUKHI = {
    "wealth_prosperity": 7, "health_healing": 5, "spiritual_growth": 11,
    "mental_clarity_focus": 4, "confidence_leadership": 12, "protection_security": 10,
    "peace_stability": 2, "better_relationships": 13, "career_growth": 6,
}

LIFE_PATH_TO_MUKHI = {1: 12, 2: 2, 3: 5, 4: 8, 5: 4, 6: 13, 7: 9, 8: 7, 9: 3}

def calculate_life_path(dob: str) -> int:
    digits = sum(int(c) for c in dob if c.isdigit())
    while digits > 9:
        digits = sum(int(c) for c in str(digits))
    return digits if digits > 0 else 5

def get_recommendation(primary_goal: str, dob: str) -> dict:
    primary_mukhi = GOAL_TO_MUKHI.get(primary_goal, 5)
    life_path = calculate_life_path(dob)
    secondary_mukhi = LIFE_PATH_TO_MUKHI.get(life_path, 5)
    if secondary_mukhi == primary_mukhi:
        secondary_mukhi = (primary_mukhi % 14) + 1
    return {
        "primary_mukhi": primary_mukhi,
        "secondary_mukhi": secondary_mukhi,
        "life_path": life_path,
        "primary_info": MUKHI_INFO[primary_mukhi],
        "secondary_info": MUKHI_INFO[secondary_mukhi],
    }


# ---- Models ----
class AdminLoginReq(BaseModel):
    email: str
    password: str

class FormSubmissionCreate(BaseModel):
    name: str
    email: str
    phone: str
    dob: str
    gender: str
    country: str
    state: str
    city: str
    profession: str
    industry: str = ""
    career_stage: str
    primary_goal: str
    challenges: str = ""
    meditation_experience: str = ""
    lifestyle: List[str] = []
    budget: str
    wearing_preference: str
    notes: str = ""
    privacy_agreed: bool


# ---- Auth Routes ----
@api_router.post("/auth/login")
async def admin_login(req: AdminLoginReq):
    admin = await db.admins.find_one({"email": req.email.strip().lower()})
    if not admin or not verify_password(req.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token(str(admin.get("id", "admin")), admin["email"])
    return {"token": token, "email": admin["email"], "role": "admin"}

@api_router.get("/auth/me")
async def get_me(admin=Depends(get_current_admin)):
    return {"email": admin["email"], "role": admin["role"]}


# ---- Form Routes ----
@api_router.post("/form/submit")
async def submit_form(data: FormSubmissionCreate):
    if not data.privacy_agreed:
        raise HTTPException(status_code=400, detail="Privacy agreement is required")
    recommendation = get_recommendation(data.primary_goal, data.dob)
    doc = {
        "id": str(uuid.uuid4()),
        **data.model_dump(),
        "recommended_mukhi": recommendation["primary_mukhi"],
        "secondary_mukhi": recommendation["secondary_mukhi"],
        "life_path": recommendation["life_path"],
        "recommendation": recommendation,
        "submitted_at": datetime.now(timezone.utc).isoformat(),
        "status": "pending",
    }
    await db.form_submissions.insert_one(doc)
    return {"success": True, "submission_id": doc["id"], "recommendation": recommendation}

class SimpleSubmissionCreate(BaseModel):
    fullName: str
    phoneNumber: str
    email: str
    dateOfBirth: str = ""
    gender: str = ""
    city: str = ""
    state: str = ""
    country: str = "India"
    countryCode: str = "+91"
    primaryGoal: str = ""
    mainChallenge: str = ""
    goals: List[str] = []
    story: str = ""

@api_router.post("/submissions")
async def create_submission(data: SimpleSubmissionCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": data.fullName,
        "phone": data.phoneNumber,
        "email": data.email,
        "dob": data.dateOfBirth,
        "gender": data.gender,
        "city": data.city,
        "state": data.state,
        "country": data.country,
        "country_code": data.countryCode,
        "primary_goal": data.primaryGoal or (data.goals[0] if data.goals else ""),
        "goals": data.goals,
        "story": data.story or data.mainChallenge,
        "submitted_at": datetime.now(timezone.utc).isoformat(),
        "status": "pending",
    }
    await db.form_submissions.insert_one(doc)
    return {"success": True, "submission_id": doc["id"]}

@api_router.get("/form/result/{submission_id}")
async def get_result(submission_id: str):
    doc = await db.form_submissions.find_one({"id": submission_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Submission not found")
    return doc


# ---- Admin Routes ----
def build_filter_query(from_date: Optional[str], to_date: Optional[str], gender: Optional[str]) -> dict:
    query = {}
    date_q = {}
    if from_date:
        date_q["$gte"] = from_date + "T00:00:00"
    if to_date:
        date_q["$lte"] = to_date + "T23:59:59"
    if date_q:
        query["submitted_at"] = date_q
    if gender:
        query["gender"] = {"$regex": f"^{gender}$", "$options": "i"}
    return query

@api_router.get("/admin/submissions/export")
async def export_submissions(
    from_date: Optional[str] = None,
    to_date: Optional[str] = None,
    gender: Optional[str] = None,
    admin=Depends(get_current_admin),
):
    query = build_filter_query(from_date, to_date, gender)
    docs = await db.form_submissions.find(query, {"_id": 0}).sort("submitted_at", -1).to_list(50000)
    return {"submissions": docs, "total": len(docs)}

@api_router.get("/admin/submissions")
async def get_submissions(
    page: int = 1,
    limit: int = 20,
    from_date: Optional[str] = None,
    to_date: Optional[str] = None,
    gender: Optional[str] = None,
    admin=Depends(get_current_admin),
):
    query = build_filter_query(from_date, to_date, gender)
    skip = (page - 1) * limit
    total = await db.form_submissions.count_documents(query)
    docs = await db.form_submissions.find(query, {"_id": 0}).sort("submitted_at", -1).skip(skip).limit(limit).to_list(limit)
    return {"submissions": docs, "total": total, "page": page, "limit": limit}

@api_router.get("/admin/stats")
async def get_stats(admin=Depends(get_current_admin)):
    total = await db.form_submissions.count_documents({})
    pending = await db.form_submissions.count_documents({"status": "pending"})
    pipeline = [
        {"$group": {"_id": "$primary_goal", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}, {"$limit": 5}
    ]
    top_goals = await db.form_submissions.aggregate(pipeline).to_list(5)
    return {
        "total": total, "pending": pending,
        "top_goals": [{"goal": g["_id"], "count": g["count"]} for g in top_goals]
    }

@api_router.patch("/admin/submissions/{submission_id}/status")
async def update_status(submission_id: str, status: str, admin=Depends(get_current_admin)):
    await db.form_submissions.update_one({"id": submission_id}, {"$set": {"status": status}})
    return {"success": True}

@api_router.get("/")
async def root():
    return {"message": "Rudralife API v1.0"}


# ---- Startup ----
async def seed_admin():
    email = os.environ.get("ADMIN_EMAIL", "admin@rudralife.com")
    password = os.environ.get("ADMIN_PASSWORD", "Rudralife@2024")
    existing = await db.admins.find_one({"email": email})
    if not existing:
        await db.admins.insert_one({
            "id": str(uuid.uuid4()), "email": email,
            "password_hash": hash_password(password),
            "role": "admin", "created_at": datetime.now(timezone.utc).isoformat()
        })
        logger.info(f"Admin created: {email}")
    elif not verify_password(password, existing["password_hash"]):
        await db.admins.update_one({"email": email}, {"$set": {"password_hash": hash_password(password)}})
        logger.info(f"Admin password updated: {email}")

@app.on_event("startup")
async def startup():
    await db.admins.create_index("email", unique=True)
    await db.form_submissions.create_index("submitted_at")
    await db.form_submissions.create_index("id")
    await seed_admin()

@app.on_event("shutdown")
async def shutdown():
    client.close()


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
