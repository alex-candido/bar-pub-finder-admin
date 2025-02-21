  json.array! @locations do |location|
    json.label location.display_name
    json.latitude location.latitude
    json.longitude location.longitude
  end
