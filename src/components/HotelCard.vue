<template>
	<q-card class="card" flat bordered>
		<q-card-section horizontal>
			<image-carousel :images="hotel?.images" />
			<q-card-section>
				<div class="text-h6 q-mb-xs">{{ hotel?.name }}</div>
				<span class="text-caption text-grey q-mb-xs">
					{{ hotel?.address?.fullAddress }}
				</span>
				<div class="row no-wrap items-center">
					<span class="text-caption text-grey q-ml-sm">{{ hotel?.stars }}</span>
					<div v-if="hotel">
						<q-rating size="xs" :model-value="Number(hotel?.stars) || 0" :max="5" color="yellow" />
					</div>
					<q-separator vertical color="grey" class="q-mr-sm q-ml-sm" />
					<div v-for="amenity in getAmenities()" :key="amenity.key">
						<q-icon v-if="hasAmenity(amenity.key, hotel)" :name="amenity.icon" color="grey" />
					</div>
				</div>
				<q-chip v-if="hotel?.hasRefundableRoom" square color="grey" text-color="white" size="sm">
					Reembolsável
				</q-chip>
			</q-card-section>
			<q-separator vertical color="grey/80" class="q-mr-sm q-ml-sm" />
			<q-card-section>
				<div class="prices">
					<span class="text-caption text-grey">
						A partir de:
					</span>
					<span class="text-h6 q-mb-xs">
						{{ hotel?.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
					</span>
					<span class="text-caption text-grey q-mb-xs">
						{{ hotel?.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}/noite
					</span>
					<span class="text-caption text-grey q-mb-xs">
						Impostos inclusos
					</span>
					<q-btn unelevated rounded color="primary" label="Selecionar" size="sm" :loading="false" :disable="false" click="() => {}" />
				</div>
			</q-card-section>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">
	import { Hotel } from './models';
	import amenities from '../../data/amenities.json';
	import ImageCarousel from './ImageCarousel.vue'

	interface Props {
		title: string;
		hotel?: Hotel;
	};

	withDefaults(defineProps<Props>(), {
	});

	function hasAmenity(key: string, hotel?: Hotel) {
		return hotel?.amenities?.find((amenity: {key: string; label: string}) => amenity.key === key)
	}
	
	function getAmenities() {
		return amenities
	}
</script>

<style lang="scss">
	@import '../css/hotelCard.scss';
</style>