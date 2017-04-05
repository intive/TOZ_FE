import Vue from 'vue'
import VueI18n from 'vue-i18n'

const locales = {
  pl: {
    message: {
      hello: 'Witaj!'
    },
    navbar: {
      home: 'Strona główna',
      transferDetails: 'Dane do przelewu'
    }
  },
  en: {
    message: {
      hello: 'Hello world!'
    },
    navbar: {
      home: 'Home',
      transferDetails: 'Transfer details'
    }
  }
}

Vue.use(VueI18n)

Vue.config.lang = 'pl'
// Vue.config.lang = 'en'

Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})
