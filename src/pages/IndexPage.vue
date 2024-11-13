<template>
	<q-page class="column items-center q-pa-xl container q-gutter-sm" >
		<q-drawer
			side="right"
			v-model="drawer"
			show-if-above
			bordered
			overlay
			:width="screenWidth * 0.7"
			:breakpoint="500"
			:class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
		>
			<q-scroll-area class="fit">
				<div class="bg-white q-px-md q-py-sm" style="height: 100vh;">
					<HotelDetails
						title="Hotels list"
						:hotel="selectedHotel"
						:handleHotelSelect="handleHotelSelect"
					/>
				</div>
			</q-scroll-area>
		</q-drawer>
		<FilterCard
			:place="place"
			:options="placeOptions"
			@update:place="(p) => place = p.value"
			:btnLabel="selectedPlace.value !== 0 ? 'Alterar busca' : 'Buscar'"
			:btnAction="updateHotelOptions"
		></FilterCard>
		<div style="width: 100%;" class="row justify-between items-center" v-if="selectedPlace.value !== 0">
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
				>
					<template v-slot:prepend>
						<q-item
							class="bg-grey-3"
							:style="{ color: order ? '#009EFB' : '', position: 'absolute', top: '-3px', left: '2px', zIndex: 10, fontSize: 'small', fontStyle: 'italic', fontWeight: 'bold', padding: 0, display: 'flex', alignItems: 'center', width: 'max-content' }">
							{{ order }}
							<q-icon name="keyboard_arrow_down" color="blue" size="24px" right />
						</q-item>
					</template>
				</q-select>
			</div>
			<q-infinite-scroll @load="onLoad" style="width: 100%;" :infinite-scroll-disabled="hasNoData()" class="column items-center justify-evenly q-gutter-sm">
				<HotelCard
					v-for="(hotel, index) in hotelOptions"
					:key="index"
					title="Hotels list"
					:hotel="hotel"
					:handleHotelSelect="handleHotelSelect"
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
	import { ref, nextTick, onMounted } from 'vue'
	import { Hotel } from 'components/models'
	import HotelCard from 'components/HotelCard.vue'
	import FilterCard from 'components/FilterCard.vue'
	import HotelDetails from 'components/HotelDetails.vue'

	import {
		place,
		placeOptions,
		selectedPlace,
		updateHotelOptions,
		order,
		orderOptions,
		handleOrder,
		onLoad,
		hasNoData,
		hotelOptions,
	} from '../scripts/listing'

	defineOptions({
		name: 'IndexPage',
	});

	const drawer = ref(false)
	nextTick(() => {
		drawer.value = false
	})

	const screenWidth = ref(0);

	onMounted(() => {
		screenWidth.value = window.innerWidth;
	})

	const selectedHotel = ref<Hotel>({})
	const handleHotelSelect = (hotel: Hotel) => {
		drawer.value = !drawer.value
		selectedHotel.value = hotel
	}

</script>
  
<style>
	.container {
		width: 80%;
	}
</style>