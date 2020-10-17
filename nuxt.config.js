const fetch = require('node-fetch')
export default {
  mode: 'spa',
  // server: {
  //   port: 3000, // default: 3000
  //   host: '0.0.0.0' // default: localhost
  // },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#db0446',
    size: '10',
  },
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'db0446'
  },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    '@nuxtjs/proxy'

  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://127.0.0.1:8000',
    proxy: false
  },

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000/api',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },

  toast: {
    position: 'top-right',
    duration: 2000
  },


  auth: {
    localStorage: true,
    cookie: {
      options: {
        expires: 7
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/login',
      home: '/'
    },

    strategies: {
      // https://dev.to/mandeepm91/how-to-add-authentication-to-your-universal-nuxt-app-using-nuxt-auth-module-3ffm
      local: {
        scheme: 'refresh',
        token: {
          property: 'access',
          maxAge: 60 * 60 * 24 * 30 * 60 * 60,
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24 * 30 * 60 * 60
        },
        user: {
          property: '',
          autoFetch: true
        },
        endpoints: {
          login: {url: '/api/v1/auth/token/', method: 'post', propertyName: 'access'},
          logout: {url: '/auth/logout/', method: 'post'},
          user: {url: '/api/v1/me/', method: 'get', propertyName: false},
          refresh: {url: '/auth/token/refresh/', method: 'post'},
          registerit: {url: '/rest-auth/registration/', method: 'post'},
        },
      }
    }
  },


  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {


    }
  },

}
