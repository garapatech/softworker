from typing import List
from typing import Optional
from pydantic import Field
from antimeta_resume.schemas.award_schema import AwardSchema
from antimeta_resume.schemas.basics_schema import BasicsSchema
from antimeta_resume.schemas.base_schema import ResumeBaseModel
from antimeta_resume.schemas.certificate_schema import CertificateSchema
from antimeta_resume.schemas.education_schema import EducationSchema
from antimeta_resume.schemas.interest_schema import InterestSchema
from antimeta_resume.schemas.language_schema import LanguageSchema
from antimeta_resume.schemas.meta_schema import MetaSchema
from antimeta_resume.schemas.project_schema import ProjectSchema
from antimeta_resume.schemas.publication_schema import PublicationSchema
from antimeta_resume.schemas.reference_schema import ReferenceSchema
from antimeta_resume.schemas.skill_schema import SkillSchema
from antimeta_resume.schemas.volunteer_schema import VolunteerSchema
from antimeta_resume.schemas.work_schema import WorkSchema

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
