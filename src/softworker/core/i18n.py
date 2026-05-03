import json
from pathlib import Path
from typing import Any, Dict
from softworker.enums import ResumeLanguage

def get_template_i18n(template_path: Path, language: ResumeLanguage) -> Dict[str, Any]:
    translations: Dict[str, Any] = json.loads((template_path / "i18n.json").read_text(encoding="utf-8"))
    return translations[language.value]
