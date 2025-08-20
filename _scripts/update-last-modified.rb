#!/usr/bin/env ruby

require 'yaml'
require 'time'

# Get a list of staged files, filtered to the _posts directory
staged_files = `git diff --cached --name-only --diff-filter=AM _posts/`.split("\n")

exit 0 if staged_files.empty?

puts "Updating last_modified_at for staged posts..."

staged_files.each do |file_path|
  # Ensure we are only processing markdown files
  next unless file_path.end_with?('.md', '.markdown')

  content = File.read(file_path)

  # Regex to separate YAML front matter from the post body
  match = content.match(/(---\s*\n(.*?)\n---\s*\n)(.*)/m)

  unless match
    puts "  - Skipping #{file_path}: No front matter found."
    next
  end

  front_matter_delimiters = match[1]
  front_matter_string = match[2]
  body = match[3]

  begin
    front_matter = YAML.load(front_matter_string)
    # Format the current time to match Jekyll's format
    current_time_str = Time.now.strftime('%Y-%m-%d %H:%M:%S %z')

    # Update the last_modified_at field
    front_matter['last_modified_at'] = current_time_str

    # Convert the updated front matter back to a YAML string
    updated_front_matter_string = YAML.dump(front_matter)

    # Rebuild the file content
    # YAML.dump might add its own '---', so we remove it before re-wrapping
    new_content = "---" + updated_front_matter_string.gsub(/^--- \n/, '') + "---" + body

    # Write the changes back to the file
    File.write(file_path, new_content)

    # Stage the changes so they are included in the commit
    `git add #{file_path}`

    puts "  - Updated #{file_path}"
  rescue Psych::SyntaxError => e
    puts "  - Skipping #{file_path}: Invalid YAML in front matter. #{e.message}"
  end
end

puts "Update complete."
exit 0
