<script setup lang="ts">
import {useFavsStore} from "~/store/favs";

const {data: {value: {list}, error}, pending} = await useFetch('/api/getAllBreeds')
const {initFavBreedList, initFavSubBreedList} = useFavsStore()

const favBreedList = useCookie('breeds')
const favSubBreedList = useCookie('subBreeds')

if (favBreedList.value) {
  initFavBreedList((favBreedList.value))
}
if (favSubBreedList.value) {
  initFavSubBreedList((favSubBreedList.value))
}

</script>

<template>
  <div class="min-h-[750px]">
    <SharedError v-if="error"/>
    <GallerySkeleton v-if="!error && (pending || !list || !list.length)"/>
    <Gallery v-if="list && list.length && !error" :list="list"/>
  </div>

</template>
