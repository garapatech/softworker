# SoftWorker

Biblioteca Python para gerar currículos ATS-friendly em PDF a partir de dados estruturados em JSON Resume.

Você fornece um arquivo JSON com os dados do currículo, executa a CLI e o projeto renderiza um PDF A4 pronto para uso. O tema foi pensado para ser legível tanto por recrutadores quanto por sistemas de triagem (ATS).

## Prévia

Primeira página do PDF gerado com o exemplo principal do projeto:

![Primeira página do currículo gerado](docs/examples/images/resume.png)

## O que o projeto faz

- Lê currículos no formato JSON Resume.
- Transforma o JSON Resume em um template context reutilizável com Jsonnet.
- Renderiza o conteúdo em HTML usando templates Handlebars.
- Converte o HTML para PDF A4 com WeasyPrint.
- Gera PDF acessível com `pdf/ua-1`.

## Requisitos

- Python 3.14+
- `uv`
- Dependências nativas do WeasyPrint instaladas no sistema

## Uso rápido

Instale as dependências do projeto:

```bash
uv sync
```

Gere o PDF usando o exemplo principal:

```bash
uv run python -m softworker docs/examples/resume.json
```

Por padrão, o arquivo é salvo no diretório atual com o mesmo nome base do JSON:

```text
resume.pdf
```

Se quiser definir o caminho de saída:

```bash
uv run python -m softworker docs/examples/resume.json /tmp/curriculo.pdf
```

Se quiser renderizar em outro idioma:

```bash
uv run python -m softworker docs/examples/resume.json /tmp/resume-en.pdf --resume-language en_US
```

## Estrutura principal

- `docs/examples/resume.json`: exemplo principal
- `docs/examples/resume_full.json`: exemplo mais completo
- `docs/schema.json`: referência do formato esperado
- `src/softworker/`: código da CLI, validação e renderização
- `template/`: templates Handlebars, Jsonnet do template context, parciais e estilos CSS

## Como funciona

1. A CLI lê um arquivo JSON com os dados do currículo.
2. O conteúdo é validado e transformado por Jsonnet para o modelo consumido pelo template.
3. O HTML final é renderizado com Handlebars e convertido em PDF.

## Uso como biblioteca

Também é possível gerar o PDF diretamente em Python:

```python
import json
from pathlib import Path
from typing import Any, Dict
from softworker import render_pdf_from_dict
from softworker.enums import ResumeLanguage

resume_path = Path("docs/examples/resume.json")
output_path = Path("resume.pdf")
resume: Dict[str, Any] = json.loads(resume_path.read_text(encoding="utf-8"))
pdf: bytes = render_pdf_from_dict(resume, resume_language=ResumeLanguage.PT_BR)
output_path.write_bytes(pdf)
```

## Seções suportadas

O tema atual entende estas seções do JSON Resume:

- `basics`
- `work`
- `skills`
- `projects`
- `certificates`
- `awards`
- `education`
- `languages`
- `profiles`
- `publications`
- `volunteer`
- `interests`
- `references`
