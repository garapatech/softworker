from typing import Optional
from softworker.schemas.base_schema import ResumeBaseModel

class LanguageSchema(ResumeBaseModel):
    language: str
    fluency: Optional[str] = None
