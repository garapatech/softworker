import sysconfig
from pathlib import Path
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # General
    LOCALE: str = "pt_BR"

    # Paths
    ROOT_PATH: Path = Path(__file__).resolve().parents[2]
    THEME_LOCAL_PATH: Path = ROOT_PATH / "theme"
    THEME_MODULE_PATH: Path = Path(sysconfig.get_path("data")) / "share" / Path(__file__).resolve().parent.name / "theme"
    THEME_PATH: Path = THEME_LOCAL_PATH if THEME_LOCAL_PATH.exists() else THEME_MODULE_PATH

settings: Settings = Settings()
