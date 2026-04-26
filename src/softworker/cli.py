import json
from typing import Optional
from pathlib import Path
from typer import Typer, Argument
from softworker import render_pdf_from_dict

app: Typer = Typer(no_args_is_help=True)

@app.command()
def render(input_path: Path, output_path: Optional[Path] = Argument(None)) -> None:
    pdf: bytes = render_pdf_from_dict(json.loads(input_path.read_text(encoding="utf-8")))
    output_path = output_path or Path.cwd() / f"{input_path.stem}.pdf"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(pdf)
    print(output_path)

if __name__ == "__main__":
    app()
