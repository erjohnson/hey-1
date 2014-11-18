# api/messages
class Messages < Cuba
end

Messages.define do
  res.headers['Content-Type'] = 'application/json; charset=utf-8'
  on root do
    on get do
      on param('latitude'), param('longitude') do |lat, lon|
        position = [lat.to_f, lon.to_f]
        messages = Message.order('created_at DESC').near(position, 1, units: :km)
        res.write Oj.dump(messages, mode: :compat)
        puts Oj.dump(res)
      end
    end
    on post do
      on param('content'), param('latitude'), param('longitude') do |c, lat, lon|
        message = Message.create(content: c, latitude: lat.to_f, longitude: lon.to_f)
        res.status = 201
        res.write Oj.dump(message, mode: :compat)
      end
    end
  end
end
