<template>
  <div class="container">
    <div class="row justify-content-center">
      <button @click="previousWeekDate" v-if="previousWeek" class="navigateButton"> {{ $t('schedule.button.previous') }}</button>
      {{ formatedStringWithDate }}
      <button @click="nextWeekDate" v-if="nextWeek" class="navigateButton">{{ $t('schedule.button.next') }}</button>
    </div>
    
    <div class="row justify-content-end">
      <div class="col-12 col-md-12 col-xl-12 line morningImg"></div>
    </div>
    <!-- Morning calendar-->
    <div class="row justify-content-end">
      <div class="col-11 col-md-11 col-xl-11">
        <table class="table">
          <tr>
            <td v-for="days in dateInWeekMorning" :key="days.day">
              <dayItem
                :currentDay="days.day"
                :currentMonth="days.month"
                :currentYear="days.year"
                :currentWeekDay="days.weekDay"
                :currentDayTime="days.dayTime"
                v-on:accepted="booking">
              </dayItem>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- END Morning Calendar -->

    <div class="row justify-content-end">
      <div class="col-12 col-md-12 col-xl-12 line afternoonImg"></div>
    </div>

    <!-- Afternoon calendar-->
    <div class="row justify-content-end">
      <div class="col-11 col-md-11 col-xl-11">
        <table class="table">
          <tr>
            <td v-for="days in dateInWeekAfternoon" :key="days.day">
              <dayItem
                :currentDay="days.day"
                :currentMonth="days.month"
                :currentYear="days.year"
                :currentWeekDay="days.weekDay"
                :currentDayTime="days.dayTime"
                v-on:accepted="booking">
              </dayItem>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!--END Afternoon Calendar-->
  </div>
</template>

