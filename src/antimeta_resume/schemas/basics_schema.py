from typing import List
from typing import Optional
from pydantic import AliasChoices
from pydantic import Field

from antimeta_resume.schemas.base_schema import ResumeBaseModel
from antimeta_resume.schemas.basics_location_schema import BasicsLocationSchema
from antimeta_resume.schemas.basics_profile_schema import BasicsProfileSchema


class BasicsSchema(ResumeBaseModel):
    name: str
    label: Optional[str] = None
    image: Optional[str] = Field(default=None, validation_alias=AliasChoices("image", "picture"))
    email: Optional[str] = None
    phone: Optional[str] = None
    url: Optional[str] = Field(default=None, validation_alias=AliasChoices("url", "website"))
    summary: Optional[str] = None
    location: BasicsLocationSchema = Field(default_factory=BasicsLocationSchema)
    profiles: List[BasicsProfileSchema] = Field(default_factory=list)
