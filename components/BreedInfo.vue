<script setup lang="ts">
import LinkButton from "~/components/shared/LinkButton.vue";

const {
  breed, breedImageUrl, subBreeds
} = defineProps(['breed', 'breedImageUrl', 'subBreeds'])

</script>

<template>

  <div class="min-h-[750px]" v-if="subBreeds && breedImageUrl">
    <h1 class="m-2 mb-10 uppercase w-full text-5xl text-center">{{ breed }}</h1>

    <div class="flex align-middle gap-10 max-[900px]:flex-col">
      <img class="object-contain" :src="breedImageUrl" loading="lazy" alt="breed-image"/>

      <div v-if="subBreeds.length" class="w-full">
        <h2 class="m-2 w-full text-2xl text-center">
          sub-breeds:
        </h2>
        <ul>
          <li v-for="val in subBreeds" :key="val">
            <LinkButton
                :to="`/breeds/${breed}/${val}`"
                :text="val"
                class="w-full"
            />
          </li>
        </ul>
      </div>
    </div>

  </div>


</template>

<style scoped lang="scss">
img {
  min-width: 50%;
  @media (max-width: 600px) {
    width: 100%;
  }
}
</style>