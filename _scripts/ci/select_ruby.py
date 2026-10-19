"""Require the existing project-pinned Ruby and Bundler; never install either."""
import os
from pathlib import Path
import subprocess

wanted = Path('.ruby-version').read_text().strip()
bundler = Path('Gemfile.lock').read_text().split('BUNDLED WITH\n', 1)[1].strip()
cache = Path(os.environ['RUNNER_TOOL_CACHE'])
candidates = [Path('/usr/bin/ruby')]
available = []
for name in ('Ruby', 'ruby'):
    root = cache / name
    if root.is_dir():
        available.extend(p.name for p in root.iterdir() if p.is_dir())
        candidates.insert(0, root / wanted / 'x64/bin/ruby')
selected = None
for binary in candidates:
    if binary.is_file():
        version = subprocess.check_output([str(binary), '-e', 'print RUBY_VERSION'], text=True)
        print('Existing native Ruby:', version, str(binary), flush=True)
        if version == wanted:
            selected = binary
            break
if selected is None:
    print('Existing cached Ruby versions:', ', '.join(sorted(available)) or 'none', flush=True)
    raise SystemExit('Blocked: pinned Ruby ' + wanted + ' is not preinstalled; installation is not authorized')
try:
    bundle = subprocess.check_output(
        [str(selected), '-rrubygems', '-e', 'print Gem.bin_path("bundler", "bundle", ARGV.fetch(0))', bundler],
        text=True,
    )
except subprocess.CalledProcessError:
    raise SystemExit('Blocked: pinned Bundler ' + bundler + ' is not preinstalled; installation is not authorized')
with open(os.environ['GITHUB_PATH'], 'a', encoding='utf-8') as output:
    output.write(str(selected.parent) + '\n')
with open(os.environ['GITHUB_ENV'], 'a', encoding='utf-8') as output:
    output.write('CI_RUBY=' + str(selected) + '\n')
    output.write('CI_BUNDLE=' + bundle + '\n')
    output.write('CI_BUNDLER_VERSION=' + bundler + '\n')
    output.write('BUNDLE_PATH=' + str(Path(os.environ['RUNNER_TEMP']) / 'site-gems') + '\n')
print('Using existing Ruby', wanted, 'and Bundler', bundler)
