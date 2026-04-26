from typing import List
from pydantic import Field
from softworker.schemas.base_schema import ResumeBaseModel
from softworker.schemas.keyword_schema import KeywordSchema

class InterestSchema(ResumeBaseModel):
    name: str
    keywords: List[KeywordSchema] = Field(default_factory=list)
