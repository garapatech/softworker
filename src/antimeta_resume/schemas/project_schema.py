from typing import List
from typing import Optional
from pydantic import Field
from antimeta_resume.schemas.base_schema import ResumeBaseModel
from antimeta_resume.schemas.highlight_schema import HighlightSchema
from antimeta_resume.schemas.keyword_schema import KeywordSchema

class ProjectSchema(ResumeBaseModel):
    name: str
    description: str
    highlights: List[HighlightSchema] = Field(default_factory=list)
    keywords: List[KeywordSchema] = Field(default_factory=list)
    start_date: Optional[str] = Field(default=None, alias="startDate")
    end_date: Optional[str] = Field(default=None, alias="endDate")
    url: Optional[str] = None
    roles: List[str] = Field(default_factory=list)
    entity: Optional[str] = None
    project_type: Optional[str] = Field(default=None, alias="type")
