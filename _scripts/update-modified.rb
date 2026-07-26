#!/usr/bin/env ruby
# Claude Code PostToolUse hook helper.
#
# Reads the hook JSON payload on stdin, and if the edited file is a post under
# _posts/, stamps its `last_modified_at` front-matter field with the current time.
#
# The update is surgical (single line replaced/inserted) so the rest of the front
# matter is left byte-for-byte unchanged — no YAML reformatting, no key reordering.

require 'json'
require 'time'

raw = $stdin.read
input = (JSON.parse(raw) rescue {})
path = input.dig('tool_input', 'file_path').to_s

# Only touch markdown posts.
exit 0 unless path =~ %r{(?:\A|/)_posts/[^/]+\.(?:md|markdown)\z}
exit 0 unless File.file?(path)

content = File.read(path)

# Split off the leading YAML front matter block.
m = content.match(/\A(---\s*\n)(.*?\n)(---\s*\n)(.*)\z/m)
exit 0 unless m
open_delim, front_matter, close_delim, body = m[1], m[2], m[3], m[4]

stamp = Time.now.strftime('%Y-%m-%d %H:%M:%S %z')

if front_matter =~ /^last_modified_at:.*$/
  front_matter = front_matter.sub(/^last_modified_at:.*$/, "last_modified_at: #{stamp}")
elsif front_matter =~ /^date:.*$/
  # Insert right after the date: line.
  front_matter = front_matter.sub(/^(date:.*)$/, "\\1\nlast_modified_at: #{stamp}")
else
  front_matter += "last_modified_at: #{stamp}\n"
end

File.write(path, open_delim + front_matter + close_delim + body)
exit 0
