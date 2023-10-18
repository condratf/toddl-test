import axios from "axios";
import {BASE_URL} from "~/utils/constants";
import {
  BreedImage,
  BreedName,
  BreedResponse,
  StatusVariant,
  SubBreedName,
  SubBreedsList,
  BreedList,
} from "~/utils/types";


export async function getAllBreeds() {
  try {
    const {message, status}: BreedResponse<BreedList> = await axios
      .get<BreedResponse<BreedList>>(`${BASE_URL}/breeds/list/all`)
      .then(res => res.data)
    return (status === StatusVariant.success)
      ? {message, error: null}
      : {message: null, error: status}
  } catch (error) {
    return {message: null, error}
  }
}

export async function getSubBreed(breed: BreedName) {
  try {
    const {message, status}: BreedResponse<SubBreedsList> = await axios
      .get(`${BASE_URL}/breed/${breed}/list`)
      .then(res => res.data)
    return (status === StatusVariant.success)
      ? {message, error: null}
      : {message: null, error: status}
  } catch (error) {
    console.error(error)
    return {message: null, error}
  }
}

export async function getBreedImage(breed: BreedName) {
  try {
    const {message, status}: BreedResponse<BreedImage> = await axios
      .get(`${BASE_URL}/breed/${breed}/images/random`)
      .then(res => res.data)
    return (status === StatusVariant.success)
      ? {message, error: null}
      : {message: null, error: status}
  } catch (error) {
    return {message: null, error}
  }
}

export async function getSubBreedImage(breed: BreedName, subBreed: SubBreedName) {
  try {
    const {
      message,
      status
    }: BreedResponse<BreedImage> = await axios
      .get(`${BASE_URL}/breed/${breed}/${subBreed}/images/random`)
      .then(res => res.data)
    return (status === StatusVariant.success)
      ? {message, error: null}
      : {message: null, error: status}
  } catch (error) {
    return {message: null, error}
  }
}

export async function getBreedData(breed) {
  try {
    const {message: breedImageUrl} = await getBreedImage(breed).catch(e => console.error(e))
    const {message: subBreeds} = await getSubBreed(breed).catch(e => console.error(e))
    return {error: null, breedImageUrl, subBreeds}
  } catch (error) {
    return {error, breedImageUrl: null, subBreeds: null}
  }
}

export async function getBreedListWithImages() {
  try {
    const {message, error} = await getAllBreeds()

    if (error) {
      return {list: null, error}
    }

    if (message) {
      let data = [] as Array<{ title: string, imageUrl: string }>
      for (const breed of Object.keys(message).slice(0, 15)) {
        const {message: imageUrl} = await getBreedImage(breed)
        if (message) {
          data.push({title: breed, imageUrl})
        }
      }
      return {list: data, error: null}
    }
  } catch (error) {
    console.error(error)
    return {list: null, error}
  }
}