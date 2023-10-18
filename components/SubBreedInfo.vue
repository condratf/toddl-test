<script setup lang="ts">
const {
  subbreed, subBreedImageUrl, error
} = defineProps(['subbreed', 'error', 'subBreedImageUrl'])
</script>

<template>

  <div v-if="subbreed && subBreedImageUrl">
    <h1>{{ subbreed }}</h1>

    <img :src="subBreedImageUrl" loading="lazy" alt="sub-breed-image"/>

    <div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Corporis maiores omnis atque.
      </p>
    </div>

  </div>

</template>

<style scoped lang="scss">
@media (max-width: 600px) {
  img {
    width: 100%;
  }
}
</style>