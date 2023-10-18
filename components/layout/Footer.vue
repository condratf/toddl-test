<template>
  <footer class="h-[250px] p-10">

    <div class="flex flex-col gap-5">
      <nuxt-link
          class="hover:text-teal-500 text-xl"
          active-class="text-teal-500"
          to="/"
      >
        Home
      </nuxt-link>

      <nuxt-link
          class="hover:text-teal-500 text-xl"
          active-class="text-teal-500"
          to="/favorite"
      >
        Favorites
      </nuxt-link>
    </div>

  </footer>
</template>