<template>
  <div class="transfer">
    <router-link to="/">Powrót do strony głównej</router-link>
    <div> 
      <router-link to="/calendar" class="navigateButton"><<</router-link> 
      {{ formatedStringWithDate }}
    </div>
    <calendar :mondayDay="mondayDate" :monthLength="dayInMonth" :currMonth="monthNumber"></calendar>
  </div>
</template>

<script>
import Calendar from './Calendar.vue'
export default {
  name: 'calendarNext',
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
      this.dayInMonth = this.howMuchDayInPreviousMonth(nowDate.getFullYear(), nowDate.getMonth() + 1)
      this.monthNumber = nowDate.getMonth()
      if ((nowDate.getDate() + 7) > this.dayInMonth) {
        const remainingDays = (nowDate.getDate() + 7) - this.dayInMonth
        const newDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, remainingDays)
        if (newDate.getDate() <= 7) {
          this.sundayDay = newDate.getDay() === 0 ? newDate.getDate() : (newDate.getDate() + (7 - newDate.getDay()))
          if (this.sundayDay >= 7) {
            this.mondayDate = this.sundayDay - 6
          } else {
            this.mondayDate = this.dayInMonth - (6 - this.sundayDay)
          }
        } else {
          this.mondayDate = newDate.getDate() - (nowDate.getDay() === 0 ? 6 : (nowDate.getDay() - 1))
          this.sundayDay = this.mondayDate + 6
        }
        this.monthNumber = nowDate.getMonth() + 1
      } else {
        this.mondayDate = (nowDate.getDate() + 7) - (nowDate.getDay() === 0 ? 6 : (nowDate.getDay() - 1))
        if ((this.mondayDate + 6) > this.dayInMonth) {
          this.sundayDay = 7 - (this.dayInMonth - (this.mondayDate - 1))
        } else {
          this.sundayDay = this.mondayDate + 6
        }
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
