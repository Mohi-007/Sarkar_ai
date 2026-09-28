from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class MootSessionStart(BaseModel):
    case_id: str
    role: str  # defense, prosecution

@router.post("/start")
async def start_moot_session(data: MootSessionStart):
    return {
        "session_id": "moot-sess-991",
        "case_id": data.case_id,
        "role": data.role,
        "judge": "Hon'ble Justice Sarkar AI",
        "status": "IN_SESSION"
    }
