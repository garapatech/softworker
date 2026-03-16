from pathlib import Path
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # General
    locale: str = "pt_BR"

    # Paths
    root: Path = Path(__file__).resolve().parents[2]
    theme: Path = root / "theme"

settings = Settings()
