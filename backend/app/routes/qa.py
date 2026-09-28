from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class QueryRequest(BaseModel):
    query: str
    language: str = "en"

@router.post("/query")
async def ask_legal_question(req: QueryRequest):
    return {
        "success": True,
        "domain": "Criminal Law & Cyber Fraud",
        "language": req.language,
        "applicable_sections": [
            "BNS Section 318(4) - Cheating via digital deception",
            "BNSS Section 173 - Zero FIR",
            "IT Act Section 66D - Identity Theft & Personation"
        ],
        "explanation": f"Legal evaluation under Bharatiya Nyaya Sanhita 2023 for query: '{req.query}'",
        "user_rights": [
            "Right to register Zero FIR immediately at any police station.",
            "Right to RBI shadow reversal for reported online bank fraud."
        ],
        "immediate_steps": [
            "Call 1930 Cyber Crime Helpline.",
            "File e-FIR on cybercrime.gov.in."
        ]
    }
