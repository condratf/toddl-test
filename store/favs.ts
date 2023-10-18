import {defineStore} from 'pinia'
import {BreedName, SubBreedName} from "~/utils/types";

const {setData} = require('nuxt-storage/local-storage');

export const useFavsStore = defineStore({
  id: 'favs-store',
  state: () => ({
    favBreedList: [] as Array<BreedName>,
    favSubBreedList: [] as Array<[BreedName, SubBreedName]>
  }),
  actions: {
    initFavBreedList(list: Array<BreedName>) {
      this.favBreedList = list
    },
    initFavSubBreedList(list: Array<[BreedName, SubBreedName]>) {
      this.favSubBreedList = list
    },
    addToFavBreedList(breed: BreedName) {
      this.favBreedList.push(breed)
      setData('favBreedList', this.favBreedList)
    },
    addToFavSubBreedList(subBreed: [BreedName, SubBreedName]) {
      this.favSubBreedList.push(subBreed)
      setData('favBreedList', this.favSubBreedList)
    },
    removeFromFavBreedList(breed: BreedName) {
      const ix = this.favBreedList.findIndex(b => b === breed)
      if (ix !== -1) {
        this.favBreedList.splice(ix, 1)
        setData('favBreedList', this.favBreedList)
      }
    },
    removeFromFavSubBreedList(subBreed: [BreedName, SubBreedName]) {
      const ix = this.favSubBreedList.findIndex(v => v.join('-') === subBreed.join('-'))
      if (ix !== -1) {
        this.favSubBreedList.splice(ix, 1)
        setData('favBreedList', this.favSubBreedList)
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