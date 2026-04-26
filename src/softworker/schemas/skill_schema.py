from typing import List, Optional
from pydantic import Field
from softworker.schemas.base_schema import ResumeBaseModel
from softworker.schemas.keyword_schema import KeywordSchema

class SkillSchema(ResumeBaseModel):
    name: str
    level: Optional[str] = None
    keywords: List[KeywordSchema] = Field(default_factory=list)
