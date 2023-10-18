<script setup lang="ts">
import {useFavsStore} from "~/store/favs";
import LinkButton from "~/components/shared/LinkButton.vue";

const {title, imageUrl} = defineProps({
  imageUrl: {type: String, required: false},
  title: {type: String, required: true},
})

const favStore = useFavsStore()
const {addToFavBreedList, removeFromFavBreedList} = favStore
const {favBreedList} = storeToRefs(favStore)

const toggleFavoriteClick = (title: string) =>
    !favBreedList.value.includes(title) ? addToFavBreedList(title) : removeFromFavBreedList(title)

const toggleFavText = ref(() => !favBreedList.value.includes(title) ? 'add to favorite' : 'remove from favorite')


</script>

<template>
  <div
      class="galleryItem w-[300px] h-max p-[1rem] bg-gradient-to-r from-teal-50 via-black-200 to-blue-50 flex flex-col align-middle justify-center gap-[1rem] rad"
  >
    <LazyGalleryItemImage :title="title" :imageUrl="imageUrl"/>

    <h2>{{ title }}</h2>

    <LinkButton :to="`breeds/${title}`" text="go to breed"/>

    <button class="favButton" @click="() => toggleFavoriteClick(title)">
      {{ toggleFavText() }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.galleryItem {
  align-items: center;
  border-radius: 18px;
  box-shadow: 32px -12px 47px -29px rgba(0, 0, 0, 0.16);
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