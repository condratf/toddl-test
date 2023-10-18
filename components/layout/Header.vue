<script setup>
</script>

<template>
  <nav class="w-full flex align-middle justify-center gap-10 p-5">
    <nuxt-link
        class="hover:text-teal-500 text-3xl"
        active-class="text-teal-700"
        to="/"
    >
      Home
    </nuxt-link>

    <nuxt-link
        class="hover:text-teal-500 text-3xl"
        active-class="text-teal-700"
        to="/favorite"
    >
      Favorites
    </nuxt-link>
  </nav>
</template>
