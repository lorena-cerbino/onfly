<template>
    <div class="row no-wrap items-center q-gutter-xs">
        <div class="text-caption text-grey" style="margin-bottom: -4px;">{{ parseFloat(hotel?.stars)?.toFixed(1) }}</div>
        <div v-if="hotel">
            <q-rating size="14px" :model-value="Number(hotel?.stars) || 0" :max="5" color="yellow" style="text-shadow: none !important;" />
        </div>
    </div>
    <div class="column q-py-xs">
        <div class="text-h5 text-grey-8">{{ hotel?.name }}</div>
        <span class="text-caption text-grey q-mb-xs" style="margin-top: -6px;">
            {{ hotel?.address?.fullAddress }}
        </span>
    </div>

    <image-carousel :images="hotel?.images" width="100%" height="300px" style="border-radius: 8px;" showCounter />
    
    <div v-if="hotel?.amenities?.length > 0">
        <div class="text-h6 text-grey-8 text-weight-regular q-pt-md q-pb-sm" >Facilidades do hotel</div>
        <q-separator color="grey" />
        <div class="row items-center q-gutter-sm justify-between q-py-lg q-gutter-md" >
            <div v-for="amenity in amenitiesToShow()" :key="amenity.key">
                <div v-if="hasAmenity(amenity.key, hotel)" class="row no-wrap items-center q-gutter-xs">
                    <q-icon :name="amenity.icon" color="grey" />
                    <div class="text-body2 text-grey text-weight-light">{{ amenity?.label }}</div>
                </div>
            </div>
            <div v-if="hotel?.amenities?.length > 3" class="row justify-center" style="width: 100%;">
                <q-btn unelevated rounded outline style="color: #009EFB;" padding="sm xl"  :label="showMore ? 'Mostrar menos facilidades' : 'Mostrar todas as facilidades'" no-caps size="md" :loading="false" :disable="false" @click="handleClick" />
            </div>
        </div>
        <q-separator color="grey" />
    </div>

    <div class="q-pb-xs">
        <div class="text-h6 text-grey-8 text-weight-regular q-py-sm">Conheça um pouco mais</div>
        <div v-html="hotel.description" class="text-body2 text-grey text-weight-regular q-mb-xl" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
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

	const props = defineProps<Props>();

    const showMore = ref(false)
    const amenitiesToShow = () => {
        return showMore.value
            ? getAmenities(props.hotel)
            : getAmenities(props.hotel).slice(0, 3)
    }
    
	const handleClick = () => {
		showMore.value = !showMore.value
	}
</script>

<style lang="scss">
	@import '../css/hotelCard.scss';
    .q-rating__icon {
        text-shadow: none !important;
    }
</style>