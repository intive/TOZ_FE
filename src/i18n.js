import Vue from 'vue'
import VueI18n from 'vue-i18n'

const locales = {
  pl: {
    common: {
      button: {
        ok: 'OK',
        cancel: 'Anuluj',
        signIn: 'Zaloguj się',
        help: 'Wspomóż tego zwierzaka'
      },
      label: {
        login: 'Login',
        password: 'Hasło'
      },
      backHome: 'Powrót do strony głównej',
      code: 'pl-PL',
      back: 'Powrót',
      dateFormat: 'L' // other formats: l:'7.5.2017', LL:'7 maja 2017', ll:'7 maj 2017'
    },
    help: {
      transfer: 'Wesprzyj TOZ finansowo',
      volunteer: 'Zostań wolontariuszem TOZ!'
    },
    helpInfo: {
      goToForm: 'Formularz zgłoszeniowy'
    },
    navbar: {
      accountLink: 'Moje konto',
      home: 'Strona główna',
      help: 'Pomoc',
      petsGallery: 'Galeria',
      aboutUs: 'O nas',
      schedule: 'Grafik',
      signIn: 'Zaloguj się',
      signOut: 'Wyloguj się'
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
      readMore: 'Czytaj więcej',
      addedBy: 'Dodane przez: ',
      share: 'Udostępnij to!',
      nextNews: 'Następne wpisy',
      facebook: 'Facebook',
      twitter: 'Twitter',
      google: 'Google',
      pinterest: 'Pinterest',
      rightPanel: {
        companyName: 'Towarzystwo opieki nad zwierzętami w Szczecinie',
        address: {
          street: 'ul. Ojca Beyzyma 17',
          country: '70-391 Szczecin',
          tel: 'tel/fax. 91 487-04-37'
        },
        openingHours: {
          title: 'Godziny otwarcia',
          hours: 'Poniedziałek - Piątek: 9-17'
        },
        clinic: {
          title: 'Lecznica TOZ',
          hours: 'Poniedziałek - Piątek: 8-18',
          break: 'Przerwa na zabiegi: 11-13',
          weekend: 'Sobota: 10-15'
        }
      }
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
      changePassword: 'Zmień hasło',
      errors: {
        required: 'Pole wymagane.',
        wrongPassword: 'Niepoprawne hasło.',
        differentPasswords: 'Wprowadzone hasła są różne.'
      }
    },
    login: {
      invalid: 'Niepoprawny login i/lub hasło',
      reset: 'Resetuj hasło'
    },
    resetPassword: {
      message: 'W celu zresetowania hasła podaj swój login (adres e-mail)',
      invalidLogin: 'Niepoprawny login'
    },
    volunteer: {
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
  },
  en: {
    common: {
      button: {
        ok: 'OK',
        cancel: 'Cancel',
        signIn: 'Sign in',
        help: 'Help this pet'
      },
      label: {
        login: 'Login',
        password: 'Password'
      },
      backHome: 'Back to Home page',
      code: 'en-EN',
      back: 'Back',
      dateFormat: 'L'
    },
    help: {
      transfer: 'Support ACC financally',
      volunteer: 'Become ACC volunteer'
    },
    helpInfo: {
      goToForm: 'Application form'
    },
    navbar: {
      accountLink: 'My account',
      home: 'Home',
      help: 'Help',
      petsGallery: 'Gallery',
      aboutUs: 'About us',
      schedule: 'Schedule'
    },
    nav: {
      home: 'Home',
      transferDetails: 'Help',
      petsGallery: 'Gallery',
      aboutUs: 'About us',
      schedule: 'Schedule',
      signIn: 'Sign in',
      signOut: 'Sign out'
    },
    news: {
      added: 'Added: ',
      readMore: 'Read more',
      addedBy: 'Added by: ',
      share: 'Share it!',
      nextNews: 'Next news',
      facebook: 'Facebook',
      twitter: 'Twitter',
      google: 'Google',
      pinterest: 'Pinterest',
      rightPanel: {
        companyName: 'Towarzystwo opieki nad zwierzętami w Szczecinie',
        address: {
          street: 'Ojca Beyzyma 17 St.',
          country: '70-391 Szczecin',
          tel: 'tel/fax. 91 487-04-37'
        },
        openingHours: {
          title: 'Opening hours',
          hours: 'Mon - Fri: 9-17'
        },
        clinic: {
          title: 'TOZ Clinic',
          hours: 'Mon - Fri: 8-18',
          break: 'Surgery break: 11-13',
          weekend: 'Sat: 10-15'
        }
      }
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
      confirmNewPassword: 'Confirm new password',
      errors: {
        required: 'Field required.',
        wrongPassword: 'Wrong password.',
        differentPasswords: 'Passwords are different.'
      }
    },
    login: {
      invalid: 'Invalid login and/or password',
      reset: 'Reset password'
    },
    resetPassword: {
      message: 'To reset your password, please enter your login(e-mail address)',
      invalidLogin: 'Invalid login'
    },
    volunteer: {
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

Vue.use(VueI18n)

Vue.config.lang = 'pl'

Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})
