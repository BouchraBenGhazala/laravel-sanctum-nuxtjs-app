
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,


  auth: {
    strategies: {
      laravelSanctum: {
        // token: {
        //   property: 'token',
        //   global: true,
        //   required: true,
        //   type: 'Bearer',
        //   maxAge: 1800
        // },
        provider: 'laravel/sanctum',
        url: 'http://localhost:8000',
      },
    },
  },
  router: {
    middleware: ['auth']
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'laravel-sanctum-nuxtjs-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:'stylesheet', href:'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css'}
    ],
  },

  script:[
    {
      src:'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js',
      type:'text/javascript'
    },
    
  ],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    '@nuxtjs/axios',
    'nuxt-buefy',
    '@nuxtjs/auth-next',
  ],
  
  axios: {
    credentials: true,
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },

}
