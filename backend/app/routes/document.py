from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AuditRequest(BaseModel):
    contract_text: str

@router.post("/audit")
async def audit_document(req: AuditRequest):
    return {
        "success": True,
        "risk_score": 78,
        "status": "HIGH RISK DETECTED",
        "clauses": [
            {
                "clause": "Unilateral Termination",
                "risk": "HAZARDOUS",
                "recommendation": "Require 30-day notice under Indian Contract Act."
            }
        ]
    }
