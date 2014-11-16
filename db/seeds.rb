require 'pg'
require 'active_record'
require 'devise'

Dir['./models/**/*.rb'].each  { |rb| require rb }

# MyModel.create()
