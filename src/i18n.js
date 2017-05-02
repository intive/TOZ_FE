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
    schedule: {
      months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
      dayInWeek: ['nd', 'pn', 'wt', 'śr', 'czw', 'pt', 'sb'],
      dayNameLongList: ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'],
      morningText: 'rano',
      afternoonText: 'popołudnie',
      book: {
        months: ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sieprnia', 'września', 'października', 'listopada', 'grudnia'],
        header: 'Czy na pewno chcesz się zapisać na ten termin:',
        headerAccepted: 'Świetnie!',
        textAccepted: 'Właśnie dokonałeś rezerwacji terminu',
        goBack: 'Wróć do grafiku'
      },
      button: {
        accept: 'Potwierdzam',
        decline: 'Rezygnuję',
        next: '>>',
        previous: '<<'
      },
      bookedPeriod: 'Termin zajęty przez:'
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
    schedule: {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      dayInWeek: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      dayNameLongList: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      morningText: 'morning',
      afternoonText: 'afternoon',
      book: {
        months: ['of January', 'of February', 'of March', 'of April', 'of May', 'of June', 'of July', 'of August', 'of September', 'of October', 'of November', 'of December'],
        header: "You're about to book:",
        headerAccepted: 'Great!',
        textAccepted: "You've just made a reservation",
        goBack: 'Back to schedule'
      },
      button: {
        accept: 'Accept',
        decline: 'Cancel',
        next: '>>',
        previous: '<<'
      },
      bookedPeriod: 'Period is already booked by:'
    }
  }
}

Vue.use(VueI18n)

Vue.config.lang = 'pl'

Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})
