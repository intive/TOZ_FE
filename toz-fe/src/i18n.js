import Vue from 'vue'
import VueI18n from 'vue-i18n'

const locales = {
  pl: {
    message: {
      hello: 'Witaj!',
      linkExpired: 'Link aktywacyjny wygasł.',
      contactAdministrator: 'Skontaktuj się z Administratorem',
      firstLogin: 'Pierwsze logowanie',
      firstLoginInfo: 'Jeszcze tylko chwila dzieli Cię od zastania wolontariuszem.'
    },
    title: {
      transfer: 'Dane do przelewu',
      gallery: 'Galeria'
    },
    button: {
      ok: 'OK'
    },
    labels: {
      login: 'Login',
      newPassword: 'Nowe hasło',
      repeatPassword: 'Powtórz hasło'
    },
    placeholder: {
      login: 'Login',
      password: 'Hasło'
    },
    navbar: {
      home: 'Strona główna',
      transferDetails: 'Dane do przelewu',
      petsGallery: 'Galeria'
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
    },
    pets: {
      type: 'Typ',
      sex: 'Płeć',
      name: 'Imię'
    }
  },
  en: {
    message: {
      hello: 'Hello world!',
      linkExpired: 'Activation link has expired.',
      contactAdministrator: 'Please contact with the Administrator.',
      firstLogin: 'First signing in',
      firstLoginInfo: 'You are just the one moment before to become a volunteer.'
    },
    title: {
      transfer: 'Transfer data',
      gallery: 'Gallery'
    },
    button: {
      ok: 'OK'
    },
    labels: {
      login: 'Login',
      newPassword: 'New password',
      repeatPassword: 'Repeat new password'
    },
    placeholder: {
      login: 'Login',
      password: 'Password'
    },
    navbar: {
      home: 'Home',
      transferDetails: 'Transfer details',
      petsGallery: 'Gallery'
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
    },
    pets: {
      type: 'Type',
      sex: 'Sex',
      name: 'Name'
    }
  }
}

Vue.use(VueI18n)

// Vue.config.lang = 'pl'
Vue.config.lang = 'pl'

Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})
