<template>
  <div>
    <div class="dayView" v-if="dayTime === morning" @click='openModal'>
      <h1>{{ day }}</h1>
      {{ $t('calendar.dayInWeek[' + this.weekDay + ']') }}
      <div class="booked" v-if="confirmed || this.getConfirmation">{{ inits }}</div>
    </div>
    <div class="dayView" v-else @click='openModal'>
      <div class="booked" v-if="confirmed || this.getConfirmation">{{ inits }}</div>
    </div>
    
    <booking v-if="showModal">
      <h3 slot="header" class="modalHeader">{{ $t('calendar.book.header') }}</h3>
      <h4 slot="slot1" class="underline">{{ day }} {{ $t('calendar.book.months[' + this.month + ']') }} {{ year }}, {{ $t('calendar.' + this.dayTime + 'Text') }}</h4>
      <span slot='slot2'>
        <button class="modalButton" @click='closeModal'>{{ $t('calendar.button.decline') }}</button>
        <button class="modalButton" @click='openModalAccepted'>{{ $t('calendar.button.accept') }}</button>
      </span>
    </booking>

    <booking v-if="showModalAccepted">
      <h3 slot="header" class="modalAccepted">{{ $t('calendar.book.headerAccepted') }}</h3>
      <h4 slot="slot1">{{ $t('calendar.book.textAccepted') }}</h4>
      <button slot="slot2" class="modalButton buttonBack" @click='closeAccepted'>{{ $t('calendar.book.goBack') }}</button>
    </booking>

    <booking v-if="showModalBooked">
      <h4 slot="header" class="modalHeader">{{ $t('calendar.bookedPeriod') }}</h4>
      <h5 slot="slot1" class="underline"> {{ fullName }} </h5>
      <button slot="slot2" class="modalButton buttonBack" @click='closeBooked'>{{ $t('calendar.book.goBack') }}</button>
    </booking>

  </div>
</template>

<script>
import Booking from './Booking.vue'
// import currentUser from '@/mocks/user'
export default {
  name: 'DayItem',
  props: [ 'currentDay', 'currentMonth', 'currentYear', 'currentWeekDay', 'currentDayTime', 'getConfirmation', 'firstName', 'lastName', 'currentUserId', 'currentUserForename', 'currentUserSurname' ],
  data () {
    return {
      day: this.currentDay,
      month: this.currentMonth,
      year: this.currentYear,
      weekDay: this.currentWeekDay,
      dayTime: this.currentDayTime,
      confirmed: false,
      dayShortcut: '',
      showModal: false,
      showModalAccepted: false,
      showModalBooked: false,
      morning: 'morning',
      afternoon: 'afternoon',
      message: '',
      getUser: {
        forename: this.firstName,
        surname: this.lastName
      },
      currentUser: {
        id: this.currentUserId,
        forename: this.currentUserForename,
        surname: this.currentUserSurname
      },
      errors: [],
      postBody: {
        date: this.fullDate,
        // ownerId: this.currentUser.id,
        startTime: '',
        endTime: '',
        modificationMessage: this.message
      }
    }
  },
  components: {
    Booking
  },
  methods: {
    setDayShortcut () {
      const index = (this.weekDay === 0) ? 6 : (this.weekDay - 1)
      this.dayShortcut = `calendar.dayInWeek[${index}]`
    },
    openModal () {
      let now = new Date()
      let checkDate = new Date(this.fullDate)
      if (this.confirmed || this.getConfirmation) {
        this.showModalBooked = true
      } else if (checkDate < now) {
        return false
      } else {
        this.showModal = true
      }
    },
    openModalAccepted () {
      this.showModalAccepted = true
      this.showModal = false
      this.confirmed = true
      this.postReservation()
    },
    openModalBooked () {
      this.showModalBooked = true
    },
    closeModal () {
      this.showModal = false
    },
    closeAccepted () {
      this.showModalAccepted = false
    },
    closeBooked () {
      this.showModalBooked = false
    },
    initials (first, last) {
      return first.slice(0, 1) + '. ' + last.slice(0, 1) + '.'
    },
    switchTime () {
      if (this.dayTime === this.morning) {
        this.postBody.startTime = '08:00'
        this.postBody.endTime = '12:00'
      } else {
        this.postBody.startTime = '16:00'
        this.postBody.endTime = '20:00'
      }
    },
    postReservation () {
      this.$http.post(this.apiUrl + '/schedule', {
        body: this.postBody
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  },
  computed: {
    fullDate () {
      let monthFull = this.month + 1
      return this.year + '-' + monthFull + '-' + this.day
      // return new Date(this.year, this.month, this.day)
    },
    inits () {
      if (this.getConfirmation) {
        return this.initials(this.getUser.forename, this.getUser.surname)
      } else {
        return this.initials(this.currentUser.forename, this.currentUser.surname)
      }
    },
    fullName () {
      if (this.getConfirmation) {
        return this.getUser.forename + ' ' + this.getUser.surname
      } else {
        return this.currentUser.forename + ' ' + this.currentUser.surname
      }
    }
  },
  created () {
    this.setDayShortcut()
    this.switchTime()
  }
}
</script>

<style scoped>
.dayView {
  width: 100%;
  height: 25em;
  border-left-style: groove;
  border-bottom-style: groove;
  text-align: right;
  display: inline-block;
  padding: 1em;
  position: relative
}
.booked {
  width: 100%;
  background-color: #ddd;
  text-align: center;
  line-height: 12.5em;
  font-size: 2em;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1
}
.modalHeader {
  margin-top: .5em
}
.underline {
  width: 90%;
  margin: 0 auto;
  line-height: 2.5em;
  border-bottom: .1em solid #000
}
h2.modalAccepted {
  margin-top: 1.5em
}
.hidden {
  display: none
}
.initials {
  text-align: center
}
.modalButton {
  width: 9em;
  font-size: 1.5em;
  float: center;
  margin: 1em;
  line-height: 2em;
  font-weight: 700;
  border: none;
  background-color: #fff;
  cursor: pointer
}
.modalButton:nth-child(2) {
  background-color: #ff6961;
  color: #fff
}
.buttonBack {
  width: 15em;
  font-size: 1.5em;
  margin-top: 2.5em;
  border: .1em solid #404040;
  color: #404040
}

</style>
