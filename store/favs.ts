import {defineStore} from 'pinia'
import {BreedName, SubBreedName} from "~/utils/types";
import axios from "axios";


export const useFavsStore = defineStore({
  id: 'favs-store',
  state: () => ({
    favBreedList: [] as Array<BreedName>,
    favSubBreedList: [] as Array<[BreedName, SubBreedName]>
  }),
  actions: {
    initFavBreedList(list: Array<BreedName>) {
      if (!this.favBreedList.length) this.favBreedList = list
    },
    initFavSubBreedList(list: Array<[BreedName, SubBreedName]>) {
      if (!this.favSubBreedList.length) this.favSubBreedList = list
    },
    addToFavBreedList(breed: BreedName) {
      this.favBreedList.push(breed)
      axios
        .post('/api/setStorageBreeds', {breeds: this.favBreedList})
        .catch(e => console.error(e))
    },
    addToFavSubBreedList(subBreed: [BreedName, SubBreedName]) {
      this.favSubBreedList.push(subBreed)
      axios
        .post('/api/setStorageBreeds', {subBreeds: this.favSubBreedList})
        .catch(e => console.error(e))
    },
    removeFromFavBreedList(breed: BreedName) {
      const ix = this.favBreedList.findIndex(b => b === breed)
      if (ix !== -1) {
        this.favBreedList.splice(ix, 1)
        axios
          .post('/api/setStorageBreeds', {breeds: this.favBreedList})
          .catch(e => console.error(e))
      }
    },
    removeFromFavSubBreedList(subBreed: [BreedName, SubBreedName]) {
      const ix = this.favSubBreedList.findIndex(v => v.join('-') === subBreed.join('-'))
      if (ix !== -1) {
        this.favSubBreedList.splice(ix, 1)
        axios
          .post('/api/setStorageBreeds', {subBreeds: this.favSubBreedList})
          .catch(e => console.error(e))
      }
    },
  },
  getters: {
    getFavBreedList: state => state.favBreedList,
    getFavSubBreedList: state => state.favSubBreedList,
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavsStore, import.meta.hot))
}