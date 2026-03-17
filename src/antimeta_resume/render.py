from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Dict, Any
from resume_pycli import html as resume_html
from weasyprint import HTML, CSS
from antimeta_resume.render_utils import format_date, format_url, format_mail
from antimeta_resume.schemas import ResumeSchema
from antimeta_resume.settings import settings

def render_pdf(resume: ResumeSchema) -> bytes:
    context = {
        "resume": resume.model_dump(mode="python", by_alias=True),
        "format_date": format_date,
        "format_url": format_url,
        "format_mail": format_mail,
        "lang": settings.locale.replace("_", "-")
    }

    with TemporaryDirectory() as tmpdir:
        output_directory: Path = Path(tmpdir)
        resume_html.export(
            resume=context,
            theme=settings.theme,
            output=output_directory
        )

        html_path, pdf_path = output_directory / "index.html", output_directory / "index.pdf"
        html: HTML = HTML(filename=str(html_path), base_url=str(output_directory))
        html.write_pdf(
            target=str(pdf_path),
            stylesheets=[CSS(string="@page { size: A4 }")],
            pdf_variant="pdf/ua-1",
            pdf_tags=True,
            custom_metadata=True
        )

        return pdf_path.read_bytes()

def render_pdf_from_dict(resume_dict: Dict[str, Any]) -> bytes:
    resume: ResumeSchema = ResumeSchema.model_validate(resume_dict)
    return render_pdf(resume)
