from typing import Optional
from softworker.schemas.base_schema import ResumeBaseModel

class AwardSchema(ResumeBaseModel):
    title: str
    date: Optional[str] = None
    awarder: Optional[str] = None
    summary: Optional[str] = None
