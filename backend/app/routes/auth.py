from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    barCouncilNo: str

@router.post("/login")
async def login(user_data: UserLogin):
    return {
        "success": True,
        "token": "sarkar_ai_demo_token_advocate",
        "user": {
            "id": "adv-001",
            "name": "Advocate Surya Sarkar",
            "email": user_data.email,
            "role": "Senior Advocate",
            "barCouncilNo": "DEL/19824/2022"
        }
    }

@router.post("/register")
async def register(user_data: UserRegister):
    return {
        "success": True,
        "token": "sarkar_ai_demo_token_advocate",
        "user": {
            "id": "adv-002",
            "name": user_data.name,
            "email": user_data.email,
            "role": "Advocate",
            "barCouncilNo": user_data.barCouncilNo
        }
    }
