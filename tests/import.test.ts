import {mount} from '@vue/test-utils'
import {setActivePinia, createPinia} from 'pinia'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import LinkButton from '../components/shared/LinkButton.vue'
import {BreedInfo} from "../components/BreedInfo.vue"
import {useFavsStore} from "~/store/favs";
import {
  getAllBreeds,
  getSubBreed,
  getBreedImage,
  getSubBreedImage,
  getBreedData,
  getBreedListWithImages
} from '~/api/getDogsData'

describe('test app components', () => {
  test('LinkButton', async () => {
    it('renders the correct text and link', () => {
      const wrapper = mount(LinkButton, {
        props: {
          to: '/test',
          text: 'Test Button'
        }
      })
      expect(wrapper.find('nuxt-link').attributes('to')).toBe('/test')
      expect(wrapper.text()).toContain('Test Button')
    })
  })

  it('BreedInfo component - renders the correct breed, image, and sub-breeds', () => {
    const [breed, breedImageUrl, subBreeds] = ['hound', 'https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg', ['afghan']]
    const wrapper = mount(BreedInfo, {
      props: {
        breed,
        breedImageUrl,
        subBreeds
      }
    })
    expect(wrapper.find('h1').text()).toBe(breed)
    expect(wrapper.find('img').attributes('src')).toBe(breedImageUrl)
    expect(wrapper.find('LinkButton').props('to')).toBe(`/breeds/${breed}/${subBreeds[0]}`)
    expect(wrapper.find('LinkButton').props('text')).toBe(subBreeds[0])
  })

  describe('GalleryItem', () => {
    const [title, imageUrl] = ['hound', 'https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg']
    it('renders the correct title, image, and favorite button', () => {
      const wrapper = mount(GalleryItem, {
        props: {
          title,
          imageUrl,
        }
      })
      expect(wrapper.find('h2').text()).toBe(title)
      expect(wrapper.find('img').attributes('src')).toBe(imageUrl)
      expect(wrapper.find('button').text()).toBe('add to favorite')
    })

    it('changes favorite button text when clicked', async () => {
      const wrapper = mount(GalleryItem, {
        props: {
          title,
          imageUrl,
        },
        global: {
          mocks: {
            favBreedList: {
              value: [title]
            }
          }
        }
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').text()).toBe('remove from favorite')
    })
  })
})

describe('test favsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with correct state', () => {
    const store = useFavsStore()
    expect(store.favBreedList).toEqual([])
    expect(store.favSubBreedList).toEqual([])
  })

  it('adds and removes from favBreedList correctly', () => {
    const store = useFavsStore()
    store.addToFavBreedList('Test Breed')
    expect(store.favBreedList).toContain('Test Breed')
    store.removeFromFavBreedList('Test Breed')
    expect(store.favBreedList).not.toContain('Test Breed')
  })

  it('adds and removes from favSubBreedList correctly', () => {
    const store = useFavsStore()
    const subBreed = ['Test Breed', 'Test Sub-Breed']
    store.addToFavSubBreedList(subBreed)
    expect(store.favSubBreedList).toContainEqual(subBreed)
    store.removeFromFavSubBreedList(subBreed)
    expect(store.favSubBreedList).not.toContainEqual(subBreed)
  })
})

const mock = new MockAdapter(axios)

describe('API functions', () => {
  afterEach(() => {
    mock.reset()
  })

  it('gets all breeds', async () => {
    const data = {message: ['Test Breed'], status: 'success'}
    mock.onGet(`${BASE_URL}/breeds/list/all`).reply(200, data)
    const response = await getAllBreeds()
    expect(response).toEqual({message: data.message, error: null})
  })

  it('gets sub-breeds', async () => {
    const data = {message: ['Test Sub-Breed'], status: 'success'}
    mock.onGet(`${BASE_URL}/breed/Test Breed/list`).reply(200, data)
    const response = await getSubBreed('Test Breed')
    expect(response).toEqual({message: data.message, error: null})
  })

  it('gets breed image', async () => {
    const data = {message: '/test-image.jpg', status: 'success'}
    mock.onGet(`${BASE_URL}/breed/Test Breed/images/random`).reply(200, data)
    const response = await getBreedImage('Test Breed')
    expect(response).toEqual({message: data.message, error: null})
  })

  it('gets sub-breed image', async () => {
    const data = {message: '/test-image.jpg', status: 'success'}
    mock.onGet(`${BASE_URL}/breed/Test Breed/Test Sub-Breed/images/random`).reply(200, data)
    const response = await getSubBreedImage('Test Breed', 'Test Sub-Breed')
    expect(response).toEqual({message: data.message, error: null})
  })

  it('gets breed data', async () => {
    const breedImageUrl = {message: '/test-image.jpg', status: 'success'}
    const subBreeds = {message: ['Test Sub-Breed'], status: 'success'}
    mock.onGet(`${BASE_URL}/breed/Test Breed/images/random`).reply(200, breedImageUrl)
    mock.onGet(`${BASE_URL}/breed/Test Breed/list`).reply(200, subBreeds)
    const response = await getBreedData('Test Breed')
    expect(response).toEqual({error: null, breedImageUrl: breedImageUrl.message, subBreeds: subBreeds.message})
  })

  it('gets breed list with images', async () => {
    const allBreeds = {message: ['Test Breed'], status: 'success'}
    const breedImageUrl = {message: '/test-image.jpg', status: 'success'}
    mock.onGet(`${BASE_URL}/breeds/list/all`).reply(200, allBreeds)
    mock.onGet(`${BASE_URL}/breed/Test Breed/images/random`).reply(200, breedImageUrl)
    const response = await getBreedListWithImages()
    expect(response).toEqual({list: [{title: 'Test Breed', imageUrl: breedImageUrl.message}], error: null})
  })
})