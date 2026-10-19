"""Check the actual rendered site without publishing it or fetching any URLs."""
import json
import os
from pathlib import Path
import xml.etree.ElementTree as ET

temporary = Path(os.environ['RUNNER_TEMP'])
site = (temporary / 'site').resolve()
summary = json.loads((temporary / 'site-build-summary.json').read_text())
assert summary['posts'] > 0, 'No posts rendered'
for name in ('index.html', 'search.json', 'feed.xml', 'sitemap.xml'):
    path = site / name
    assert path.is_file() and path.stat().st_size > 0, 'Missing rendered output: ' + name
for name in ('feed.xml', 'sitemap.xml'):
    ET.parse(site / name)
search = json.loads((site / 'search.json').read_text())
assert isinstance(search, list) and len(search) == summary['posts'], 'Search/post count mismatch'
assert len({post['url'] for post in search}) == len(search), 'Duplicate search URLs'
for post in search:
    assert {'title', 'url', 'date_iso', 'tags', 'content'} <= post.keys(), 'Incomplete search entry'
for name in summary['post_outputs']:
    path = Path(name).resolve()
    path.relative_to(site)
    assert path.is_file() and path.stat().st_size > 0, 'Missing rendered post'
print('Rendered', summary['posts'], 'posts; matching search records, index, feed and sitemap passed')
print('Offline metadata fixture only; no publication or live metadata acceptance')
