import { Hotel } from 'components/models';
import amenities from '../../data/amenities.json';

const hasAmenity = (key: string, hotel?: Hotel) => {
    return hotel?.amenities?.find((amenity: {key: string; label: string}) => amenity.key === key)
}

const getAmenities = (hotel: Hotel) => {
    return amenities.filter(amenity =>
        hotel?.amenities?.some(hotelAmenity => hotelAmenity.key === amenity.key)
    )
}

export {
    hasAmenity,
    getAmenities,
}