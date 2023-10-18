<script setup lang="ts">
import {useAsyncData} from "#app"
import {getSubBreedImage} from "~/utils"

const route = useRoute()
const subbreed = route?.params?.subbreed || ''
const breed = route?.params?.breed || ''

const {
  data: {
    value: {
      error,
      message: subBreedImageUrl,
    }
  }
} = await useAsyncData('getBreedData', async () => getSubBreedImage(breed, subbreed),)

useSeoMeta({
  title: `Dog App / Breed / ${breed} / ${subbreed}`,
  ogTitle: `Dog App / Breed / ${breed} / ${subbreed}`,
  description: 'subbreed page',
  ogDescription: 'subbreed page',
  ogImage: subBreedImageUrl,
})

</script>

<template>
  <div v-if="!error">
    <BreedInfo
        :breedImageUrl="subBreedImageUrl"
        :breed="`${breed}/${subbreed}`"
        :subBreeds="[]"
    />
  </div>

</template>
