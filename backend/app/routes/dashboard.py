from fastapi import APIRouter

router = APIRouter()

@router.get("/stats")
async def get_dashboard_stats():
    return {
        "success": True,
        "total_moots": 18,
        "win_rate": 88.4,
        "average_score": 92,
        "citation_accuracy": 94.2
    }
