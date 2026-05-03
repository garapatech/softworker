import sysconfig
from pathlib import Path
from pydantic_settings import BaseSettings
from softworker.enums import ResumeLanguage

class Settings(BaseSettings):
    # General
    DEFAULT_LANGUAGE: ResumeLanguage = ResumeLanguage.PT_BR

    # Paths
    ROOT_PATH: Path = Path(__file__).resolve().parents[2]
    TEMPLATE_LOCAL_PATH: Path = ROOT_PATH / "template"
    TEMPLATE_MODULE_PATH: Path = Path(sysconfig.get_path("data")) / "share" / Path(__file__).resolve().parent.name / "template"
    TEMPLATE_PATH: Path = TEMPLATE_LOCAL_PATH if TEMPLATE_LOCAL_PATH.exists() else TEMPLATE_MODULE_PATH
    TEMPLATE_CONTEXT_PATH: Path = TEMPLATE_PATH / "resume.jsonata"

settings: Settings = Settings()
