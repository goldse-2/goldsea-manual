from pathlib import Path
import re

site = Path(__file__).resolve().parent / "site"
excluded_parts = {"1131503090", "3D", "3D.MD"}

header_pattern = re.compile(r'<header class="md-header[\s\S]*?</header>\s*', re.IGNORECASE)
tabs_pattern = re.compile(r'<nav class="md-tabs[\s\S]*?</nav>\s*', re.IGNORECASE)

for html_path in site.rglob("*.html"):
    rel_parts = set(html_path.relative_to(site).parts)
    if rel_parts & excluded_parts:
        continue
    text = html_path.read_text(encoding="utf-8")
    if "storefront-page-header" not in text and "storefront-page" not in text:
        continue
    text = header_pattern.sub("", text)
    text = tabs_pattern.sub("", text)
    html_path.write_text(text, encoding="utf-8")

print("Removed Material header/tabs from storefront pages")
