from typing import List
from typing import Optional
from pydantic import AliasChoices
from pydantic import Field
from antimeta_resume.schemas.base_schema import ResumeBaseModel
from antimeta_resume.schemas.course_schema import CourseSchema

class EducationSchema(ResumeBaseModel):
    institution: str
    area: str
    study_type: str = Field(alias="studyType")
    url: Optional[str] = Field(default=None, validation_alias=AliasChoices("url", "website"))
    start_date: str = Field(alias="startDate")
    end_date: Optional[str] = Field(default=None, alias="endDate")
    score: Optional[str] = Field(default=None, validation_alias=AliasChoices("score", "gpa"))
    courses: List[CourseSchema] = Field(default_factory=list)
