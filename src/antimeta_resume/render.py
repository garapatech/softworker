from pathlib import Path
from tempfile import TemporaryDirectory
from resume_pycli import html as resume_html
from weasyprint import HTML, CSS
from antimeta_resume.render_utils import format_date
from antimeta_resume.render_utils import format_mail
from antimeta_resume.render_utils import format_url
from antimeta_resume.schemas.resume_schema import ResumeSchema
from antimeta_resume.settings import settings

def render_pdf(resume: ResumeSchema) -> bytes:
    context = {
        "resume": resume.model_dump(mode="python", by_alias=True),
        "format_date": format_date,
        "format_mail": format_mail,
        "format_url": format_url,
    }

    with TemporaryDirectory() as tmpdir:
        output: Path = Path(tmpdir)
        resume_html.export(
            resume=context,
            theme=settings.theme,
            output=output,
        )

        html_path, pdf_path = output / "index.html", output / "index.pdf"
        html: HTML = HTML(filename=str(html_path), base_url=str(output))
        html.write_pdf(target=str(pdf_path), stylesheets=[CSS(string="@page { size: A4 }")])
        return pdf_path.read_bytes()
