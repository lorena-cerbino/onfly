<template>
  <q-carousel
    v-model="slide"
    animated
    arrows
    class="container"
    height="200px"
  >
    <q-carousel-slide
      v-for="(image, index) in images"
      :key="index"
      :name="index"
      :img-src="image"
    />
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
  .container {
    width: 250px;
    height: 100%;
  }
</style>
  