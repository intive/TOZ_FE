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
      ok: 'OK'
    },
    placeholder: {
      login: 'Login',
      password: 'Hasło'
    },
    navbar: {
      home: 'Strona główna',
      transferDetails: 'Dane do przelewu',
      petsGallery: 'Galeria',
      schedule: 'Kalendarz',
      help: 'Chcę pomóc TOZ'
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
      name: 'Imię',
      creationDate: 'Data dodania'
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
        sendMessage: 'Zgłoszenie zostało wysłane'
      }
    },
    schedule: {
      backHome: 'Powrót do strony głównej',
      dayInWeek: ['pn', 'wt', 'śr', 'czw', 'pt', 'sb', 'nd'],
      dayNameLongList: ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'],
      months: ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sieprnia', 'września', 'października', 'listopada', 'grudnia'],
      morningText: 'rano',
      afternoonText: 'popołudnie',
      book: {
        header: 'Rezerwujesz termin:',
        headerAccepted: 'Świetnie!',
        textAccepted: 'Właśnie dokonałeś rezerwacji terminu.',
        goBack: 'WRÓĆ DO GRAFIKU'
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
      ok: 'OK'
    },
    placeholder: {
      login: 'Login',
      password: 'Password'
    },
    navbar: {
      home: 'Home',
      transferDetails: 'Transfer details',
      petsGallery: 'Gallery',
      schedule: 'Schedule',
      help: 'I want to help ACC'
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
      name: 'Name',
      creationDate: 'Creation Date'
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
        send: 'Send',
        cancel: 'Cancel',
        sendMessage: 'The application has been send'
      }
    },
    schedule: {
      backHome: 'Back to Home page',
      dayInWeek: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      dayNameLongList: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      months: ['of January', 'of February', 'of March', 'of April', 'of May', 'of June', 'of July', 'of August', 'of September', 'of October', 'of November', 'of December'],
      morningText: 'morning',
      afternoonText: 'afternoon',
      book: {
        header: "You're about to book:",
        headerAccepted: 'Great!',
        textAccepted: "You've just booked a period.",
        goBack: 'BACK TO SCHEDULE'
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
// Vue.config.lang = 'en'

Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})
