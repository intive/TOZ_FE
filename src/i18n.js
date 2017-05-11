import Vue from 'vue'
import VueI18n from 'vue-i18n'

const locales = {
  pl: {
    common: {
      button: {
        ok: 'OK',
        cancel: 'Anuluj',
        signIn: 'Zaloguj się',
        help: 'Chce pomóc TOZ!'
      },
      backHome: 'Powrót do strony głównej',
      code: 'pl-PL',
      dateFormat: 'L' // other formats: l:'7.5.2017', LL:'7 maja 2017', ll:'7 maj 2017'
    },
    home: {
      header: {
        gallery: 'Galeria'
      }
    },
    navbar: {
      placeholder: {
        login: 'Login',
        password: 'Hasło'
      },
      accountLink: 'Moje konto',
      invalidLogin: 'Niepoprawny login'
    },
    nav: {
      home: 'Strona główna',
      transferDetails: 'Pomoc',
      petsGallery: 'Galeria',
      aboutUs: 'O nas',
      schedule: 'Grafik'
    },
    news: {
      added: 'Dodane: ',
      readMore: 'Czytaj więcej'
    },
    petsCarousel: {
      fullGallery: 'Pełna galeria'
    },
    petDetails: {
      type: 'Typ',
      sex: 'Płeć',
      name: 'Imię',
      creationDate: 'Data dodania'
    },
    calendar: {
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
    },
    transfer: {
      header: 'Dane do przelewu'
    },
    account: {
      changePassword: 'Zmień hasło'
    },
    firstSignIn: {
      message: {
        firstSignIn: 'Pierwsze logowanie',
        info: 'Jeszcze tylko chwila dzieli Cię od zostania wolontariuszem',
        inputRequired: 'Pole wymagane',
        differentPasswords: 'Wprowadzone hasła różnią się'
      },
      label: {
        password: 'Nowe hasło',
        confirmPassword: 'Powtórz nowe hasło'
      },
      placeholder: 'Hasło'
    },
    activationLinkExpired: {
      message: {
        linkExpired: 'Link aktywacyjny wygasł.',
        contactAdmin: 'Skontaktuj się z Administratorem.'
      }
    },
    accountPassword: {
      oldPassword: 'Stare hasło',
      newPassword: 'Nowe hasło',
      confirmNewPassword: 'Potwierdź nowe hasło',
      changePassword: 'Zmień hasło'
    }
  },
  en: {
    common: {
      button: {
        ok: 'OK',
        cancel: 'Cancel',
        signIn: 'Sign in',
        help: 'Want to help TOZ!'
      },
      backHome: 'Back to Home page',
      code: 'en-EN',
      dateFormat: 'L'
    },
    home: {
      header: {
        gallery: 'Gallery'
      }
    },
    navbar: {
      placeholder: {
        login: 'Login',
        password: 'Password'
      },
      accountLink: 'My account',
      invalidLogin: 'Invalid login'
    },
    nav: {
      home: 'Home',
      transferDetails: 'Help',
      petsGallery: 'Gallery',
      aboutUs: 'About us',
      schedule: 'Schedule'
    },
    news: {
      added: 'Added: ',
      readMore: 'Read more'
    },
    petsCarousel: {
      fullGallery: 'Full gallery'
    },
    petDetails: {
      type: 'Type',
      sex: 'Sex',
      name: 'Name',
      creationDate: 'Creation Date'
    },
    calendar: {
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
    },
    transfer: {
      header: 'Transfer data'
    },
    account: {
      changePassword: 'Change password'
    },
    firstSignIn: {
      message: {
        firstSignIn: 'First sign in',
        info: "It's just one moment to become a volunteer",
        inputRequired: 'Input required',
        differentPasswords: 'Input passwords are different'
      },
      label: {
        password: 'New password',
        confirmPassword: 'Confirm new password'
      },
      placeholder: 'Password'
    },
    activationLinkExpired: {
      message: {
        linkExpired: 'Activation link has expired.',
        contactAdmin: 'Please contact with the Administrator.'
      }
    },
    accountPassword: {
      oldPassword: 'Old password',
      newPassword: 'New password',
      confirmNewPassword: 'Confirm new password'
    }
  }
}

Vue.use(VueI18n)

Vue.config.lang = 'pl'

Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})
