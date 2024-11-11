<template>
	<q-page class="column items-center justify-evenly q-pa-xl container q-gutter-sm" >
		<FilterCard place="" :options="getPlaces()"></FilterCard>
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
				<q-breadcrumbs-el :label="`Hospedagem em ${place}`" color="grey-8" />
			</q-breadcrumbs>
			<div class="text-grey-8 text-caption row q-gutter-xs items-center">
				Organizar por
				<q-select
					:model-value="order"
					borderless
					dense
					stack-label
					class="q-py-none q-mb-xs"
					:options="orderOptions"
					dropdown-icon="keyboard_arrow_down"
				/>
			</div>
		</div>
		<HotelCard
			v-for="(hotel, index) in getHotels(1)"
			:key="index"
			title="Hotels list"
			:hotel="hotel"
		></HotelCard>
	</q-page>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
	import HotelCard from 'components/HotelCard.vue';
	import places from '../../data/place.json'
	import hotels from '../../data/hotel.json'
	import FilterCard from 'components/FilterCard.vue'

	defineOptions({
		name: 'IndexPage',
		order: '',
	});

	const place = ref('Belo Horizonte')
	const order = ref('Recomendados');
	const orderOptions = ['Recomendados', 'Melhor avaliados']

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