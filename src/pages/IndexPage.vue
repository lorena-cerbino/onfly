<template>
	<q-page class="column items-center q-pa-xl container q-gutter-sm" >
		<FilterCard
			:place="place"
			:options="placeOptions"
			@update:place="(p) => place = p.value"
			:btnAction="updateHotelOptions"
		></FilterCard>
		<div style="width: 100%;" class="row justify-between items-center">
			<q-breadcrumbs class="text-grey-8 text-caption" style="font-size: 12px;">
				<template v-slot:separator>
					<q-icon
						size="1.5em"
						name="chevron_right"
						style="color: #009EFB;"
					/>
				</template>
				<q-breadcrumbs-el label="Início" />
				<q-breadcrumbs-el label="Hotéis" />
				<q-breadcrumbs-el :label="`Hospedagem em ${selectedPlace.city}`" color="grey-8" />
			</q-breadcrumbs>
			<div class="text-grey-8 text-caption row q-gutter-xs items-center">
				Organizar por
				<q-select
					v-model="order"
					borderless
					dense
					stack-label
					class="q-py-none q-mb-xs"
					:options="orderOptions"
					@update:model-value="handleOrder"
					dropdown-icon="keyboard_arrow_down"
					emit-value
					map-options
				/>
			</div>
			<q-infinite-scroll @load="onLoad" style="width: 100%;" :infinite-scroll-disabled="hasNoData()" class="column items-center justify-evenly q-gutter-sm">
				<HotelCard
					v-for="(hotel, index) in hotelOptions"
					:key="index"
					title="Hotels list"
					:hotel="hotel"
				></HotelCard>
				<template v-if="!hasNoData()" v-slot:loading>
					<div class="row justify-center q-my-md">
						<q-spinner-dots color="primary" size="40px" />
					</div>
				</template>
				<div v-if="hasNoData()" class="text-grey-8 text-caption q-gutter-xs items-center">
					Não há mais dados para serem mostrados.
				</div>
			</q-infinite-scroll>
		</div>
	</q-page>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
	import HotelCard from 'components/HotelCard.vue';
	import places from '../../data/place.json'
	import hotels from '../../data/hotel.json'
	import FilterCard from 'components/FilterCard.vue'
	import { Hotel } from 'components/models'

	defineOptions({
		name: 'IndexPage',
	});

	const place = ref<string | number>(1)
	const selectedPlace = ref<{ value: number | string; city: string ; [key: string]: unknown }>({ value: '', city: '' })
	
	const order = ref('Recomendados');
	const orderOptions = ['Recomendados', 'Melhor avaliados']

	function getPlaces() {
		return places.map((place) => ({
			label: `${place.name}, ${place.state.name}`,
			shortLabel: `${place.name}, ${place.state.shortname}`,
			city: place.name,
			value: place.placeId
		}))
	}

	const placeOptions = getPlaces()

	function getHotelsFromPlace (placeId: number | string) {
		return hotels.reduce((acc, item) => String(item.placeId) === String(placeId) ? item.hotels : acc, {})
	}

	function getHotels(placeId: number | string, init: number) {
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

	function onLoad (index: number, done: () => void) {
		const counter = Object.keys(hotelOptions.value).length
		setTimeout(() => {
			hotelOptions.value = getHotels(place.value, counter)
			done()
		}, 2000)
	}

	function handleOrder () {
		hotelOptions.value = getHotels(place.value, 0)
	}
	
	function hasNoData () {
		return hotelOptions.value.length === Object.keys(getHotelsFromPlace(place.value)).length
	}

</script>
  
<style>
	.container {
		width: 80%;
	}
</style>