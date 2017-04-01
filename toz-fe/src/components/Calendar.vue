<template>
  <div class="container">
    <div class="row">
      <div class="col-md-1 morningImg"></div><div class="col-md-11 line"></div>
    </div>
    <!-- Morning calendar-->
    <div class="row justify-content-end">
      <div class="col-md-11">
        <table class="table">
          <tr>
            <td v-for="day in dayAndDateInWeek" @click="openModal(day)">
              <h3>{{ day.dayDate }}</h3>
              {{ day.dayName }}
            </td>
          </tr>         
        </table>
      </div>
    </div>
    <!--END Morning Calendar-->      

    <div class="row">
      <div class="col-md-1 afternoonImg"></div><div class="col-md-11 line"></div>
    </div>

    <!-- Afternoon calendar-->
    <div class="row justify-content-end">
      <div class="col-md-11">
        <table class="table">
          <tr>
            <td v-for="day in dayAndDateInWeek" @click="openModal(day)"></td>
          </tr>         
        </table>
      </div>
    </div>
    <!--END Afternoon Calendar--> 
    <booking v-if="showModal" @close="showModal = false">
      <h2 slot="header">Rezerwujesz termin:</h2>
      <h3 slot="date">{{ this.dayAndDateInWeek.dayName }} {{ this.dayAndDateInWeek.dayDate}}</h3>
      <input slot='body' type='text' placeholder='Imię i nazwisko' v-model='volunteer'>
    </booking>
  </div>
</template>

<script>
import Booking from './Booking.vue'
export default {
  name: 'Calendar',
  data () {
    return {
      dayInWeek: ['pn', 'wt', 'śr', 'czw', 'pt', 'sb', 'nd'],
      dayAndDateInWeek: [],
      gettedMonday: this.mondayDay,
      gettedDayInMonth: this.monthLength,
      showModal: false,
      volunteer: ''
    }
  },
  props: ['mondayDay', 'monthLength'],
  created () {
    this.formatedMonthAndWeek()
  },
  methods: {
    formatedMonthAndWeek () {
      const monSunDate = new Array(2)
      if ((this.gettedMonday + 6) > this.gettedDayInMonth) {
        const remainingDays = 7 - (this.gettedDayInMonth - this.gettedMonday + 1)
        monSunDate[0] = this.gettedMonday
        monSunDate[1] = remainingDays
        for (let i = monSunDate[0]; i <= this.gettedDayInMonth; i++) {
          let day = {
            dayName: this.dayInWeek[i - monSunDate[0]],
            dayDate: i < 10 ? `0${i}` : `${i}`
          }
          this.dayAndDateInWeek.push(day)
          var indexOfDay = i - monSunDate[0]
        }
        for (let i = 1; i <= remainingDays; i++) {
          let day = {
            dayName: this.dayInWeek[indexOfDay + i],
            dayDate: `0${i}`
          }
          this.dayAndDateInWeek.push(day)
        }
      } else {
        monSunDate[0] = this.gettedMonday
        monSunDate[1] = this.gettedMonday + 6
        for (let i = monSunDate[0]; i <= monSunDate[1]; i++) {
          let day = {
            dayName: this.dayInWeek[i - monSunDate[0]],
            dayDate: i < 10 ? `0${i}` : `${i}`
          }
          this.dayAndDateInWeek.push(day)
        }
      }
    },
    howMuchDayInMonth (month, year) {
      return new Date(year, month, 0).getDate()
    },
    openModal (day) {
      this.showModal = true
      this.dayAndDateInWeek.dayName = day.dayName
      this.dayAndDateInWeek.dayDate = day.dayDate
    },
    dayLong (day) {

    }
  },
  components: {
    Booking
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
td {
  border-left-style: groove;
  border-bottom-style: groove;
  border-top-style: none;
  text-align: right;
  height: 250px;
}
.container {
  width: 1366px;
}
.line {
  border-bottom-style: dashed;
  margin-top: 1px;
  margin-bottom: 35px;
}
.morningImg {
  width: 70px;
  height: 60px;
  background-image: url("img/morning.png");
  background-repeat: no-repeat;
}
.afternoonImg {
  width: 90px;
  height: 70px;
  background-image: url("img/afternoon.png");
  background-repeat: no-repeat;
}
input {
  width: 80%;
  height: 40px;
  font-size: 30px;
  border: none;
  text-align: center
}
</style>
