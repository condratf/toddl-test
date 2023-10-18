import {resolve} from 'path'
import {defineNuxtConfig} from 'nuxt/config'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {"@": resolve(__dirname, '/')},
  devtools: {enabled: true},
  css: ['~/assets/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/robots',
    '@pinia/nuxt',
    '@nuxtjs/robots',
  ],
  robots: {
    UserAgent: '*',
    Disallow: '/admin',
    Allow: '/'
  },
  buildModules: ['@nuxt/typescript-build'],
  app: {
    head: {
      title: 'Dog App',
      meta: [
        {
          name: 'description',
          content: 'The greatest dog app'
        }
      ]
    },
    pageTransition: {name: 'page', mode: 'out-in'}
  },
})
