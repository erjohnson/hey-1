# Message Model
class Message < ActiveRecord::Base
  extend Geocoder::Model::ActiveRecord
  reverse_geocoded_by :latitude, :longitude
end
