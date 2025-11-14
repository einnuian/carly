"""
Configuration management using environment variables
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""

    # API Keys
    ANTHROPIC_API_KEY: str
    AUTO_DEV_API_KEY: str

    # Application
    CORS_ORIGINS: str = "http://localhost:5173"
    DEBUG: bool = True

    # Scoring weights
    WEIGHT_EDMUNDS: float = 0.30
    WEIGHT_CONSUMER: float = 0.20
    WEIGHT_SAFETY: float = 0.30
    WEIGHT_VALUE: float = 0.20

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins into a list"""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    def validate_weights(self) -> bool:
        """Ensure scoring weights sum to 1.0"""
        total = (self.WEIGHT_EDMUNDS + self.WEIGHT_CONSUMER +
                self.WEIGHT_SAFETY + self.WEIGHT_VALUE)
        return abs(total - 1.0) < 0.001

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

# Validate weights on startup
if not settings.validate_weights():
    raise ValueError("Scoring weights must sum to 1.0")
