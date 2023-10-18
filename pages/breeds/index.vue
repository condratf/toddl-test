<script setup lang="ts">
const {data: {value: {list}, error}, pending} = await useFetch('/api/getAllBreeds')
</script>

<template>
  <div class="min-h-[750px]">
    <SharedError v-if="error"/>
    <GallerySkeleton v-if="!error && (pending || !list || !list.length)"/>

    <Gallery v-if="list && list.length && !error" :list="list"/>
  </div>
</template>
