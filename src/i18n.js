import Vue from 'vue'
import VueI18n from 'vue-i18n'

const locales = {
  pl: {
    message: {
      hello: 'Witaj!'
    },
    title: {
      transfer: 'Dane do przelewu',
      gallery: 'Galeria'
    },
    button: {
      ok: 'OK',
      cancel: 'Anuluj'
    },
    placeholder: {
      login: 'Login',
      password: 'Hasło'
    },
    navbar: {
      home: 'Strona główna',
      transferDetails: 'Pomoc',
      petsGallery: 'Galeria',
      aboutUs: 'O nas',
      schedule: 'Grafik'
    },
    navigation: {
      gallery: 'Pełna galeria',
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
      name: 'Imię',
      creationDate: 'Data dodania'
    },
    account: {
      accountLink: 'Moje konto',
      oldPassword: 'Stare hasło',
      newPassword: 'Nowe hasło',
      confirmNewPassword: 'Potwierdź nowe hasło',
      changePassword: 'Zmień hasło'
    },
    help: {
      transfer: 'Wesprzyj TOZ finansowo',
      volunteer: 'Zostań wolontariuszem TOZ!',
      back: 'Powrót',
      goToForm: 'Formularz zgłoszeniowy',
      form: {
        name: 'Imię',
        surname: 'Nazwisko',
        phoneNumber: 'Numer telefonu',
        email: 'Email',
        becomeVolunteer: 'Chcę zostać wolontariuszem',
        becomeTemporaryHouse: 'Chcę zostać domem tymczasowym',
        send: 'Wyślij',
        cancel: 'Anuluj',
        sendMessage: 'Zgłoszenie zostało wysłane',
        fieldRequired: 'Pole wymagane',
        incorrectData: 'Niepoprawne dane'
      }
    }
  },
  en: {
    message: {
      hello: 'Hello world!'
    },
    title: {
      transfer: 'Transfer data',
      gallery: 'Gallery'
    },
    button: {
      ok: 'OK',
      cancel: 'Cancel'
    },
    placeholder: {
      login: 'Login',
      password: 'Password'
    },
    navbar: {
      home: 'Home',
      transferDetails: 'Help',
      petsGallery: 'Gallery',
      aboutUs: 'About us',
      schedule: 'Schedule'
    },
    navigation: {
      gallery: 'Full gallery',
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
      name: 'Name',
      creationDate: 'Creation Date'
    },
    account: {
      accountLink: 'My account',
      oldPassword: 'Old passsword',
      newPassword: 'New password',
      confirmNewPassword: 'Confirm new password',
      changePassword: 'Change password'
    },
    help: {
      transfer: 'Support ACC financally',
      volunteer: 'Become ACC volunteer',
      back: 'Back',
      goToForm: 'Application form',
      form: {
        name: 'Name',
        surname: 'Surname',
        phoneNumber: 'Phone number',
        email: 'Email',
        becomeVolunteer: 'I want to become a volunteer',
        becomeTemporaryHouse: 'I want become a temporary house',
        send: 'Sent',
        cancel: 'Cancel',
        sendMessage: 'The application has been send',
        fieldRequired: 'Field required',
        incorrectData: 'Incorrect data'
      }
    }
  }
}

Vue.use(VueI18n)

Vue.config.lang = 'pl'

Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})
