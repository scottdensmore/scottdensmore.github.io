# CI-only rendering harness. Nothing here is loaded by the deployment workflow.
require 'socket'
require 'json'
require 'jekyll'
require 'jekyll-github-metadata'

# Use the plugin's existing offline fallback without DNS or GitHub API calls.
# Verified against the locked jekyll-github-metadata 2.16.1 Client implementation.
Jekyll::GitHubMetadata::Client.prepend(Module.new do
  def internet_connected?
    false
  end
end)

# Unexpected Ruby network attempts fail the build, rather than contact services.
CI_NETWORK_ATTEMPTS = []
at_exit do
  raise 'CI site rendering attempted network access' unless CI_NETWORK_ATTEMPTS.empty?
end
Socket.prepend(Module.new do
  def connect(*)
    CI_NETWORK_ATTEMPTS << true
    raise 'Network access is forbidden during CI site rendering'
  end

  def connect_nonblock(*)
    CI_NETWORK_ATTEMPTS << true
    raise 'Network access is forbidden during CI site rendering'
  end
end)
TCPSocket.prepend(Module.new do
  def initialize(*)
    CI_NETWORK_ATTEMPTS << true
    raise 'Network access is forbidden during CI site rendering'
  end
end)
UDPSocket.prepend(Module.new do
  def send(*)
    CI_NETWORK_ATTEMPTS << true
    raise 'Network access is forbidden during CI site rendering'
  end
end)

Jekyll::Hooks.register :site, :post_write do |site|
  summary = {
    'posts' => site.posts.docs.length,
    'post_outputs' => site.posts.docs.map { |post| post.destination(site.dest) }
  }
  File.write(File.join(ENV.fetch('RUNNER_TEMP'), 'site-build-summary.json'), JSON.generate(summary))
end

ARGV.replace(['build', '--trace', '--destination', File.join(ENV.fetch('RUNNER_TEMP'), 'site')])
load Gem.bin_path('jekyll', 'jekyll')
