import { ref } from 'vue'
import places from '../../data/place.json'
import hotels from '../../data/hotel.json'
import { Hotel } from 'components/models'

const place = ref<string | number>(0)
const placeOptions = getPlaces()
const selectedPlace = ref<{ value: number | string; city: string ; [key: string]: unknown }>({ value: 0, city: '' })

function getPlaces() {
    return places.reduce((acc, place) => ([
        ...acc,
        {
            label: `${place.name}, ${place.state.name}`,
            shortLabel: `${place.name}, ${place.state.shortname}`,
            city: place.name,
            value: place.placeId
        }
    ]), [{ label: '', shortLabel: '', city: '', value: 0 }])
}

const order = ref('Recomendados');
const orderOptions = ['Recomendados', 'Melhor avaliados']

const handleOrder = () => {
    hotelOptions.value = getHotels(place.value, 0)
}

const getHotelsFromPlace = (placeId: number | string) => {
    return hotels.reduce((acc, item) => String(item.placeId) === String(placeId) ? item.hotels : acc, {})
}

const getHotels = (placeId: number | string, init: number) => {
    const hotelItems = getHotelsFromPlace(placeId)

    const orderedHotels = Object.keys(hotelItems)
        .sort((keyA, keyB) => {
            const a = hotelItems[keyA as keyof typeof hotelItems] as Hotel
            const b = hotelItems[keyB as keyof typeof hotelItems] as Hotel
            if (order.value === 'Recomendados') return a?.price - b?.price
            else return parseFloat(b?.stars) - parseFloat(a?.stars)
        }).map((key) => hotelItems[key as keyof typeof hotelItems])
    
    return orderedHotels.slice(0, init + 10)
}

const hotelOptions = ref(getHotels(1, 0))

const updateHotelOptions = () => {
    selectedPlace.value = placeOptions.reduce((acc, p) => p.value === place.value ? p : acc, { value: 0, city: '' })
    hotelOptions.value = getHotels(place.value, 0)
}

const hasNoData = () => {
    return hotelOptions.value.length === Object.keys(getHotelsFromPlace(place.value)).length
}

const onLoad = (index: number, done: () => void) => {
    const counter = Object.keys(hotelOptions.value).length
    setTimeout(() => {
        hotelOptions.value = getHotels(place.value, counter)
        done()
    }, 2000)
}

export {
    place,
    placeOptions,
    selectedPlace,
    order,
    orderOptions,
    handleOrder,
    hotelOptions,
    updateHotelOptions,
    hasNoData,
    onLoad,
}