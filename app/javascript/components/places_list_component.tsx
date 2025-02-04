import React, { ComponentProps } from 'react'

interface PlacesListProps extends ComponentProps<"div"> {}

const PlacesList: React.FC<PlacesListProps> = () => {
  return (
    <div>places_list_component</div>
  )
}

export default PlacesList