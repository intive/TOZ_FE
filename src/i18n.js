import Vue from 'vue'
import VueI18n from 'vue-i18n'

const locales = {
  pl: {
    common: {
      button: {
        ok: 'OK',
        cancel: 'Anuluj',
        signIn: 'Zaloguj się',
        help: 'Wspomóż tego zwierzaka',
        add: 'Dodaj',
        edit: 'Edytuj',
        save: 'Zapisz'
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
    companyInfo: {
      contact: 'Dane kontaktowe',
      address: {
        street: 'Ulica',
        country: '00-000 Miasto',
        tel: 'Numer telefonu 00 000-00-00'
      },
      openingHours: {
        title: 'Godziny otwarcia',
        hours: 'Poniedziałek - Piątek: 9-17'
      }
    },
    sidebar: {
      newestComments: 'Najnowsze komentarze'
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
      news: 'Aktualności:',
      added: 'Dodane: ',
      readMore: 'Czytaj więcej',
      nextNews: 'Następne wpisy'
    },
    petsCarousel: {
      fullGallery: 'Pełna galeria'
    },
    petDetails: {
      type: 'Typ',
      sex: 'Płeć',
      name: 'Imię',
      creationDate: 'Data dodania',
      info: 'potrzebuję wsparcia, aby tego dokonać skorzystaj z poniższego numeru konta'
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
        destroy: 'Usuń rezerwację',
        next: '>',
        previous: '<'
      },
      bookedPeriod: 'Termin zajęty przez:'
    },
    transfer: {
      header: 'Pomoc finansowa'
    },
    account: {
      changePassword: 'Zmień hasło'
    },
    firstSignIn: {
      message: {
        invalidEmail: 'Niepoprawny adres e-mail',
        inputRequired: 'Pole wymagane',
        differentPasswords: 'Wprowadzone hasła różnią się'
      },
      label: {
        email: 'E-mail',
        password: 'Nowe hasło',
        confirmPassword: 'Powtórz nowe hasło'
      },
      placeholder: {
        password: 'Hasło',
        email: 'E-mail'
      }
    },
    activationLinkExpired: {
      message: {
        linkExpired: 'Link aktywacyjny wygasł.',
        contactAdmin: 'Skontaktuj się z Administratorem.'
      }
    },
    accountActivated: {
      message: 'Twoje konto zostało aktywowane. Możesz się teraz zalogować.'
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
      invalidLogin: 'Niepoprawny login',
      successMessage: 'Twoje hasło zostało zresetowane. Sprawdź e-mail.'
    },
    volunteer: {
      name: 'Imię',
      surname: 'Nazwisko',
      phoneNumber: 'Numer telefonu',
      email: 'Adres email',
      target: 'Cel',
      becomeVolunteer: 'Chcę zostać wolontariuszem',
      becomeTemporaryHouse: 'Chcę zostać domem tymczasowym',
      sent: 'Wyślij',
      cancel: 'Anuluj',
      fieldRequired: 'Pole wymagane',
      incorrectData: 'Niepoprawne dane',
      submissionSent: 'Zgłoszenie zostało wysłane',
      submissionFailed: 'Zgłoszenia nie zostało wysłane!',
      home: 'Strona główna',
      help: 'Pomoc'
    },
    comments: {
      newComment: {
        placeholder: 'Miejsce na twój komentarz...',
        addComment: 'Dodaj komentarz',
        errorMessage: 'Pole komentarza nie może być puste'
      }
    }
  },
  en: {
    common: {
      button: {
        ok: 'OK',
        cancel: 'Cancel',
        signIn: 'Sign in',
        help: 'Help this pet',
        add: 'Add',
        edit: 'Edit',
        save: 'Save'
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
    rightPanel: {
      contact: 'Contact',
      address: {
        street: 'Street',
        country: '00-000 City',
        tel: 'phone number 00 000-00-00'
      },
      openingHours: {
        title: 'Opening hours',
        hours: 'Mon - Fri: 9-17'
      }
    },
    sidebar: {
      newestComments: 'Recent comments'
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
      news: 'News:',
      added: 'Added: ',
      readMore: 'Read more',
      nextNews: 'Next news'
    },
    petsCarousel: {
      fullGallery: 'Full gallery'
    },
    petDetails: {
      type: 'Type',
      sex: 'Sex',
      name: 'Name',
      creationDate: 'Creation Date',
      info: 'needs help, to do so use account number below'
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
        destroy: 'Delete reservation',
        next: '>',
        previous: '<'
      },
      bookedPeriod: 'Period is already booked by:'
    },
    transfer: {
      header: 'Financial support'
    },
    account: {
      changePassword: 'Change password'
    },
    firstSignIn: {
      message: {
        invalidEmail: 'Invalid e-mail address',
        inputRequired: 'Input required',
        differentPasswords: 'Input passwords are different'
      },
      label: {
        email: 'E-mail',
        password: 'New password',
        confirmPassword: 'Confirm new password'
      },
      placeholder: {
        password: 'Password',
        email: 'E-mail'
      }
    },
    activationLinkExpired: {
      message: {
        linkExpired: 'Activation link has expired.',
        contactAdmin: 'Please contact with the Administrator.'
      }
    },
    accountActivated: {
      message: 'Your account has been activated. You can now sign in.'
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
      invalidLogin: 'Invalid login',
      successMessage: 'Your request to reset password has been sent. Check your e-mail.'
    },
    volunteer: {
      name: 'Name',
      surname: 'Surname',
      phoneNumber: 'Phone number',
      email: 'Email address',
      target: 'Target',
      becomeVolunteer: 'I want to become a volunteer',
      becomeTemporaryHouse: 'I want become a temporary house',
      sent: 'Sent',
      cancel: 'Cancel',
      fieldRequired: 'Field required',
      incorrectData: 'Incorrect data',
      submissionSent: 'The application has been sent',
      submissionFailed: 'Applications have not been sent!',
      home: 'Home page',
      help: 'Help'
    },
    comments: {
      newComment: {
        placeholder: 'Place for your comment...',
        addComment: 'Add comment',
        errorMessage: 'Comment field cannot be empty'
      }
    }
  }
}

Vue.use(VueI18n)

Vue.config.lang = 'pl'

Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})
