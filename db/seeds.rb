require 'pg'
require 'active_record'
require 'geocoder'
require 'devise'

Dir['./models/**/*.rb'].each  { |rb| require rb }

Message.create(content: "Hello Epicodus", latitude: 45.521838, longitude: -122.675646)
Message.create(content: "Hello New Relic", latitude: 45.52263, longitude: -122.67575)
Message.create(content: "Hello Roseland Theater", latitude: 45.523256, longitude: -122.67626)
Message.create(content: "Hello Roadside Attraction", latitude: 45.515619, longitude: -122.653285)
Message.create(content: "Hello Green Dragon", latitude: 45.516004, longitude: -122.656513)
