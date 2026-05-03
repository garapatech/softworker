import jsonata
from typing import Any, Dict, cast
from softworker.enums import ResumeLanguage
from softworker.core.i18n import get_template_i18n
from softworker.schemas import ResumeSchema
from softworker.settings import settings

def get_template_context(resume: ResumeSchema, resume_language: ResumeLanguage = settings.DEFAULT_LANGUAGE) -> Dict[str, Any]:
    resume_dict: Dict[str, Any] = resume.model_dump(mode="python", by_alias=True)
    i18n: Dict[str, Any] = get_template_i18n(settings.TEMPLATE_PATH, resume_language)
    return jsonata.Jsonata(settings.TEMPLATE_CONTEXT_PATH.read_text(encoding="utf-8")).evaluate(
        {
            "resume": resume_dict,
            "i18n": i18n
        }
    )

def get_template_context_from_dict(resume_dict: Dict[str, Any], resume_language: ResumeLanguage = settings.DEFAULT_LANGUAGE) -> Dict[str, Any]:
    resume: ResumeSchema = ResumeSchema.model_validate(resume_dict)
    return get_template_context(resume, resume_language=resume_language)
