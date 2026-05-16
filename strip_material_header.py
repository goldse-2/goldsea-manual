from pathlib import Path
import re

site = Path(__file__).resolve().parent / "site"
excluded_parts = {"1131503090", "3D", "3D.MD"}

header_pattern = re.compile(r'<header class="md-header[\s\S]*?</header>\s*', re.IGNORECASE)
tabs_pattern = re.compile(r'<nav class="md-tabs[\s\S]*?</nav>\s*', re.IGNORECASE)
tabs_div_pattern = re.compile(r'<div class="md-tabs[\s\S]*?</div>\s*</nav>\s*', re.IGNORECASE)


def remove_balanced_div(text: str, class_fragment: str) -> str:
    start = text.find(class_fragment)
    if start == -1:
        return text
    div_start = text.rfind('<div', 0, start)
    if div_start == -1:
        return text
    pos = div_start
    depth = 0
    while pos < len(text):
        next_open = text.find('<div', pos)
        next_close = text.find('</div>', pos)
        if next_close == -1:
            return text
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            pos = next_close + 6
            if depth == 0:
                return text[:div_start] + text[pos:]
    return text

nav_tabs_pattern = re.compile(r'<nav[^>]*data-md-level="0"[\s\S]*?</nav>\s*', re.IGNORECASE)

for html_path in site.rglob("*.html"):
    rel_parts = set(html_path.relative_to(site).parts)
    if rel_parts & excluded_parts:
        continue
    text = html_path.read_text(encoding="utf-8")
    if "storefront-page-header" not in text and "storefront-page" not in text:
        continue
    text = header_pattern.sub("", text)
    text = tabs_div_pattern.sub("", text)
    text = nav_tabs_pattern.sub("", text)
    text = tabs_pattern.sub("", text)
    text = remove_balanced_div(text, 'md-sidebar md-sidebar--primary')
    text = remove_balanced_div(text, 'md-sidebar md-sidebar--secondary')
    html_path.write_text(text, encoding="utf-8")

print("Removed Material header/tabs from storefront pages")
