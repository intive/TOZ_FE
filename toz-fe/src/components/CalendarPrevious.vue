<template>
  <div class="transfer">
    <router-link to="/">Powrót do strony głównej</router-link>
    <div> 
      {{ formatedStringWithDate }} 
      <router-link to="/calendar" class="navigateButton">>></router-link> 
    </div>
    <calendar :mondayDay="mondayDate" :monthLength="dayInMonth" :currMonth="monthNumber"></calendar>
  </div>
</template>

<script>
import Calendar from './Calendar.vue'

export default {
  name: 'calendarPrevious',
  data () {
    return {
      mondayDate: '',
      dayInMonth: '',
      sundayDay: '',
      monthName: '',
      monthNumber: '',
      stringDate: ''
    }
  },
  created () {
    this.setMondayDate()
  },
  methods: {
    setMondayDate () {
      const nowDate = new Date()
      this.dayInMonth = this.howMuchDayInPreviousMonth(nowDate.getFullYear(), nowDate.getMonth())
      this.monthNumber = nowDate.getMonth() - 1
      // If date of day is bigger than 7
      if (nowDate.getDate() > 7) {
        if ((nowDate.getDate() - 7) <= 6) {
          this.sundayDay = (nowDate.getDate() - 7) + (7 - (nowDate.getDay() === 0 ? 7 : nowDate.getDay()))
          // If sunday day is bigger or equal 7 then monday is 6 days before otherwise is dayInMonth subtract remainingDays
          if (this.sundayDay >= 7) {
            this.mondayDate = this.sundayDay - 6
          } else {
            const remainingDays = (7 - this.sundayDay) - 1
            this.mondayDate = this.dayInMonth - remainingDays
          }
        } else {
          this.mondayDate = (nowDate.getDate() - 7) - (nowDate.getDay() === 0 ? 6 : (nowDate.getDay() - 1))
          this.dayInMonth = this.howMuchDayInPreviousMonth(nowDate.getFullYear(), nowDate.getMonth() + 1)
          this.monthNumber = nowDate.getMonth()
          this.sundayDay = this.mondayDate + 6
        }
      // If date of day is less than 7
      } else {
        this.mondayDate = (this.dayInMonth - (7 - nowDate.getDate())) - (nowDate.getDay() - 1)
        this.sundayDay = (this.mondayDate + 7) - (this.dayInMonth + 1)
      }
    },
    howMuchDayInPreviousMonth (year, month) {
      return new Date(year, month, 0).getDate()
    }
  },
  computed: {
    formatedStringWithDate () {
      const month = ['STYCZEŃ', 'LUTY', 'MARZEC', 'KWIECIEŃ', 'MAJ', 'CZERWIEC', 'LIPIEC', 'SIERPIEŃ', 'WRZESIEŃ', 'PAŹDZIERNIK', 'LISTOPAD', 'GRUDZIEŃ']
      const sunDay = this.sundayDay < 10 ? `0${this.sundayDay}` : this.sundayDay
      const monDate = this.mondayDate < 10 ? `0${this.mondayDate}` : this.mondayDate
      if (this.sundayDay < this.mondayDate) {
        this.stringDate = `${month[this.monthNumber === -1 ? 11 : this.monthNumber]} ${monDate}- ${month[(this.monthNumber + 1) === 12 ? 0 : (this.monthNumber + 1)]} ${sunDay}`
      } else {
        this.stringDate = `${month[this.monthNumber]} ${monDate}-${sunDay}`
      }
      return this.stringDate
    }
  },
  components: {
    'calendar': Calendar
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

.navigateButton {
  color: #000;
  text-decoration: none;
  font-weight: bold;
}
</style>
