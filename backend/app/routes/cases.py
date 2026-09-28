from fastapi import APIRouter

router = APIRouter()

@router.get("/search")
async def search_cases(q: str = ""):
    return {
        "success": True,
        "query": q,
        "results": [
            {
                "title": "Arnesh Kumar v. State of Bihar",
                "citation": "(2014) 8 SCC 273",
                "subject": "Mandatory BNSS § 35 Notice of Appearance"
            }
        ]
    }
