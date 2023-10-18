<script setup lang="ts">

</script>

<template>
  <div class="gallery">
    <GalleryItemSkeleton v-for="item in 18"/>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}
</style>