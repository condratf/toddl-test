export default defineEventHandler(async (event) => {
  const {breeds, subBreeds} = await readBody(event)
  if (breeds) {
    setCookie(event, 'breeds', JSON.stringify(breeds))
  }
  if (subBreeds) {
    setCookie(event, 'subBreeds', JSON.stringify(subBreeds))
  }
})