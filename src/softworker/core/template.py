from pathlib import Path
from typing import Any, Dict, Callable
from pybars import Compiler
from softworker.settings import settings

def render_template(context: Dict[str, Any], template_path: Path = settings.TEMPLATE_PATH) -> str:
    compiler: Compiler = Compiler()
    template: Callable[..., str] = compiler.compile((template_path / "index.hbs").read_text(encoding="utf-8"))
    template_partials: Dict[str, Callable[..., str]] = {}
    for path in template_path.rglob("*.hbs"):
        name: str = path.relative_to(template_path).with_suffix("").as_posix()
        if name == "index":
            continue
        template_partials[name] = compiler.compile(path.read_text(encoding="utf-8"))
    return str(template(context, partials=template_partials))
