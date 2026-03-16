from typing import List
from typing import Optional
from pydantic import AliasChoices
from pydantic import Field
from antimeta_resume.schemas.base_schema import ResumeBaseModel
from antimeta_resume.schemas.highlight_schema import HighlightSchema

class VolunteerSchema(ResumeBaseModel):
    organization: str
    position: str
    url: Optional[str] = Field(default=None, validation_alias=AliasChoices("url", "website"))
    start_date: str = Field(alias="startDate")
    end_date: Optional[str] = Field(default=None, alias="endDate")
    summary: Optional[str] = None
    highlights: List[HighlightSchema] = Field(default_factory=list)
