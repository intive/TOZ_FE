import Vue from 'vue'
import VueI18n from 'vue-i18n'

const locales = {
  pl: {
    message: {
      hello: 'Witaj!'
    },
    title: {
      transfer: 'Dane do przelewu'
    },
    button: {
      ok: 'OK'
    },
    placeholder: {
      login: 'Login',
      password: 'Hasło'
    },
    navbar: {
      home: 'Strona główna',
      transferDetails: 'Dane do przelewu'
    },
    navigation: {
      back: {
        home: 'Powrót do strony głównej'
      }
    },
    img: {
      alt: {
        dog: 'zdjęcie_psa'
      }
    }
  },
  en: {
    message: {
      hello: 'Hello world!'
    },
    title: {
      transfer: 'Transfer data'
    },
    button: {
      ok: 'OK'
    },
    placeholder: {
      login: 'Login',
      password: 'Password'
    },
    navbar: {
      home: 'Home',
      transferDetails: 'Transfer details'
    },
    navigation: {
      back: {
        home: 'Back to Home page'
      }
    },
    img: {
      alt: {
        dog: 'dog_image'
      }
    }
  }
}

Vue.use(VueI18n)

// Vue.config.lang = 'pl'
Vue.config.lang = 'en'

Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})
