from softworker.schemas.base_schema import ResumeBaseModel

class ReferenceSchema(ResumeBaseModel):
    name: str
    reference: str
