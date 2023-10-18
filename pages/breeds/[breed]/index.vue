<script setup lang="ts">
import {getBreedData} from "~/api"

const route = useRoute()
const breed = route?.params?.breed || ''

const {
  breedImageUrl,
  subBreeds,
  error
} = await getBreedData(breed)

useSeoMeta({
  title: `Dog App / Breed / ${breed}`,
  ogTitle: `Dog App / Breed / ${breed}`,
  description: 'breed page',
  ogDescription: 'breed page',
  ogImage: breedImageUrl,
})

</script>

<template>
  <div class="min-h-[750px]">
    <SharedError v-if="error"/>
    <div v-if="!error && breedImageUrl">
      <BreedInfo
          :breed="breed"
          :breedImageUrl="breedImageUrl"
          :subBreeds="subBreeds"
      />
    </div>
  </div>
</template>
