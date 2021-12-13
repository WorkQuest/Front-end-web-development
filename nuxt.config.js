import localeEn from './locales/en.json';

require('dotenv').config();

export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'WorkQuest',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Decentralized marketplace for work. Where employers can look for performers for different tasks, and workers perform. Work in any field with different deadlines, interactions occur through smart contracts.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/app/favicon.svg' },
    ],
  },
  css: [
    '@/assets/scss/main.scss',
  ],
  plugins: [
    { src: '@plugins/ws', mode: 'client' },
    { src: '@plugins/axios.js' },
    { src: '@plugins/main.js' },
    { src: '@plugins/vee-validate.js' },
    { src: '@plugins/clipboard.js' },
    { src: '@plugins/injectComponents.js' },
    { src: '@plugins/vue-qrcode.js' },
  ],
  components: true,
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/color-mode',
    '@nuxtjs/moment',
  ],
  styleResources: {
    scss: ['./assets/scss/resources.scss'],
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
    'nuxt-i18n',
    'cookie-universal-nuxt',
    ['nuxt-gmaps', {
      key: process.env.GMAPKEY,
    }],
  ],
  router: {
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
  },
  build: {
    productionSourceMap: false,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css', 'svg'],
    extend(config) {
      config.node = {
        fs: 'empty',
      };
    },
    transpile: [
      'vee-validate/dist/rules',
    ],
    babel: {
      compact: false,
    },
  },
  axios: {
    baseURL: process.env.BASE_URL,
  },
  // bootstrapVue: {
  //   // bootstrapCSS: false, // Or `css: false`
  //   // bootstrapVueCSS: false, // Or `bvCSS: false`
  //   icons: true,
  // },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      messages: {
        en: localeEn,
      },
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
    },
  },
  env: {
    PROD: process.env.PROD,
    BASE_URL: process.env.BASE_URL,
    GMAPKEY: process.env.GMAPKEY,
    SECRET_SUMSUB: process.env.SECRET_SUMSUB,

    WS_NOTIFS_URL: process.env.WS_NOTIFS_URL,
    WS_CHAT_URL: process.env.WS_CHAT_URL,

    ETHEREUM_BRIDGE: process.env.ETHEREUM_BRIDGE,
    ETHEREUM_LP_TOKEN: process.env.ETHEREUM_LP_TOKEN,
    ETHEREUM_MINING: process.env.ETHEREUM_MINING,
    ETHEREUM_WQT_TOKEN: process.env.ETHEREUM_WQT_TOKEN,
    ETHEREUM_WS_INFURA: process.env.ETHEREUM_WS_INFURA,

    BSC_BRIDGE: process.env.BSC_BRIDGE,
    BSC_LP_TOKEN: process.env.BSC_LP_TOKEN,
    BSC_MINING: process.env.BSC_MINING,
    BSC_OLD_WQT_TOKEN: process.env.BSC_OLD_WQT_TOKEN,
    BSC_WQT_EXCHANGE: process.env.BSC_WQT_EXCHANGE,
    BSC_WQT_TOKEN: process.env.BSC_WQT_TOKEN,
    BSC_POOL: process.env.BSC_POOL,
    BSC_RPC_URL: process.env.BSC_RPC_URL,
    BSC_WS_MORALIS: process.env.BSC_WS_MORALIS,

    WQT_STAKING: process.env.WQT_STAKING,
    WQT_STAKING_NATIVE: process.env.WQT_STAKING_NATIVE,

    WETH_TOKEN: process.env.WETH_TOKEN,
    WBNB_TOKEN: process.env.WBNB_TOKEN,

    PENSION_FUND: process.env.PENSION_FUND,
  },
};
