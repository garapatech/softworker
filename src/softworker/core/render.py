from typing import Dict, Any
from weasyprint import HTML, CSS
from softworker.enums import ResumeLanguage
from softworker.core.template import render_template
from softworker.core.template_context import get_template_context
from softworker.schemas import ResumeSchema
from softworker.settings import settings

def render_pdf(resume: ResumeSchema, resume_language: ResumeLanguage = settings.DEFAULT_LANGUAGE) -> bytes:
    context: Dict[str, Any] = get_template_context(resume, resume_language=resume_language) | {
        "css": (settings.TEMPLATE_PATH / "style.css").read_text(encoding="utf-8")
    }

    html_content: str = render_template(context, template_path=settings.TEMPLATE_PATH)
    return HTML(string=html_content, base_url=str(settings.TEMPLATE_PATH)).write_pdf(
        stylesheets=[CSS(string="@page { size: A4 }")],
        pdf_variant="pdf/ua-1",
        pdf_tags=True,
        custom_metadata=True
    )

def render_pdf_from_dict(resume_dict: Dict[str, Any], resume_language: ResumeLanguage = settings.DEFAULT_LANGUAGE) -> bytes:
    resume: ResumeSchema = ResumeSchema.model_validate(resume_dict)
    return render_pdf(resume, resume_language=resume_language)
