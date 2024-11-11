<template>
	<q-page class="column items-center justify-evenly q-pa-xl container q-gutter-sm" >
		<FilterCard place="" :options="getPlaces()"></FilterCard>
		<HotelCard
			v-for="(hotel, index) in getHotels(1)"
			:key="index"
			title="Hotels list"
			:hotel="hotel"
		></HotelCard>
	</q-page>
</template>

<script setup lang="ts">
	import HotelCard from 'components/HotelCard.vue';
	import places from '../../data/place.json'
	import hotels from '../../data/hotel.json'
	import FilterCard from 'components/FilterCard.vue'

	defineOptions({
		name: 'IndexPage'
	});

	function getPlaces() {
		return places.map((place) => ({
			label: `${place.name}, ${place.state.shortname}`,
			value: place.placeId
		}))
	}

	function getHotels(placeId: number | string) {
		return hotels.reduce((acc, item) => String(item.placeId) === String(placeId) ? item.hotels : acc, {})
	}

</script>
  
<style>
	.container {
	}
</style>