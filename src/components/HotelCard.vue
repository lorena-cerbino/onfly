<template>
	<q-card class="card" flat bordered>
		<q-card-section horizontal>
			<image-carousel :images="hotel?.images" />
			<q-card-section style="width: 42%;" class="q-gutter-sm">
				<div class="text-h6 q-mb-xs text-grey-8">{{ hotel?.name }}</div>
				<span class="text-body2 text-grey q-mb-xs">
					{{ hotel?.address?.fullAddress }}
				</span>
				<div class="row no-wrap items-center q-gutter-xs">
					<div class="text-caption text-grey" style="margin-bottom: -2px;">{{ parseFloat(hotel?.stars || '0')?.toFixed(1) }}</div>
					<div v-if="hotel">
						<q-rating size="12px" :model-value="Number(hotel?.stars) || 0" :max="5" color="yellow" />
					</div>
					<q-separator vertical color="grey" class="q-mr-sm q-ml-sm" />
					<div v-for="amenity in getAmenities(hotel)" :key="amenity.key">
						<q-icon v-if="hasAmenity(amenity.key, hotel)" :name="amenity.icon" color="grey" />
					</div>
				</div>
				<q-chip v-if="hotel?.hasRefundableRoom" square color="grey" text-color="white" size="md">
					Reembolsável
				</q-chip>
			</q-card-section>
			<q-separator vertical color="grey-3" class="q-mr-sm q-ml-sm" />
			<q-card-section>
				<div class="prices">
					<span class="text-caption text-grey">
						A partir de:
					</span>
					<span class="text-h5 q-mb-xs text-grey-8">
						{{ hotel?.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
					</span>
					<span class="text-caption text-grey q-mb-xs">
						{{ hotel?.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}/noite
					</span>
					<span class="text-caption text-grey q-mb-xs">
						Impostos inclusos
					</span>
					<q-btn unelevated rounded style="background-color: #009EFB; color: white;" padding="sm xl"  class="q-mt-xl" label="Selecionar" size="md" :loading="false" :disable="false" @click="handleClick" />
				</div>
			</q-card-section>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">
	import { Hotel } from './models';
	import ImageCarousel from './ImageCarousel.vue'

	import {
		hasAmenity,
		getAmenities,
	} from '../scripts/hotel'

	interface Props {
		title: string;
		hotel: Hotel;
		handleHotelSelect: (hotel: Hotel) => void
	};

	const props = defineProps<Props>()

	const handleClick = () => {
    	props.handleHotelSelect(props.hotel)
	}
</script>

<style lang="scss">
	@import '../css/hotelCard.scss';
</style>