from datetime import datetime
from typing import Any
from babel.dates import format_date as babel_format_date
from markupsafe import Markup
from markupsafe import escape
from yarl import URL
from antimeta_resume.settings import settings

def format_date(date: Any) -> str:
    default_value: str = "o momento"
    if not date:
        return default_value

    text: str = str(date).strip().replace("Z", "+00:00")
    try:
        for format in ("%Y-%m", "%Y-%m-%d"):
            try:
                dt = datetime.strptime(text, format)
                break
            except ValueError:
                pass
        else: dt = datetime.fromisoformat(text)
    except ValueError:
        return default_value
    return babel_format_date(dt, format="MMM y", locale=settings.locale)

def format_mail(mail: Any) -> Markup:
    if not mail:
        return Markup()

    text: str = escape(str(mail).strip())
    return Markup(f'<a href="mailto:{text}">{text}</a>')

def format_url(url: Any) -> Markup:
    if not url:
        return Markup()

    u: URL = URL(url if "://" in str(url) else f"https://{url}")
    url_label: str = f"{u.host or ''}{u.path}".removeprefix("www.").rstrip("/").replace("/", "/<wbr>").replace(".", ".<wbr>")
    return Markup(f'<a class="url-link" href="{escape(url)}">{url_label}</a>')
