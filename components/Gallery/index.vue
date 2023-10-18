<script setup lang="ts">
const {list} = defineProps(['list'])

</script>

<template>
  <div class="max-w-[100%] flex items-center justify-center flex-wrap gap-[1rem] p-[1rem]">
    <GalleryItem
        v-for="item in list"
        :title="item.title"
    />
  </div>
</template>