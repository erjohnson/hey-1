class IndexMessageLatLon < ActiveRecord::Migration
  def change
    add_index :messages, [:latitude, :longitude]
  end
end
