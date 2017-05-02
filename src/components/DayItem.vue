<template>
  <div>
    <div class="dayView" v-if="dayTime === 'morning'" @click='openModal'>
      <h1>{{ day }}</h1>
      {{ $t('calendar.dayInWeek[' + this.weekDay + ']') }}
      <div class="booked" v-if="confirmed">{{ userInitials }}</div>
    </div>
    <div class="dayView" v-else @click='openModal'>
      <div class="booked" v-if="confirmed">{{ userInitials }}</div>
    </div>

    <booking v-if="showModal">
      <h2 slot="header" class="modalHeader">{{ $t('calendar.book.header') }}</h2>
      <h3 slot="slot1" class="underline">{{ day }} {{ $t('calendar.book.months[' + this.month + ']') }} {{ year }}, {{ dayTime === 'morning' ? $t('calendar.morningText') : $t('calendar.afternoonText') }}</h3>
      <span slot='slot2'>
        <button class="modal-button" @click='closeModal'>{{ $t('calendar.button.decline') }}</button>
        <button class="modal-button" @click='openModalAccepted'>{{ $t('calendar.button.accept') }}</button>
      </span>
    </booking>

    <booking v-if="showModalAccepted">
      <h2 slot="header" class="modalAccepted">{{ $t('calendar.book.headerAccepted') }}</h2>
      <h4 slot="slot1">{{ $t('calendar.book.textAccepted') }}</h4>
      <button slot="slot2" class="modal-button accept-button" @click='closeAccepted'>{{ $t('calendar.book.goBack') }}</button>
    </booking>

    <booking v-if="showModalBooked">
      <h2 slot="header" class="modalHeader">{{ $t('calendar.bookedPeriod') }}</h2>
      <h3 slot="slot1" class="underline"> {{ currentUser.forename }} {{ currentUser.surname }} </h3>
      <button slot="slot2" class="modal-button accept-button" @click='closeBooked'>{{ $t('calendar.book.goBack') }}</button>
    </booking>

  </div>
</template>

<script>
import Booking from './Booking.vue'
import currentUser from '@/mocks/user'

export default {
  name: 'DayItem',
  props: [ 'currentDay', 'currentMonth', 'currentYear', 'currentWeekDay', 'currentDayTime' ],
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
      confirmed: false,
      configs: {
        dayOfWeek: '',
        numberOfPeriods: 0,
        periods: {
          periodEnd: '',
          periodStart: ''
        }
      },
      reservations: [],
      currentUser
    }
  },
  components: {
    Booking
  },
  methods: {
    setDayShortcut () {
      const index = (this.weekDay === 0) ? 6 : (this.weekDay - 1)
      this.dayShortcut = `schedule.dayInWeek[${index}]`
    },
    openModal () {
      const today = new Date().getDate()
      const thisMonth = new Date().getMonth()
      if ((this.month === thisMonth && this.day < today) || this.month < thisMonth) {
        return
      }
      if (this.confirmed) {
        this.showModalBooked = true
      } else {
        this.showModal = true
      }
    },
    openModalAccepted () {
      this.showModalAccepted = true
      this.showModal = false
      this.confirmed = true
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
    }
  },
  computed: {
    userInitials () {
      return `${this.currentUser.forename.charAt(0)}. ${this.currentUser.surname.charAt(0)}.`
    }
  },
  created () {
    this.setDayShortcut()
  }
}
</script>

<style scoped>
.dayView {
  width: 100%;
  height: 250px;
  border-left-style: groove;
  border-bottom-style: groove;
  text-align: right;
  display: inline-block;
  padding: 10px; /* CHANGE TO EM */
  position: relative;
}
h1, h2 {
  font-weight: normal;
}
.modalHeader {
  margin-top: 30px;
}
.underline {
  width: 90%;
  margin: 0 auto;
  line-height: 50px;
  border-bottom: 3px solid #000;
}
h2.modalAccepted {
  margin-top: 50px;
}
.hidden {
  display: none
}
.initials {
  text-align: center;
}
.modal-button {
  float: center;
  margin: 20px;
  font-weight: 700;
  border: none;
  background-color: #fff;
  cursor: pointer;
}
.modal-button:nth-child(2) {
  background-color: #ff6961;
  color: #fff;
}
.accept-button {
  margin-top: 30px;
  border: 1px solid #404040;
  color: #404040;
}
.booked {
  height: 100%;
  width: 100%;
  background-color: #ddd;
  text-align: center;
  line-height: 250px;
  font-size: 25px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
