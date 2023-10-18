import {getAllBreeds} from "~/api";

export default defineEventHandler(async () => {
  const {message, error} = await getAllBreeds()
  if (error) {
    return ({
      list: [],
      error: error
    })
  }
  return ({
    list: Object.keys(message)
      .splice(Math.floor(Math.random() * 50), 23)
      .map(v => ({title: v})),
    error: null
  })
})