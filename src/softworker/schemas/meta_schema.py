from typing import Optional
from pydantic import Field
from softworker.schemas.base_schema import ResumeBaseModel

class MetaSchema(ResumeBaseModel):
    canonical: Optional[str] = None
    version: Optional[str] = None
    last_modified: Optional[str] = Field(default=None, alias="lastModified")
