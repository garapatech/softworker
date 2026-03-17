from pathlib import Path
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # General
    locale: str = "pt_BR"

    # Paths
    module_root: Path = Path(__file__).resolve().parent
    theme: Path = module_root / "theme"

settings: Settings = Settings()
