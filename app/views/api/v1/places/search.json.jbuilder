json.set! :position do
  if @location.present?
    json.latitude @location.latitude
    json.longitude @location.longitude
  else
    json.null!
  end
end

json.set! :places do
  json.array! @places do |place|
    json.id place.id
    json.name place.name
    json.description place.description
    json.type place.type
    json.status place.status
    json.latitude place.latitude
    json.longitude place.longitude
    json.created_at place.created_at
    json.updated_at place.updated_at
    json.info place.info
    json.is_filtered true
  end
end
