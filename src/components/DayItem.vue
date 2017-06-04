<template>
  <div>
    <h6 class="dayNumber">{{ day }}</h6>
    <div class="dayView" v-if="dayTime === morning" @click='openModal'>
      <div v-if="confirmed" class="booked">{{ inits }}</div>
      <div v-if="loading" class="loader"></div>
    </div>
    <div class="dayView" v-else @click='openModal'>
      <div v-if="confirmed" class="booked">{{ inits }}</div>
      <div v-if="loading" class="loader"></div>
    </div>
    <booking v-if="showModal">
      <h4 slot="header" class="modalHeader">{{ $t('calendar.book.header') }}</h4>
      <h6 slot="slot1" class="underline">{{ day }} {{ $t('calendar.book.months[' + month + ']') }} {{ year }}, {{ $t('calendar.' + dayTime + 'Text') }}</h6>
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
      <h5 slot="header" class="modalHeader">{{ $t('calendar.bookedPeriod') }}</h5>
      <h6 slot="slot1" class="underline"> {{ fullName }} </h6>
      <span slot="slot2">
        <button class="modalButton" @click='closeBooked'>{{ $t('calendar.book.goBack') }}</button>
        <button class="modalButton" v-if="reservationOwner" @click="deleteReservation">{{ $t('calendar.button.destroy') }}</button>
      </span>
    </booking>
    <booking v-if="showErrors">
      <h2 slot="header" v-for="error of errors">{{ error.message }}</h2>
      <button slot="slot1" class="modalButton buttonBack" @click='closeErrors'>{{ $t('calendar.book.goBack') }}</button>
    </booking>
  </div>
</template>

<script>
import Booking from './Booking.vue'
export default {
  name: 'DayItem',
  props: [ 'currentDay', 'currentMonth', 'currentYear', 'currentWeekDay', 'currentDayTime', 'getConfirmation', 'firstName', 'lastName', 'getUserId', 'getResId' ],
  data () {
    return {
      day: this.currentDay,
      month: this.currentMonth,
      year: this.currentYear,
      weekDay: this.currentWeekDay,
      dayTime: this.currentDayTime,
      dayShortcut: '',
      showModal: false,
      showModalAccepted: false,
      showModalBooked: false,
      morning: 'morning',
      afternoon: 'afternoon',
      periodStartTime: '',
      periodEndTime: '',
      confirmed: this.getConfirmation,
      reservationOwner: false,
      getUsers: {
        forename: this.firstName,
        surname: this.lastName
      },
      currentUser: {
        forename: sessionStorage.getItem('name'),
        surname: sessionStorage.getItem('surname')
      },
      loading: false,
      showErrors: false,
      errors: [],
      postBody: {
        date: '',
        ownerId: sessionStorage.getItem('userId'),
        startTime: '',
        endTime: '',
        modificationMessage: 'string'
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
      const checkDate = new Date(this.fullDate + ' ' + this.periodStartTime).getTime()
      const now = new Date().getTime()
      if (this.confirmed) {
        this.openModalBooked()
      } else if (checkDate < now) {
        return false
      } else {
        this.showModal = true
      }
    },
    openModalAccepted () {
      this.showModal = false
      this.postReservation()
    },
    openModalBooked () {
      this.showModal = false
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
    closeErrors () {
      this.showErrors = false
    },
    checkUser () {
      if (this.getUserId === sessionStorage.getItem('userId')) {
        this.reservationOwner = true
      }
    },
    deleteReservation () {
      const id = this.getResId
      this.showModalBooked = false
      this.loading = true
      this.$http.delete(this.apiUrl + 'schedule/' + id)
      .then(this.deleteRes())
      .catch(e => {
        this.errors.push(e)
        this.loading = false
      })
    },
    deleteRes () {
      this.confirmed = false
      this.loading = false
    },
    switchTime () {
      if (this.dayTime === this.morning) {
        this.periodStartTime = '08:00'
        this.periodEndTime = '12:00'
      } else {
        this.periodStartTime = '12:00'
        this.periodEndTime = '16:00'
      }
    },
    createPostBody () {
      this.postBody.date = this.fullDate
      this.postBody.startTime = this.periodStartTime
      this.postBody.endTime = this.periodEndTime
    },
    postReservation () {
      this.createPostBody()
      this.$http.post(this.apiUrl + 'schedule', this.postBody)
      .catch(e => {
        this.errors.push(e)
        this.loading = false
      })
      .then(response => {
        if (this.errors.length) {
          this.showErrors = true
        } else {
          this.confirmed = true
          this.$emit('fetch')
        }
      })
    }
  },
  computed: {
    inits () {
      return this.getUsers.forename.slice(0, 1) + '. ' + this.getUsers.surname.slice(0, 1) + '.'
    },
    fullName () {
      return this.getUsers.forename + ' ' + this.getUsers.surname
    },
    fullDate () {
      let fullDay = this.day.toString()
      let fullMonth = (this.month + 1).toString()
      if (fullDay.length < 2) {
        fullDay = '0' + fullDay
      }
      if (fullMonth.length < 2) {
        fullMonth = '0' + fullMonth
      }
      return this.year + '-' + fullMonth + '-' + fullDay
    }
  },
  created () {
    this.switchTime()
    this.setDayShortcut()
    this.checkUser()
    // this.catchReservation()
  }
}
</script>

<style lang="sass" scoped>

.dayView
  width: 6em
  margin-top: 6em
  height: 6em
  background-color: #ebebeb
  text-align: right
  display: inline-block
  padding: 1em
  position: relative
  border-radius: .5em
  cursor: pointer

.dayNumber
  margin: 0 auto
  width: 2.5em
  text-align: right

.booked, .loader
  width: 100%
  text-align: center
  line-height: 3em
  position: absolute

.booked
  background-color: #999
  top: 0
  left: 0
  font-size: 2em
  border-radius: .25em

.owner
  background-color: #ff8900

.loader
  width: 8%
  height: 5%
  left: 50%
  top: 10%

.modalHeader
  margin-top: .5em

.underline
  width: 90%
  margin: 0 auto
  line-height: 2.5em
  border-bottom: .1em solid #000

h2.modalAccepted
  margin-top: 1.5em

.hidden
  display: none

.initials
  text-align: center

.modalButton
  width: 9em
  font-size: 1.5em
  float: center
  margin: 1em
  line-height: 2em
  font-weight: 700
  border: none
  background-color: #fff
  cursor: pointer
  &:nth-child(2)
    background-color: #ff6961
    color: #fff

.buttonBack
  width: 15em
  font-size: 1.5em
  margin-top: 2.5em
  border: .1em solid #404040
  color: #404040

</style>
