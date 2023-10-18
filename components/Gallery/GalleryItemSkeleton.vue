<script setup lang="ts">

</script>

<template>
  <div class="galleryItem animate-pulse">
    <div class="img bg-gray-200 rounded-md dark:bg-gray-700 w-48 mb-4"/>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"/>
  </div>
</template>

<style scoped lang="scss">
.galleryItem {
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 18px;
  box-shadow: 32px -12px 47px -29px rgba(0, 0, 0, 0.36);

  .img {
    width: 190px;
    height: 190px;
  }

  .h-2 {
    width: 60%;
  }
}

.favButton {
  background: #3a8484;
  padding: 0.5rem;
  border-radius: 5px;
  transition: all 0.5s;
  color: #fff;

  &:hover {
    transform: scale(1.03);
  }
}

</style>