from typing import Optional
from pydantic import Field, AliasChoices
from softworker.schemas.base_schema import ResumeBaseModel

class PublicationSchema(ResumeBaseModel):
    name: str
    publisher: str
    release_date: Optional[str] = Field(default=None, alias="releaseDate")
    url: Optional[str] = Field(default=None, validation_alias=AliasChoices("url", "website"))
    summary: Optional[str] = None
