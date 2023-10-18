import {defineStore} from 'pinia'

export const useLayoutStore = defineStore({
  id: 'layout-store',
  state: () => ({
    isLoading: false,
    isError: false
  }),
  actions: {
    toggleIsLoading: () => {
      this.isLoading = !this.isLoading
    }
  },
  getters: {
    getIsLoading: state => state.isLoading,
  },
})