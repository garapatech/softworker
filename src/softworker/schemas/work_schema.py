from typing import List, Optional
from pydantic import AliasChoices, Field
from softworker.schemas.base_schema import ResumeBaseModel
from softworker.schemas.highlight_schema import HighlightSchema

class WorkSchema(ResumeBaseModel):
    name: str = Field(validation_alias=AliasChoices("name", "company"))
    description: Optional[str] = None
    position: str
    url: Optional[str] = Field(default=None, validation_alias=AliasChoices("url", "website"))
    location: Optional[str] = None
    start_date: str = Field(alias="startDate")
    end_date: Optional[str] = Field(default=None, alias="endDate")
    summary: Optional[str] = None
    highlights: List[HighlightSchema] = Field(default_factory=list)
