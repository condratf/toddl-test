<script setup>
import {useLayoutStore} from "~/store/layout";
import {storeToRefs} from "pinia";

const layoutStore = useLayoutStore()
const {isLoading, isError} = storeToRefs(layoutStore)

</script>

<template>
  <LayoutHeader/>

  <SharedError v-if="isError"/>

  <SharedLoading v-if="isLoading"/>

  <div v-if="!isError" class="container-outer bg-gradient-to-b from-gray-50 to-gray-100">
    <div class="container">
      <slot/>
    </div>
  </div>

  <LayoutFooter/>
</template>

<style scoped lang="scss">

.container-outer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1200px;
  padding: 1rem;
}

</style>