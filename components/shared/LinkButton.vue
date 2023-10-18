<script setup>
const {to, text} = defineProps(['to', 'text'])
</script>

<template>
  <button
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-1">
    <nuxt-link :to="to">
      {{ text }}
    </nuxt-link>
  </button>
</template>
