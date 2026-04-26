from typing import List, Optional
from pydantic import AliasChoices, Field
from softworker.schemas.base_schema import ResumeBaseModel
from softworker.schemas.basics_location_schema import BasicsLocationSchema
from softworker.schemas.basics_profile_schema import BasicsProfileSchema

class BasicsSchema(ResumeBaseModel):
    name: str
    label: str
    image: Optional[str] = Field(default=None, validation_alias=AliasChoices("image", "picture"))
    email: str
    phone: str
    url: Optional[str] = Field(default=None, validation_alias=AliasChoices("url", "website"))
    summary: Optional[str] = None
    location: BasicsLocationSchema = Field(default_factory=BasicsLocationSchema)
    profiles: List[BasicsProfileSchema] = Field(default_factory=list)
