<script setup lang="ts">
const {getData} = require('nuxt-storage/local-storage');
import {useFavsStore} from "~/store/favs";

const {data: {value: {list}, error}, pending} = await useFetch('/api/getAllBreeds')

const {initFavBreedList, initFavSubBreedList} = useFavsStore()

if (getData('favBreedList')) {
  initFavBreedList(getData('favBreedList'))
}
if (getData('favSubBreedList')) {
  initFavSubBreedList(getData('favSubBreedList'))
}
</script>

<template>
  <div class="min-h-[750px]">
    <SharedError v-if="error"/>
    <GallerySkeleton v-if="!error && (pending || !list || !list.length)"/>
    <Gallery v-if="list && list.length && !error" :list="list"/>
  </div>

</template>
