#!/usr/bin/env ruby

require 'yaml'

# Load configuration from YAML file
def load_configuration
  config_file = File.join(__dir__, 'tag-mappings.yml')
  
  unless File.exist?(config_file)
    puts "ERROR: Configuration file not found: #{config_file}"
    puts "Please create tag-mappings.yml with tag and category mappings."
    exit 1
  end
  
  begin
    YAML.safe_load(File.read(config_file))
  rescue StandardError => e
    puts "ERROR: Failed to load configuration file: #{config_file}"
    puts "  Error: #{e.class}: #{e.message}"
    exit 1
  end
end

# Load configuration
CONFIG = load_configuration

# Extract mappings and constants from configuration
TAG_MAPPING = CONFIG['tag_mapping'] || {}
CATEGORY_MAPPING = CONFIG['category_mapping'] || {}
EXCERPT_LENGTH_LIMIT = CONFIG.dig('config', 'excerpt_length_limit') || 160
DEFAULT_TAG = CONFIG.dig('config', 'default_tag') || 'general'
DEFAULT_CATEGORY = CONFIG.dig('config', 'default_category') || 'Technology'

def extract_front_matter(content)
  return nil unless content.start_with?('---')
  
  end_idx = content.index('---', 3)
  return nil unless end_idx
  
  yaml_content = content[3...end_idx].strip
  
  begin
    YAML.safe_load(yaml_content)
  rescue Psych::SyntaxError => e
    puts "ERROR: Malformed YAML front matter detected"
    puts "  YAML parsing error: #{e.message}"
    puts "  Problem line: #{e.line}" if e.respond_to?(:line)
    puts "  Problem column: #{e.column}" if e.respond_to?(:column)
    puts "  YAML content:"
    yaml_content.split("\n").each_with_index do |line, idx|
      puts "    #{idx + 1}: #{line}"
    end
    puts
    return nil
  rescue StandardError => e
    puts "ERROR: Unexpected error parsing YAML front matter"
    puts "  Error: #{e.class}: #{e.message}"
    puts "  YAML content:"
    yaml_content.split("\n").each_with_index do |line, idx|
      puts "    #{idx + 1}: #{line}"
    end
    puts
    return nil
  end
end

def generate_excerpt(content)
  # Remove front matter
  content_without_front_matter = content.gsub(/\A---.*?---\n/m, '')
  
  # Get first paragraph, clean it up
  first_paragraph = content_without_front_matter.split(/\n\s*\n/).first
  return nil unless first_paragraph
  
  # Remove markdown syntax
  excerpt = first_paragraph.gsub(/!\[.*?\]\(.*?\)/, '') # images
                          .gsub(/\[([^\]]+)\]\([^\)]+\)/, '\1') # links
                          .gsub(/`([^`]+)`/, '\1') # inline code
                          .gsub(/#+\s*/, '') # headers
                          .gsub(/\*\*([^*]+)\*\*/, '\1') # bold
                          .gsub(/\*([^*]+)\*/, '\1') # italic
                          .strip
  
  # Truncate to reasonable length
  if excerpt.length > EXCERPT_LENGTH_LIMIT
    excerpt = excerpt[0..(EXCERPT_LENGTH_LIMIT - 4)] + '...'
  end
  
  excerpt.empty? ? nil : excerpt
end

def suggest_tags(title, content)
  text = "#{title} #{content}".downcase
  suggested_tags = []
  
  TAG_MAPPING.each do |tag, keywords|
    if keywords.any? { |keyword| text.include?(keyword.downcase) }
      suggested_tags << tag
    end
  end
  
  suggested_tags.empty? ? [DEFAULT_TAG] : suggested_tags.uniq
end

def suggest_categories(tags)
  categories = []
  
  CATEGORY_MAPPING.each do |category, category_tags|
    if (tags & category_tags).any?
      categories << category
    end
  end
  
  categories.empty? ? [DEFAULT_CATEGORY] : categories.uniq
end

def process_post(file_path)
  begin
    content = File.read(file_path)
  rescue StandardError => e
    puts "ERROR: Failed to read file #{File.basename(file_path)}"
    puts "  Error: #{e.class}: #{e.message}"
    puts
    return false
  end
  
  front_matter = extract_front_matter(content)
  
  unless front_matter
    puts "SKIPPED: #{File.basename(file_path)} - No valid front matter found"
    puts
    return false
  end
  
  # Generate suggestions
  title = front_matter['title'] || ''
  excerpt = front_matter['excerpt'] || generate_excerpt(content)
  tags = front_matter['tags'] || suggest_tags(title, content)
  categories = front_matter['categories'] || suggest_categories(tags)
  
  # Update front matter
  front_matter['tags'] = tags
  front_matter['categories'] = categories
  front_matter['excerpt'] = excerpt if excerpt
  
  # Reconstruct file
  begin
    yaml_string = YAML.dump(front_matter).sub(/\A---\n/, '').sub(/\n\z/, '')
    content_without_front_matter = content.gsub(/\A---.*?---\n/m, '')
    
    new_content = "---\n#{yaml_string}\n---\n#{content_without_front_matter}"
    
    File.write(file_path, new_content)
  rescue StandardError => e
    puts "ERROR: Failed to write updated content to #{File.basename(file_path)}"
    puts "  Error: #{e.class}: #{e.message}"
    puts
    return false
  end
  
  puts "Updated: #{File.basename(file_path)}"
  puts "  Tags: #{tags.join(', ')}"
  puts "  Categories: #{categories.join(', ')}"
  puts "  Excerpt: #{excerpt ? excerpt[0..50] + '...' : 'None'}"
  puts
  
  return true
end

# Process all posts
files_processed = 0
files_skipped = 0
files_errored = 0

Dir.glob('_posts/*.md').each do |file|
  begin
    result = process_post(file)
    if result == false
      files_skipped += 1
    else
      files_processed += 1
    end
  rescue StandardError => e
    files_errored += 1
    puts "FATAL ERROR processing #{File.basename(file)}"
    puts "  Error: #{e.class}: #{e.message}"
    puts "  Backtrace: #{e.backtrace.first(3).join("\n             ")}"
    puts
  end
end

puts "Front matter standardization complete!"
puts "  Files processed: #{files_processed}"
puts "  Files skipped: #{files_skipped}" if files_skipped > 0
puts "  Files with errors: #{files_errored}" if files_errored > 0