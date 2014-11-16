# api/things
class Things < Cuba
end

Things.define do
  res.headers['Content-Type'] = 'application/json; charset=utf-8'

  on root do
    on get do
      # res.write Oj.dump(Things.all, mode: :compat)
    end
  end
end
