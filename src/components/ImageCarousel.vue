<template>
  <q-carousel
    v-model="slide"
    animated
    infinite
    class="container"
    :height="height || '250px'"
    :style="{ width: width || '360px' }"
    ref="carousel"
  >
    <q-carousel-slide
      v-for="(image, index) in images"
      :key="index"
      :name="index"
      :img-src="image"
    />
    <template v-slot:control>
      <q-carousel-control
        v-if="images.length !== 0"
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
          size="xs"
          icon="keyboard_arrow_left"
          @click="$refs.carousel.previous()"
        />
      </q-carousel-control>
      <q-carousel-control
        v-if="images.length !== 0"
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
          size="xs"
          icon="keyboard_arrow_right"
          @click="$refs.carousel.next()"
        />
      </q-carousel-control>
      <q-carousel-control
        v-if="images.length !== 0 && showCounter"
        position="bottom"
        class="row justify-center"
      >
        <div class="q-px-sm text-caption" style="background-color: rgba(0, 0, 0, 0.6); border-radius: 10px;">{{ slide + 1 }}/{{ images.length }}</div>
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
    },
    height: {
      type: String,
      required: false
    },
    width: {
      type: String,
      required: false
    },
    showCounter: {
      type: Boolean,
      required: false
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
  