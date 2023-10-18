<script setup>
import {useFavsStore} from "~/store/favs";
import {storeToRefs} from 'pinia';

const favsStore = useFavsStore()

const {favBreedList, favSubBreedList} = storeToRefs(favsStore)

useHead({
  title: 'Dog App / Favorites',
  meta: [
    {name: 'description', content: 'list of favorites'}
  ],
})
</script>

<template>
  <div class="min-h-[750px]">
    <Gallery v-if="favBreedList.length" :list="favBreedList.map(v => ({title: v}))"/>

    <Gallery v-if="favSubBreedList.length" :list="favSubBreedList.map(v => ({title: `${v[0]/v[1]}`}))"/>
  </div>

</template>