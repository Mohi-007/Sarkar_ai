"""
Sarkar AI Backend - Supreme AI-Powered Judicial Platform
Main entry point for Sarkar AI legal API
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time

from app.config import settings
from app.routes import auth, qa, moot, document, cases, dashboard

app = FastAPI(
    title="Sarkar AI API",
    description="Supreme AI-Powered Judicial & Legal Assistance Platform for India",
    version="2.4.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Sarkar AI Backend",
        "version": settings.PROJECT_VERSION
    }

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Sarkar AI - Supreme Judicial Platform API",
        "version": settings.PROJECT_VERSION,
        "docs": "/api/docs",
        "health": "/health"
    }

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(qa.router, prefix="/api/qa", tags=["Legal Q&A"])
app.include_router(moot.router, prefix="/api/moot", tags=["3D Moot Court"])
app.include_router(document.router, prefix="/api/document", tags=["Document Risk & Draft"])
app.include_router(cases.router, prefix="/api/cases", tags=["Case Law"])
app.include_router(dashboard.router, prefix="/api/student", tags=["Judicial Analytics"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
