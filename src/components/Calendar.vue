<template>
  <div class="container">
    <div class="row scheduleNav">
      <div class="col-8 offset-md-1 noPadding upper">{{ formattedStringWithDate }}</div>
      <div class="col-2 noPadding">
        <div class="next" @click="setPreviousAndNextWeekDate(true)" v-if="nextWeek">{{ $t('calendar.button.next') }}</div>
        <div class="previous" @click="setPreviousAndNextWeekDate(false)" v-if="previousWeek"> {{ $t('calendar.button.previous') }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col dayTime offset-md-1">{{ $t('calendar.morningText') }}</div>
      <div class="col-10 col-md-10 col-xl-10 offset-md-1 line"></div>
    </div>
    <span class="fullWeek">
      <div v-if="loading" class="loader"></div>
      <div v-else class="row">
        <div class="col-10 col-md-10 col-xl-5 offset-md-1 noPadding">
          <table class="table">
            <tr>
              <td v-for="days in firstDateInWeekMorning" :key="days.day">
                <dayItem
                  @fetch="fetchData"
                  :currentDay="days.day"
                  :currentMonth="days.month"
                  :currentYear="days.year"
                  :currentWeekDay="days.weekDay"
                  :currentDayTime="days.dayTime"
                  :getConfirmation="days.booked"
                  :firstName="days.forename"
                  :lastName="days.surname"
                  :getUserId="days.userId"
                  :getResId="days.resId">
                </dayItem>
              </td>
            </tr>
          </table>
        </div>
        <div class="col-10 col-md-10 col-xl-5 hidden-md-down">
          <table class="table">
            <tr>
              <td v-for="days in secondDateInWeekMorning" :key="days.day">
                <dayItem
                  @fetch="fetchData"
                  :currentDay="days.day"
                  :currentMonth="days.month"
                  :currentYear="days.year"
                  :currentWeekDay="days.weekDay"
                  :currentDayTime="days.dayTime"
                  :getConfirmation="days.booked"
                  :firstName="days.forename"
                  :lastName="days.surname"
                  :getUserId="days.userId"
                  :getResId="days.resId">
                </dayItem>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </span>
    <div class="row">
      <div class="col dayTime offset-md-1">{{ $t('calendar.afternoonText') }}</div>
      <div class="col-10 col-md-10 col-xl-10 offset-md-1 line"></div>
    </div>
    <span class="fullWeek">
      <div v-if="loading" class="loader"></div>
      <div v-else class="row">
        <div class="col-10 col-md-10 col-xl-5 offset-md-1 noPadding">
          <table class="table">
            <tr>
              <td v-for="days in firstDateInWeekAfternoon" :key="days.day">
                <dayItem
                  @fetch="fetchData"
                  :currentDay="days.day"
                  :currentMonth="days.month"
                  :currentYear="days.year"
                  :currentWeekDay="days.weekDay"
                  :currentDayTime="days.dayTime"
                  :getConfirmation="days.booked"
                  :firstName="days.forename"
                  :lastName="days.surname"
                  :getUserId="days.userId"
                  :getResId="days.resId">
                </dayItem>
              </td>
            </tr>
          </table>
        </div>
        <div class="col-10 col-md-10 col-xl-5 hidden-md-down">
          <table class="table">
            <tr>
              <td v-for="days in secondDateInWeekAfternoon" :key="days.day">
                <dayItem
                  @fetch="fetchData"
                  :currentDay="days.day"
                  :currentMonth="days.month"
                  :currentYear="days.year"
                  :currentWeekDay="days.weekDay"
                  :currentDayTime="days.dayTime"
                  :getConfirmation="days.booked"
                  :firstName="days.forename"
                  :lastName="days.surname"
                  :getUserId="days.userId"
                  :getResId="days.resId">
                </dayItem>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </span>
  </div>
</template>
<script>
import DayItem from './DayItem'
export default {
  name: 'Calendar',
  data () {
    return {
      currentDate: '',
      mondayDate: '',
      sundayDate: '',
      nextSundayDate: '',
      dayInMonth: '',
      monthNumber: '',
      dateInWeekMorning: [],
      firstDateInWeekMorning: [],
      secondDateInWeekMorning: [],
      dateInWeekAfternoon: [],
      firstDateInWeekAfternoon: [],
      secondDateInWeekAfternoon: [],
      morningStartTime: '08:00',
      afternoonStartTime: '12:00',
      stringDate: '',
      previousWeek: true,
      nextWeek: false,
      loading: true,
      reservations: {},
      errors: []
    }
  },
  components: {
    DayItem
  },
  methods: {
    daysInMonth (year, month) {
      return new Date(year, month, 0).getDate()
    },
    setPreviousAndNextWeekDate (nextWeekTrue) {
      const nowMonth = this.daysInMonth(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
      const previousMonth = this.daysInMonth(this.currentDate.getFullYear(), this.currentDate.getMonth())
      let newDate = this.currentDate.getDate()
      nextWeekTrue ? newDate += 7 : newDate
      this.dateInWeekMorning.splice(0, this.dateInWeekMorning.length)
      this.dateInWeekAfternoon.splice(0, this.dateInWeekAfternoon.length)
      this.setWeekDate(nextWeekTrue, newDate, nowMonth, previousMonth)
      this.setMondayDate()
      this.displayWeekChangeButton(nextWeekTrue)
      this.fetchData()
    },
    setWeekDate (nextWeekTrue, indexOfDayInMonth, currentMonthLength, previousMonthLength) {
      const dayInNextMonth = indexOfDayInMonth - currentMonthLength
      if (nextWeekTrue) {
        if (indexOfDayInMonth > currentMonthLength) {
          this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, dayInNextMonth)
        } else {
          this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), indexOfDayInMonth)
        }
      } else {
        if (indexOfDayInMonth <= 7) {
          let previousDay = previousMonthLength - (7 - indexOfDayInMonth)
          this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, previousDay)
        } else {
          this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (indexOfDayInMonth - 7))
        }
      }
    },
    displayWeekChangeButton (nextWeekTrue) {
      let condition = true
      nextWeekTrue ? condition = !this.previousWeek : condition = !this.nextWeek
      if (condition) {
        this.previousWeek = true
        this.nextWeek = true
      } else {
        if (nextWeekTrue) {
          this.nextWeek = false
        } else {
          this.previousWeek = false
        }
      }
    },
    numbersOfDaysToAdd () {
      this.dayInMonth = this.daysInMonth(this.currentDate.getFullYear(), this.currentDate.getMonth())
      let daysToAdd = 0
      if (this.currentDate.getDay() === 0 && this.currentDate.getDate() + 7 > this.dayInMonth) {
        daysToAdd = 0
      } else {
        daysToAdd = 7 - this.currentDate.getDay()
      }
      return daysToAdd
    },
    setMondayDate () {
      const currentDay = (this.currentDate.getDay() === 0) ? 6 : (this.currentDate.getDay() - 1)
      const daysToAdd = this.numbersOfDaysToAdd()
      const remainingDays = this.currentDate.getDate() + daysToAdd
      this.dayInMonth = this.daysInMonth(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
      this.monthNumber = this.currentDate.getMonth()
      if (remainingDays > this.dayInMonth) {
        this.mondayDate = this.currentDate.getDate() - (this.currentDate.getDay() - 1)
        this.sundayDate = remainingDays - this.dayInMonth
      } else {
        this.setMondayDateInOneMonth(currentDay)
      }
      this.formatMonthAndWeek()
    },
    setMondayDateInOneMonth (nrOfDayInWeek) {
      const newDate = ((this.currentDate.getDay() === 0 ? 6 : (this.currentDate.getDay() - 1)) - this.currentDate.getDate())
      if (this.currentDate.getDate() <= 7) {
        if (newDate <= 0) {
          this.mondayDate = this.currentDate.getDate() - nrOfDayInWeek
        } else {
          this.dayInMonth = this.daysInMonth(this.currentDate.getFullYear(), this.currentDate.getMonth())
          this.mondayDate = this.dayInMonth - newDate
          this.monthNumber = this.currentDate.getMonth() - 1
        }
        this.sundayDate = this.currentDate.getDate() + (7 - (nrOfDayInWeek + 1))
      } else {
        this.mondayDate = this.currentDate.getDate() - nrOfDayInWeek
        this.sundayDate = this.mondayDate + 6
      }
    },
    formatMonthAndWeek () {
      const remainingDays = 14 - (this.dayInMonth - this.mondayDate + 1)
      if ((this.mondayDate + 13) > this.dayInMonth) {
        this.setDateForTwoMonths(remainingDays, true)
        this.setDateForTwoMonths(remainingDays, false)
      } else {
        this.setDateForOneMonth(true)
        this.setDateForOneMonth(false)
      }
    },
    loopCreateWeekDays (periodName, startValue, endValue) {
      for (let i = startValue; i <= endValue; i++) {
        const nowDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i)
        let data = {
          day: i < 10 ? `0${i}` : `${i}`,
          month: (nowDate.getDate() >= this.mondayDate) ? nowDate.getMonth() : nowDate.getMonth() + 1,
          year: (nowDate.getMonth() === 12) ? (this.currentDate.getFullYear() + 1) : this.currentDate.getFullYear(),
          weekDay: nowDate.getDay(),
          dayTime: periodName ? 'morning' : 'afternoon',
          booked: false,
          forename: '',
          surname: ''
        }
        if (periodName) {
          this.dateInWeekMorning.push(data)
          this.nextSundayDate = data.day
        } else {
          this.dateInWeekAfternoon.push(data)
        }
      }
      this.splitForTwoWeeks(this.dateInWeekMorning, this.firstDateInWeekMorning, this.secondDateInWeekMorning)
      this.splitForTwoWeeks(this.dateInWeekAfternoon, this.firstDateInWeekAfternoon, this.secondDateInWeekAfternoon)
    },
    splitForTwoWeeks (week, firstWeek, secondWeek) {
      for (let i = 0; i < week.length - 7; i++) {
        secondWeek[i] = week[i + 7]
        firstWeek[i] = week[i]
      }
    },
    setDateForOneMonth (periodName) {
      this.loopCreateWeekDays(periodName, this.mondayDate, this.mondayDate + 13)
    },
    setDateForTwoMonths (remainingDays, periodName) {
      this.loopCreateWeekDays(periodName, this.mondayDate, this.dayInMonth)
      this.loopCreateWeekDays(periodName, 1, remainingDays)
    },
    fetchData () {
      const firstDay = this.fullDate(this.dateInWeekMorning[0].year, this.dateInWeekMorning[0].month, this.mondayDate)
      const lastDay = this.fullDate(this.dateInWeekMorning[13].year, this.dateInWeekMorning[13].month, this.dateInWeekMorning[13].day)
      this.loading = true
      this.$http.get(this.apiUrl + 'schedule?from=' + firstDay + '&to=' + lastDay)
      .then(response => {
        this.reservations = [...response.data.reservations]
        this.displayBookedLaunch()
        this.loading = false
      })
      .catch(e => {
        this.errors.push(e)
        this.loading = false
      })
    },
    displayBookedLaunch () {
      this.displayBooked(this.dateInWeekMorning, this.morningStartTime)
      this.displayBooked(this.dateInWeekAfternoon, this.afternoonStartTime)
    },
    displayBooked (dayTime, start) {
      const res = this.reservations
      for (let days of dayTime) {
        let date = this.fullDate(days.year, days.month, days.day)
        for (let reservation of res) {
          if (reservation.date === date && reservation.startTime === start) {
            days.booked = true
            days.forename = reservation.ownerName
            days.surname = reservation.ownerSurname
            days.userId = reservation.ownerId
            days.resId = reservation.id
          }
        }
      }
    },
    fullDate (year, month, day) {
      if (day.toString().length < 2) {
        day = '0' + day
      }
      let fullMonth = (month + 1).toString()
      if (fullMonth.length < 2) {
        fullMonth = '0' + fullMonth
      }
      return year + '-' + fullMonth + '-' + day
    }
  },
  computed: {
    formattedStringWithDate () {
      const month = this.$t('calendar.months')
      const sunDate = this.nextSundayDate
      const monDate = this.mondayDate < 10 ? `0${this.mondayDate}` : this.mondayDate
      if (this.nextSundayDate < this.mondayDate) {
        this.stringDate = `${month[this.monthNumber === -1 ? 11 : this.monthNumber]} ${monDate}- ${month[(this.monthNumber + 1) === 12 ? 0 : (this.monthNumber + 1)]} ${sunDate}`
      } else {
        this.stringDate = `${month[this.monthNumber]} ${monDate}-${sunDate}`
      }
      return this.stringDate
    }
  },
  created () {
    this.currentDate = new Date()
    this.setMondayDate()
    this.nextSundayDate = this.dateInWeekMorning[13].day
    this.fetchData()
  }
}
</script>

<style scoped>
.container {
  width: 136.6em
}
td {
  width: 6em
}
.scheduleNav {
  font-size: 2em;
  text-align: left;
  margin-top: 4em
}
.table {
  border: none;
  margin-top: .5em
}
.dayTime {
  width: 100%;
  text-align: left;
  text-transform: uppercase;
  font-size: 2.5em;
  margin-top: 3em
}
.upper {
  text-transform: uppercase;
}
.previous, .next {
  width: 1em;
  height: 1em;
  text-align: center;
  line-height: .9em;
  border-radius: 1em;
  font-size: 1.75em;
  float: right
}
.previous:hover, .next:hover {
  cursor: pointer;
  background-color: #4CD374
}
.noPadding, .table td, .dayTime {
  padding: 0
}
.line {
  display: block;
  border-top: .5em solid #ebebeb;
}
</style>
