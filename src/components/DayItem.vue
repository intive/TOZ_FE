<template>
  <div>
    <div class="dayView" v-if="dayTime === 'morning'" @click='openModal'>
      <h1>{{ day }}</h1>
      {{ $t('schedule.dayInWeek[' + this.weekDay + ']') }}
      <div class="booked" v-if="confirmed">{{ userInitials }}</div>
    </div>
    <div class="dayView" v-else @click='openModal'>
      <div class="booked" v-if="confirmed">{{ userInitials }}</div>
    </div>

    <booking v-if="showModal">
      <h2 slot="header" class="modalHeader">{{ $t('schedule.book.header') }}</h2>
      <h3 slot="slot1" class="underline">{{ day }} {{ $t('schedule.book.months[' + this.month + ']') }} {{ year }}, {{ $t('schedule.' + this.dayTime + 'Text') }}</h3>
      <span slot='slot2'>
        <button class="modal-button" @click='closeModal'>{{ $t('schedule.button.decline') }}</button>
        <button class="modal-button" @click='openModalAccepted'>{{ $t('schedule.button.accept') }}</button>
      </span>
    </booking>

    <booking v-if="showModalAccepted">
      <h2 slot="header" class="modalAccepted">{{ $t('schedule.book.headerAccepted') }}</h2>
      <h4 slot="slot1">{{ $t('schedule.book.textAccepted') }}</h4>
      <button slot="slot2" class="modal-button accept-button" @click='closeAccepted'>{{ $t('schedule.book.goBack') }}</button>
    </booking>

    <booking v-if="showModalBooked">
      <h2 slot="header" class="modalHeader">{{ $t('schedule.bookedPeriod') }}</h2>
      <h3 slot="slot1" class="underline"> {{ currentUser.forename }} {{ currentUser.surname }} </h3>
      <button slot="slot2" class="modal-button accept-button" @click='closeBooked'>{{ $t('schedule.book.goBack') }}</button>
    </booking>

  </div>
</template>

<script>
import Booking from './Booking.vue'
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
      currentUser: {
        forename: 'Michał',
        surname: 'Markowski',
        id: 'c5296892-347f-4b2e-b1c6-6faff971f767'
      }
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
      let now = new Date()
      let checkDate = new Date(this.fullDate)
      if (checkDate < now) {
        return false
      } else {
        if (this.confirmed) {
          this.showModalBooked = true
        } else {
          this.showModal = true
        }
      }
    },
    openModalAccepted () {
      this.showModalAccepted = true
      this.showModal = false
      this.confirmed = true
      this.$emit('accepted', this.fullDate, this.startTime)
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
      let first = this.currentUser.forename.slice(0, 1)
      let last = this.currentUser.surname.slice(0, 1)
      return first + '. ' + last + '.'
    },
    fullDate () {
      let monthFull = this.month + 1
      return this.year + '-' + monthFull + '-' + this.day
    },
    startTime () {
      if (this.dayTime === 'morning') {
        return '08:00'
      } else {
        return '12:00'
      }
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

</style>
