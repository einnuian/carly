"""
Carly - Car Recommendation Engine
Main FastAPI Application
"""

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging

from routes import recommendations
from utils.config import settings

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    logger.info("Starting Carly backend service...")
    logger.info(f"Anthropic API configured: {bool(settings.ANTHROPIC_API_KEY)}")
    logger.info(f"Scoring weights validated: {settings.validate_weights()}")
    yield
    logger.info("Shutting down Carly backend service...")


# Initialize FastAPI application
app = FastAPI(
    title="Carly API",
    description="AI-Powered Car Recommendation Engine",
    version="0.1.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom exception handler for validation errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Log validation errors with details"""
    body = await request.body()
    logger.error(f"Validation Error on {request.url.path}")
    logger.error(f"Errors: {exc.errors()}")
    logger.error(f"Request body: {body.decode()}")
    return JSONResponse(
        status_code=422,
        content={
            "detail": exc.errors(),
            "request_body": body.decode()
        }
    )

# Include routers
app.include_router(recommendations.router, prefix="/api", tags=["recommendations"])


@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "message": "Carly Car Recommendation Engine API",
        "version": "0.1.0",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "anthropic_configured": bool(settings.ANTHROPIC_API_KEY)
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
