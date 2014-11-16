require 'cuba'
require 'rack'
require 'rack/protection'
require 'pg'
require 'active_record'
require 'devise'
require 'oj'

Dir['./models/**/*.rb'].each  { |rb| require rb }
Dir['./routes/**/*.rb'].each  { |rb| require rb }

ActiveRecord::Base.establish_connection(YAML::load(File.open('./db/config.yml'))['development'])

Cuba.use Rack::Session::Cookie, :secret => "__a_very_long_string__"
Cuba.use Rack::Protection
Cuba.use Rack::Protection::RemoteReferrer

Cuba.use Rack::Static,
  root: 'public',
  urls: ['/js', '/css', '/img'],
  index: 'index.html'

Cuba.define do

  on root do
    res.write 'root'
  end

  on 'api/things' do
    run Things
  end

end
