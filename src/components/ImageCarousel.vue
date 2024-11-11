<template>
  <q-carousel
    v-model="slide"
    animated
    class="container"
    height="250px"
    style="max-width: 360px;"
  >
    <q-carousel-slide
      v-for="(image, index) in images"
      :key="index"
      :name="index"
      :img-src="image"
    />
    <template v-slot:control>
        <q-carousel-control
          position="left"
          class="carousel-left"
          style="margin-left: 8px;"
        >
          <q-btn
            unelevated
            round
            dense
            color="white"
            text-color="grey-8"
            size="sm"
            icon="arrow_left"
            @click="$refs.carousel.previous()"
          />
        </q-carousel-control>
        <q-carousel-control
          position="right"
          class="carousel-right"
          style="margin-right: 8px;"
        >
          <q-btn
            unelevated
            round
            dense
            color="white"
            text-color="grey-8"
            size="sm"
            icon="arrow_right"
            @click="$refs.carousel.next()"
          />
        </q-carousel-control>
      </template>
  </q-carousel>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      navigation: ref(false),
      slide: ref(0),
    }
  },
  props: {
    images: {
      type: Array,
      required: false,
    }
  }
}
</script>

<style>
  .carousel-left,
  .carousel-right {
    top: 55%;
    transform: translateY(-50%);
  }
</style>
  