require 'cuba'
require 'rack/protection'
require 'pg'
require 'active_record'
require 'devise'
require 'oj'
require 'rspec'
require 'rack/test'
require 'pry'
require 'shoulda/matchers'
require './app.rb'

ActiveRecord::Base.establish_connection(YAML::load(File.open('./db/config.yml'))["test"])

RSpec.configure do |config|
  config.formatter = 'doc'
  config.include Rack::Test::Methods
  config.after(:each) do
    # Model.all.each { |m| m.destroy }
  end
end