<script>
import DayItem from './DayItem'
export default {
  name: 'Calendar2',
  data () {
    return {
      currentDate: '',
      mondayDate: '',
      sundayDate: '',
      dayInMonth: '',
      monthNumber: '',
      mondayToSundayDate: [],
      dateInWeekMorning: [],
      dateInWeekAfternoon: [],
      stringDate: '',
      previousWeek: true,
      nextWeek: true,
      loading: true,
      reservations: [],
      errors: []
    }
  },
  components: {
    DayItem
  },
  methods: {
    howMuchDayInPreviousMonth (year, month) {
      return new Date(year, month, 0).getDate()
    },
    previousWeekDate () {
      this.dateInWeekMorning.splice(0, this.dateInWeekMorning.length)
      this.dateInWeekAfternoon.splice(0, this.dateInWeekAfternoon.length)
      const previousDate = this.currentDate.getDate()
      const previousMonth = this.howMuchDayInPreviousMonth(this.currentDate.getFullYear(), this.currentDate.getMonth())
      if (previousDate <= 7) {
        let previousDay = previousMonth - (7 - previousDate)
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, previousDay)
      } else {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (previousDate - 7))
      }
      this.setMondayDate()
      if (this.nextWeek === false) {
        this.previousWeek = true
        this.nextWeek = true
      } else {
        this.previousWeek = false
      }
    },
    nextWeekDate () {
      this.dateInWeekMorning.splice(0, this.dateInWeekMorning.length)
      this.dateInWeekAfternoon.splice(0, this.dateInWeekAfternoon.length)
      const nextDate = this.currentDate.getDate() + 7
      const nowMonth = this.howMuchDayInPreviousMonth(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
      if (nextDate > nowMonth) {
        const dayInNextMonth = nextDate - nowMonth
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, dayInNextMonth)
      } else {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), nextDate)
      }
      this.setMondayDate()
      if (this.previousWeek === false) {
        this.nextWeek = true
        this.previousWeek = true
      } else {
        this.nextWeek = false
      }
    },
    setMondayDate () {
      const currentDay = (this.currentDate.getDay() === 0) ? 6 : (this.currentDate.getDay() - 1)
      const remainingDays = (this.currentDate.getDate() + (7 - this.currentDate.getDay()))
      this.dayInMonth = this.howMuchDayInPreviousMonth(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
      this.monthNumber = this.currentDate.getMonth()
      if (remainingDays > this.dayInMonth) {
        this.mondayDate = this.currentDate.getDate() - (this.currentDate.getDay() - 1)
        this.sundayDate = remainingDays - this.dayInMonth
      } else {
        if (this.currentDate.getDate() <= 7) {
          const newDate = ((this.currentDate.getDay() === 0 ? 6 : (this.currentDate.getDay() - 1)) - this.currentDate.getDate())
          if (newDate <= 0) {
            this.mondayDate = this.currentDate.getDate() - currentDay
          } else {
            this.dayInMonth = this.howMuchDayInPreviousMonth(this.currentDate.getFullYear(), this.currentDate.getMonth())
            this.mondayDate = this.dayInMonth - newDate
            this.monthNumber = this.currentDate.getMonth() - 1
          }
          this.sundayDate = this.currentDate.getDate() + (7 - (currentDay + 1))
        } else {
          this.mondayDate = this.currentDate.getDate() - currentDay
          this.sundayDate = this.mondayDate + 6
        }
      }
      this.formatMonthAndWeek()
    },
    // *****************************************************
    // Function which sets properties for every day in week
    // *****************************************************
    formatMonthAndWeek () {
      // Contains number of day which left in week after month is ended
      const remainingDays = 7 - (this.dayInMonth - this.mondayDate + 1)
      if ((this.mondayDate + 6) > this.dayInMonth) {
        // Set date and name of day in week which contains two months for example: March 27-April 02
        this.setDayAndDateInWeekWithTwoMonths(remainingDays, 'morning')
        this.setDayAndDateInWeekWithTwoMonths(remainingDays, 'afternoon')
      } else {
        // Set date and name of day in week which contains one month
        this.setDayAndDateInWeekWithOneMonth('morning')
        this.setDayAndDateInWeekWithOneMonth('afternoon')
      }
    },
    setDayAndDateInWeekWithOneMonth (periodName) {
      this.mondayToSundayDate[0] = this.mondayDate
      this.mondayToSundayDate[1] = this.mondayDate + 6
      for (let i = this.mondayToSundayDate[0]; i <= this.mondayToSundayDate[1]; i++) {
        const nowDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i)
        let day = {
          day: i < 10 ? `0${i}` : `${i}`,
          month: this.currentDate.getMonth(),
          year: this.currentDate.getFullYear(),
          weekDay: nowDate.getDay(),
          dayTime: periodName
        }
        if (periodName === 'morning') {
          this.dateInWeekMorning.push(day)
        } else {
          this.dateInWeekAfternoon.push(day)
        }
      }
    },
    setDayAndDateInWeekWithTwoMonths (remainingDays, periodName) {
      this.mondayToSundayDate[0] = this.mondayDate
      this.mondayToSundayDate[1] = remainingDays
      for (let i = this.mondayToSundayDate[0]; i <= this.dayInMonth; i++) {
        const nowDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i)
        let day = {
          day: i < 10 ? `0${i}` : `${i}`,
          month: this.currentDate.getMonth(),
          year: this.currentDate.getFullYear(),
          weekDay: nowDate.getDay(),
          dayTime: periodName
        }
        if (periodName === 'morning') {
          this.dateInWeekMorning.push(day)
        } else {
          this.dateInWeekAfternoon.push(day)
        }
      }
      for (let i = 1; i <= remainingDays; i++) {
        const nowDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, i)
        let day = {
          day: `0${i}`,
          month: this.currentDate.getMonth() + 1,
          year: (nowDate.getMonth() === 12) ? (this.currentDate.getFullYear() + 1) : this.currentDate.getFullYear(),
          weekDay: nowDate.getDay(),
          dayTime: periodName
        }
        if (periodName === 'morning') {
          this.dateInWeekMorning.push(day)
        } else {
          this.dateInWeekAfternoon.push(day)
        }
      }
    },
    booking (date, time) {
      console.log(date, time)
    },
    fetchData () {
      this.$http.get('/schedule')
      // this.$http.get(this.apiUrl + '/schedule')
      .then(response => {
        this.reservations = {...response.data}
        this.loading = false
        this.displayBooked()
      })
      .catch(error => {
        this.errors.push(error)
        this.loading = false
      })
    },
    displayBooked () {
      let res = this.reservations.reservationsTable
      for (let days of this.dateInWeekMorning) {
        let fullMonth = (days.month + 1).toString()
        if (fullMonth.length < 2) {
          fullMonth = '0' + fullMonth
        }
        let fullDate = days.year + '-' + fullMonth + '-' + days.day
        // console.log(fullDate)
        for (let reservation of res) {
          // console.log(reservation.date)
          if (reservation.date === fullDate) {
            // console.log('ok')
          }
        }
      }
    }
  },
  computed: {
    formatedStringWithDate () {
      const month = this.$t('schedule.months')
      const sunDate = this.sundayDate < 10 ? `0${this.sundayDate}` : this.sundayDate
      const monDate = this.mondayDate < 10 ? `0${this.mondayDate}` : this.mondayDate
      if (this.sundayDay < this.mondayDate) {
        this.stringDate = `${month[this.monthNumber === -1 ? 11 : this.monthNumber]} ${monDate}- ${month[(this.monthNumber + 1) === 12 ? 0 : (this.monthNumber + 1)]} ${sunDate}`
      } else {
        this.stringDate = `${month[this.monthNumber]} ${monDate}-${sunDate}`
      }
      return this.stringDate
    }
  },
  created () {
    this.fetchData()
    this.currentDate = new Date()
    this.setMondayDate()
  }
}
</script>

<style scoped>
.container {
  width: 1366px; /* CHANGE TO EM */
}
td {
  border-top: none;
  padding: 0;
}
.navigateButton {
  background: none;
  border: none;
  font-weight: bold;
}
.morningImg {
  background: url("../assets/morning.png") no-repeat;
  width: 70px; /* CHANGE TO EM */
  height: 60px; /* CHANGE TO EM */
}
.afternoonImg {
  background: url("../assets/afternoon.png") no-repeat;
  width: 70px; /* CHANGE TO EM */
  height: 70px; /* CHANGE TO EM */
}
.line {
  display: inline-block;
}
.line:before {
  content: "";
  display: block;
  border-top-style: dashed;
  margin-left: 80px; /* CHANGE TO EM */
  height: 60px; /* CHANGE TO EM */
  transform: translateY(50%);
}
</style>
