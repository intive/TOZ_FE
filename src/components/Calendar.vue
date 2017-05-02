<template>
  <div class="container">
    <div class="row justify-content-center">
      <button @click="setPreviousAndNextWeekDate(false)" v-if="previousWeek" class="navigateButton"> {{ $t('schedule.button.previous') }}</button>
      {{ formatedStringWithDate }}
      <button @click="setPreviousAndNextWeekDate(true)" v-if="nextWeek" class="navigateButton">{{ $t('schedule.button.next') }}</button>
    </div>

    <div class="row justify-content-end">
      <div class="col-12 col-md-12 col-xl-12 line morningImg"></div>
    </div>
    <!-- Morning calendar-->
    <div v-if="loading" class="loader"></div>
    <div v-else class="row justify-content-end">
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
                :getConfirmation="days.booked"
                :firstName="days.forename"
                :lastName="days.surname">
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
    <div v-if="loading" class="loader"></div>
    <div v-else class="row justify-content-end">
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
                :getConfirmation="days.booked"
                :firstName="days.forename"
                :lastName="days.surname">
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
      reservations: {},
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
    // Function set date that will be in 7 days or what was 7 day ago
    // nextWeekTrue is true when we click '>>'. False when we click '<<'
    setPreviousAndNextWeekDate (nextWeekTrue) {
      // Contains number of days in current month
      const nowMonth = this.howMuchDayInPreviousMonth(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
      // Contains number of days in previous month
      const previousMonth = this.howMuchDayInPreviousMonth(this.currentDate.getFullYear(), this.currentDate.getMonth())
      let newDate = this.currentDate.getDate()
      // If we displayed next week we add to newDate 7
      nextWeekTrue ? newDate += 7 : newDate
      this.dateInWeekMorning.splice(0, this.dateInWeekMorning.length)
      this.dateInWeekAfternoon.splice(0, this.dateInWeekAfternoon.length)
      this.setDate(nextWeekTrue, newDate, nowMonth, previousMonth)
      this.setMondayDate()
      this.displayWeekChangeButton(nextWeekTrue)
      this.fetchData()
    },
    setDate (isNextWeekTrue, indexOfDayInMonth, currentMonthLength, previousMonthLength) {
      const dayInNextMonth = indexOfDayInMonth - currentMonthLength
      if (isNextWeekTrue) {
        // If week contains in two months
        if (indexOfDayInMonth > currentMonthLength) {
          this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, dayInNextMonth)
        } else {
          this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), indexOfDayInMonth)
        }
      } else {
        // If week contains in single month
        if (indexOfDayInMonth <= 7) {
          let previousDay = previousMonthLength - (7 - indexOfDayInMonth)
          this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, previousDay)
        } else {
          this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (indexOfDayInMonth - 7))
        }
      }
    },
    displayWeekChangeButton (isNextWeekTrue) {
      let condition = true
      // condition value depend of isNextWeekTrue
      isNextWeekTrue ? condition = !this.previousWeek : condition = !this.nextWeek
      if (condition) {
        this.previousWeek = true
        this.nextWeek = true
      } else {
        if (isNextWeekTrue) {
          this.nextWeek = false
        } else {
          this.previousWeek = false
        }
      }
    },
    numbersOfDaysToAdd () {
      // This function return value, which we add to remainingDays variable in function setMondayDate()
      this.dayInMonth = this.howMuchDayInPreviousMonth(this.currentDate.getFullYear(), this.currentDate.getMonth())
      let daysToAdd = 0
      // If today is last sunday in month, function return 0
      if ((this.currentDate.getDay() === 0) && ((this.currentDate.getDate() + 7) > this.dayInMonth)) {
        daysToAdd = 0
      } else {
        daysToAdd = 7 - this.currentDate.getDay()
      }
      return daysToAdd
    },
    setMondayDate () {
      // currentDay is equal number of day in week
      const currentDay = (this.currentDate.getDay() === 0) ? 6 : (this.currentDate.getDay() - 1)
      // Defines how much days should be add to remainingDays variable
      const daysToAdd = this.numbersOfDaysToAdd()
      // Value of this variable select whether the week is in one month, or in two months
      const remainingDays = this.currentDate.getDate() + daysToAdd
      this.dayInMonth = this.howMuchDayInPreviousMonth(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
      this.monthNumber = this.currentDate.getMonth()
      if (remainingDays > this.dayInMonth) {
        this.mondayDate = this.currentDate.getDate() - (this.currentDate.getDay() - 1)
        this.sundayDate = remainingDays - this.dayInMonth
      } else {
        this.setMondayDateWhenWeekIsInOneMonth(currentDay)
      }
      this.formatMonthAndWeek()
    },
    setMondayDateWhenWeekIsInOneMonth (nrOfDayInWeek) {
      const newDate = ((this.currentDate.getDay() === 0 ? 6 : (this.currentDate.getDay() - 1)) - this.currentDate.getDate())
      if (this.currentDate.getDate() <= 7) {
        if (newDate <= 0) {
          this.mondayDate = this.currentDate.getDate() - nrOfDayInWeek
        } else {
          this.dayInMonth = this.howMuchDayInPreviousMonth(this.currentDate.getFullYear(), this.currentDate.getMonth())
          this.mondayDate = this.dayInMonth - newDate
          this.monthNumber = this.currentDate.getMonth() - 1
        }
        this.sundayDate = this.currentDate.getDate() + (7 - (nrOfDayInWeek + 1))
      } else {
        this.mondayDate = this.currentDate.getDate() - nrOfDayInWeek
        this.sundayDate = this.mondayDate + 6
      }
    },
    // .
    // Function which sets properties for every day in week
    // .
    formatMonthAndWeek () {
      // Contains number of day which left in week after month is ended
      const remainingDays = 7 - (this.dayInMonth - this.mondayDate + 1)
      if ((this.mondayDate + 6) > this.dayInMonth) {
        // Set date and name of day in week which contains two months for example: March 27-April 02
        this.setDayAndDateInWeekWithTwoMonths(remainingDays, true)
        this.setDayAndDateInWeekWithTwoMonths(remainingDays, false)
      } else {
        // Set date and name of day in week which contains one month
        this.setDayAndDateInWeekWithOneMonth(true)
        this.setDayAndDateInWeekWithOneMonth(false)
      }
    },
    loopCreateWeekDays (periodName, startValue, endValue, currentMonth) {
      // This function create day object and insert it to dateInWeekMorning and dateInWeekAfternoon table
      for (let i = startValue; i <= endValue; i++) {
        const nowDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - currentMonth, i)
        let day = {
          day: i < 10 ? `0${i}` : `${i}`,
          month: this.currentDate.getMonth(),
          year: (nowDate.getMonth() === 12) ? (this.currentDate.getFullYear() + 1) : this.currentDate.getFullYear(),
          weekDay: nowDate.getDay(),
          dayTime: periodName ? 'morning' : 'afternoon',
          booked: false,
          forename: '',
          surname: ''
        }
        if (periodName) {
          this.dateInWeekMorning.push(day)
        } else {
          this.dateInWeekAfternoon.push(day)
        }
      }
    },
    setDayAndDateInWeekWithOneMonth (periodName) {
      /* In this function create table with object for week in single month, for example:
       monday date is 1st May and sunday date is 7th May */
      const startVal = this.mondayDate
      const endVal = this.mondayDate + 6
      this.loopCreateWeekDays(periodName, startVal, endVal, 0)
    },
    setDayAndDateInWeekWithTwoMonths (remainingDays, periodName) {
      const startVal = this.mondayDate
      const endVal = this.dayInMonth
      // First we create table with object for this date: from 29th May, to 31st May
      this.loopCreateWeekDays(periodName, startVal, endVal, 1)
      // Second we add to existing table date from 1st June to 4th June
      this.loopCreateWeekDays(periodName, 1, remainingDays, 0)
    },
    fetchData () {
      this.loading = true
      this.$http.get('/schedule')
      // this.$http.get(this.apiUrl + '/schedule')
      .then(response => {
        this.reservations = {...response.data}
        this.displayBookedLaunch()
        this.loading = false
      })
      .catch(error => {
        this.errors.push(error)
        this.loading = false
      })
    },
    displayBookedLaunch () {
      this.displayBooked(this.dateInWeekMorning, '08:00')
      this.displayBooked(this.dateInWeekAfternoon, '12:00')
    },
    displayBooked (dayTime, start) {
      const res = this.reservations.reservationsTable
      for (let days of dayTime) {
        let fullMonth = (days.month + 1).toString()
        if (fullMonth.length < 2) {
          fullMonth = '0' + fullMonth
        }
        let fullDate = days.year + '-' + fullMonth + '-' + days.day
        for (let reservation of res) {
          // console.log(fullDate, reservation.date)
          if (reservation.date === fullDate && reservation.startTime === start) {
            days.booked = true
            days.forename = reservation.ownerForename
            days.surname = reservation.ownerSurname
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
      if (this.sundayDate < this.mondayDate) {
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
    width: 85.5em;
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
    width: 4.4em;
    height: 3.8em;
  }
  .afternoonImg {
    background: url("../assets/afternoon.png") no-repeat;
    width: 4.4em;
    height: 4.4em;
  }
  .line {
    display: inline-block;
  }
  .line:before {
    content: "";
    display: block;
    border-top-style: dashed;
    margin-left: 5em;
    height: 3.8em;
    transform: translateY(50%);
  }
</style>

