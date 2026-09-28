"""
Pydantic Models for LexAI API
"""

from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum


# ============= ENUMS =============

class UserRole(str, Enum):
    STUDENT = "student"
    LAWYER = "lawyer"
    CITIZEN = "citizen"
    ADMIN = "admin"


class Language(str, Enum):
    ENGLISH = "en"
    HINDI = "hi"
    TAMIL = "ta"


class MootSide(str, Enum):
    PLAINTIFF = "plaintiff"
    DEFENDANT = "defendant"


class RiskLevel(str, Enum):
    SAFE = "SAFE"
    RISKY = "RISKY"
    ILLEGAL = "ILLEGAL"


class LegalDomain(str, Enum):
    CRIMINAL = "Criminal Law"
    CIVIL = "Civil Law"
    CONSTITUTIONAL = "Constitutional Law"
    FAMILY = "Family Law"
    PROPERTY = "Property Law"
    CONTRACT = "Contract Law"
    LABOR = "Labor Law"
    TAX = "Tax Law"
    CONSUMER = "Consumer Protection"
    CYBER = "Cyber Law"


# ============= USER MODELS =============

class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)
    role: UserRole = UserRole.STUDENT


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=100)
    
    @validator('password')
    def validate_password(cls, v):
        if not any(char.isdigit() for char in v):
            raise ValueError('Password must contain at least one digit')
        if not any(char.isupper() for char in v):
            raise ValueError('Password must contain at least one uppercase letter')
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    id: str
    created_at: datetime
    is_active: bool
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: str
    email: str
    role: UserRole


# ============= Q&A MODELS =============

class QARequest(BaseModel):
    question: str = Field(..., min_length=10, max_length=1000)
    language: Optional[Language] = Language.ENGLISH
    context: Optional[str] = None


class LegalAnswer(BaseModel):
    applicable_law: List[str]
    explanation: str
    user_rights: List[str]
    suggested_actions: List[str]
    legal_domain: LegalDomain
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    references: List[str]


class QAResponse(BaseModel):
    question: str
    answer: LegalAnswer
    detected_language: Language
    processing_time_seconds: float
    timestamp: datetime


class QAHistory(BaseModel):
    id: str
    user_id: str
    question: str
    answer: LegalAnswer
    created_at: datetime


# ============= MOOT COURT MODELS =============

class MootStartRequest(BaseModel):
    case_title: str = Field(..., min_length=5, max_length=200)
    case_description: Optional[str] = None
    user_side: MootSide
    case_file_url: Optional[str] = None  # If PDF uploaded


class MootMessage(BaseModel):
    role: str = Field(..., regex="^(user|judge|opponent)$")
    content: str = Field(..., min_length=1, max_length=2000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class MootScores(BaseModel):
    argument_quality: int = Field(..., ge=0, le=100)
    citation_accuracy: int = Field(..., ge=0, le=100)
    rebuttal_strength: int = Field(..., ge=0, le=100)
    legal_terminology: int = Field(..., ge=0, le=100)
    persuasiveness: int = Field(..., ge=0, le=100)
    
    @property
    def overall_score(self) -> float:
        return (
            self.argument_quality +
            self.citation_accuracy +
            self.rebuttal_strength +
            self.legal_terminology +
            self.persuasiveness
        ) / 5


class MootEndResponse(BaseModel):
    session_id: str
    scores: MootScores
    verdict: str
    detailed_feedback: str
    weak_areas: List[str]
    strong_points: List[str]
    citations_used: List[str]
    total_duration_minutes: float


class MootSession(BaseModel):
    id: str
    user_id: str
    case_title: str
    user_side: MootSide
    transcript: List[MootMessage]
    scores: Optional[MootScores] = None
    verdict: Optional[str] = None
    feedback: Optional[str] = None
    started_at: datetime
    ended_at: Optional[datetime] = None
    duration_minutes: Optional[float] = None


# ============= DOCUMENT SCANNER MODELS =============

class DocumentUpload(BaseModel):
    file_name: str
    file_type: str
    file_size_bytes: int


class ClauseAnalysis(BaseModel):
    clause_number: int
    text: str
    classification: RiskLevel
    risk_score: float = Field(..., ge=0.0, le=1.0)
    explanation: str
    legal_reference: Optional[str] = None
    suggested_modification: Optional[str] = None


class DocumentScanResult(BaseModel):
    document_id: str
    document_name: str
    file_url: str
    clauses: List[ClauseAnalysis]
    overall_risk: RiskLevel
    total_clauses: int
    safe_clauses: int
    risky_clauses: int
    illegal_clauses: int
    summary: str
    scanned_at: datetime
    processing_time_seconds: float


class DocumentScanRequest(BaseModel):
    document_id: str
    user_id: str
    file_path: str


# ============= CASE LAW MODELS =============

class CaseSearchRequest(BaseModel):
    query: str = Field(..., min_length=10, max_length=500)
    top_k: int = Field(default=5, ge=1, le=20)
    filters: Optional[Dict[str, Any]] = None


class CaseSummary(BaseModel):
    case_id: str
    case_name: str
    court: str
    year: int
    summary: str  # 3-line summary
    relevance_score: float = Field(..., ge=0.0, le=1.0)
    why_relevant: str
    key_points: List[str]
    citation: str


class CaseSearchResponse(BaseModel):
    query: str
    results: List[CaseSummary]
    total_results: int
    processing_time_seconds: float


class CaseUploadRequest(BaseModel):
    case_name: str
    court: str
    year: int
    case_text: str
    citation: str
    tags: Optional[List[str]] = None


class CaseDetail(BaseModel):
    id: str
    case_name: str
    court: str
    year: int
    citation: str
    full_text: str
    summary: str
    key_points: List[str]
    tags: List[str]
    created_at: datetime


# ============= DASHBOARD MODELS =============

class PerformanceMetrics(BaseModel):
    total_moot_sessions: int
    average_score: float
    highest_score: float
    lowest_score: float
    win_rate: float  # % of favorable verdicts
    total_hours_practiced: float


class ScoreTrend(BaseModel):
    date: datetime
    overall_score: float
    argument_quality: float
    citation_accuracy: float
    rebuttal_strength: float
    legal_terminology: float
    persuasiveness: float


class WeakArea(BaseModel):
    category: str
    current_score: float
    average_score: float
    improvement_needed: float
    recommendations: List[str]


class CitationUsage(BaseModel):
    citation: str
    usage_count: int
    success_rate: float
    last_used: datetime


class DashboardData(BaseModel):
    user_id: str
    performance_metrics: PerformanceMetrics
    score_trends: List[ScoreTrend]
    weak_areas: List[WeakArea]
    top_citations: List[CitationUsage]
    recent_sessions: List[MootSession]
    improvement_suggestions: List[str]


# ============= COMMON MODELS =============

class SuccessResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[Any] = None


class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[str] = None


class PaginationParams(BaseModel):
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=20, ge=1, le=100)


class PaginatedResponse(BaseModel):
    items: List[Any]
    total: int
    page: int
    page_size: int
    total_pages: int
