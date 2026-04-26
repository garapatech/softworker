from typing import List, Optional
from pydantic import Field
from softworker.schemas.award_schema import AwardSchema
from softworker.schemas.base_schema import ResumeBaseModel
from softworker.schemas.basics_schema import BasicsSchema
from softworker.schemas.certificate_schema import CertificateSchema
from softworker.schemas.education_schema import EducationSchema
from softworker.schemas.interest_schema import InterestSchema
from softworker.schemas.language_schema import LanguageSchema
from softworker.schemas.meta_schema import MetaSchema
from softworker.schemas.project_schema import ProjectSchema
from softworker.schemas.publication_schema import PublicationSchema
from softworker.schemas.reference_schema import ReferenceSchema
from softworker.schemas.skill_schema import SkillSchema
from softworker.schemas.volunteer_schema import VolunteerSchema
from softworker.schemas.work_schema import WorkSchema

class ResumeSchema(ResumeBaseModel):
    schema_url: Optional[str] = Field(default=None, alias="$schema")
    basics: BasicsSchema
    work: List[WorkSchema] = Field(default_factory=list)
    volunteer: List[VolunteerSchema] = Field(default_factory=list)
    education: List[EducationSchema] = Field(default_factory=list)
    awards: List[AwardSchema] = Field(default_factory=list)
    publications: List[PublicationSchema] = Field(default_factory=list)
    skills: List[SkillSchema] = Field(default_factory=list)
    languages: List[LanguageSchema] = Field(default_factory=list)
    interests: List[InterestSchema] = Field(default_factory=list)
    references: List[ReferenceSchema] = Field(default_factory=list)
    projects: List[ProjectSchema] = Field(default_factory=list)
    certificates: List[CertificateSchema] = Field(default_factory=list)
    meta: MetaSchema = Field(default_factory=MetaSchema)
