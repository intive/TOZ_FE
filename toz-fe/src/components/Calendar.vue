<template>
  <div class="container">
    <div class="row justify-content-end">
      <div class="col-12 col-md-12 col-xl-12 line morningImg"></div>
    </div>
    <!-- Morning calendar-->
    <div class="row justify-content-end">
      <div class="col-md-11">
        <table class="table">
          <tr @click="dayTime='rano'">
            <td v-for="day of dayAndDateInWeek" @click="openModal(day)">
              <h3>{{ day.dayDate }}</h3>
              {{ day.dayName }}
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
      <div class="col-md-11">
        <table class="table">
          <tr @click="dayTime='popołudnie'">
            <td v-for="day of dayAndDateInWeek" @click="openModal(day)"></td>
          </tr>         
        </table>
      </div>
    </div>
    <!--END Afternoon Calendar--> 
  </div>
</template>

<script>
import Booking from './Booking.vue'
export default {
  name: 'Calendar',
  data () {
    return {
      dayInWeek: ['pn', 'wt', 'śr', 'czw', 'pt', 'sb', 'nd'],
      dayDisplay: '',
      dayLong: '',
      dayLongList: ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'],
      dayTime: '',
      dayAndDateInWeek: [],
      mondayToSundayDate: [],
      gotMonday: this.mondayDay,
      gotDayInMonth: this.monthLength,
      gettedMonday: this.mondayDay,
      gettedDayInMonth: this.monthLength,
      months: ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sieprnia', 'września', 'października', 'listopada', 'grudnia'],
      showModal: false,
      showModalBooked: false,
      showModalAccept: false,
      volunteer: 'Przykładowy Wolontariusz',
      currentMonth: ''
    }
  },
  props: ['mondayDay', 'monthLength', 'currMonth'],
  created () {
    this.formatMonthAndWeek()
  },
  methods: {
    formatMonthAndWeek () {
      // Contains number of day which left in week after month is ended
      const remainingDays = 7 - (this.gotDayInMonth - this.gotMonday + 1)
      if ((this.gotMonday + 6) > this.gotDayInMonth) {
        // Set date and name of day in week which contains two months for example: March 27-April 02
        this.setDayAndDateInWeekWithTwoMonths(remainingDays)
      } else {
        // Set date and name of day in week which contains one month
        this.setDayAndDateInWeekWithOneMonth()
      }
    },
    setDayAndDateInWeekWithOneMonth () {
      this.mondayToSundayDate[0] = this.gotMonday
      this.mondayToSundayDate[1] = this.gotMonday + 6
      for (let i = this.mondayToSundayDate[0]; i <= this.mondayToSundayDate[1]; i++) {
        let day = {
          dayName: this.dayInWeek[i - this.mondayToSundayDate[0]],
          dayDate: i < 10 ? `0${i}` : `${i}`
        }
        this.dayAndDateInWeek.push(day)
      }
    },
    setDayAndDateInWeekWithTwoMonths (remainingDays) {
      this.mondayToSundayDate[0] = this.gotMonday
      this.mondayToSundayDate[1] = remainingDays
      for (let i = this.mondayToSundayDate[0]; i <= this.gotDayInMonth; i++) {
        let day = {
          dayName: this.dayInWeek[i - this.mondayToSundayDate[0]],
          dayDate: i < 10 ? `0${i}` : `${i}`
        }
        this.dayAndDateInWeek.push(day)
        var indexOfDay = i - this.mondayToSundayDate[0]
      }
      for (let i = 1; i <= remainingDays; i++) {
        let day = {
          dayName: this.dayInWeek[indexOfDay + i],
          dayDate: `0${i}`
        }
        this.dayAndDateInWeek.push(day)
      }
      console.log('druga')
    },
    openModal (day) {
      this.showModal = true
      this.dayAndDateInWeek.dayName = day.dayName
      this.dayAndDateInWeek.dayDate = parseInt(day.dayDate)
      this.monthCount()
      this.dayLong = this.dayLongList[this.dayInWeek.indexOf(this.dayAndDateInWeek.dayName)]
    },
    openModalAccept () {
      this.showModal = false
      this.showModalAccept = true
      this.showModal = false
    },
    monthCount () {
      if (this.dayAndDateInWeek.dayDate >= this.gettedMonday) {
        this.currentMonth = this.months[this.currMonth]
      } else {
        this.currentMonth = this.months[this.currMonth + 1]
      }
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
h2.booking {
  margin-top: 30px;
}
h3.booking {
  width: 90%;
  margin: 0 auto;
  line-height: 50px;
  border-bottom: 3px solid #000;
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
.morningImg {
  background: url("img/morning.png") no-repeat;
  width: 70px;
  height: 60px;
}
.afternoonImg {
  background: url("img/afternoon.png") no-repeat;
  width: 70px;
  height: 70px;
}
.line {
  display: inline-block;
}
.line:before {
  content: "";
  display: block;
  border-bottom-style: dashed;
  margin-left: 80px;
  height: 60px;
  transform: translateY(-50%);
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
