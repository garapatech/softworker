from pydantic import BaseModel, ConfigDict

class ResumeBaseModel(BaseModel):
    model_config = ConfigDict(extra="allow", populate_by_name=True)
