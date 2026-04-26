from softworker.schemas.base_schema import ResumeBaseModel

class BasicsProfileSchema(ResumeBaseModel):
    network: str
    username: str
    url: str
