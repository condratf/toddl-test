<script setup lang="ts">
import {getBreedImage} from "~/utils";

const {title, imageUrl} = defineProps({
  title: {type: String, required: true},
  imageUrl: {type: String, required: false},
})

const imUrl = ref(imageUrl)
if (!imageUrl) {
  getBreedImage(title).then(({message, error}) => {
    if (error) {
      return
    }
    imUrl.value = message;
  })
} else {
  imUrl.value = message;
}

const isMouseOver = ref(false)
const throttledHandleMouseOver = throttle(() => {
  const intervalId = setInterval(() => {
    if (isMouseOver.value) {
      getBreedImage(title)
          .then(({message, error}) => {
            if (error) {
              return;
            }
            imUrl.value = message;
          });
    } else {
      clearInterval(intervalId);
    }
  }, 1200);
}, 1200);

const handleMouseOver = () => {
  isMouseOver.value = true
  throttledHandleMouseOver()
}

const handleMouseLeave = () => {
  isMouseOver.value = false
}

</script>

<template>
  <div
      v-if="!imUrl"
      class="animate-pulse max-w-[190px] max-h-[190px] min-w-[190px] min-h-[190px] bg-gray-200 rounded-md dark:bg-gray-700 w-48 mb-4"
  />
  <img
      v-if="imUrl"
      class="object-contain max-w-[190px] max-h-[190px] min-w-[190px] min-h-[190px]"
      :src="imUrl"
      :alt="title"
      width="170"
      height="170"
      loading="lazy"
      @mouseover="handleMouseOver"
      @mouseleave="handleMouseLeave"
  />
</template>
