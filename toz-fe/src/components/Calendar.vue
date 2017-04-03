<template>
  <div class="container">
    <div class="row">
      <div class="col-md-1 morningImg"></div><div class="col-md-11 line"></div>
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
    <!--END Morning Calendar-->      

    <div class="row">
      <div class="col-md-1 afternoonImg"></div><div class="col-md-11 line"></div>
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

    <!-- Booking modal -->
    <booking v-if="showModal">
      <h2 slot="header" class='booking'>Rezerwujesz termin:</h2>
      <h3 slot="slot1" class='booking'>{{ this.dayLong }} {{ this.dayAndDateInWeek.dayDate }} {{ currentMonth }}, {{ dayTime }}</h3>
      <span slot='slot2'>
        <button class="modal-button" @click='showModal = false'>Rezygnuję</button>
        <button class="modal-button" @click='openModalAccept()'>Potwierdzam</button>
      </span>
    </booking>

    <booking v-if="showModalBooked">
      <h2 slot="header" class='booking'>Termin zajęty przez:</h2>
      <h3 slot="slot1" class='booking'>{{ volunteer }}</h3>
    </booking>

    <booking v-if="showModalAccept">
      <h2 slot="header">Świetnie!</h2>
      <h6 slot="slot1">Właśnie dokonałeś rezerwacji terminu.</h6>
      <button slot='slot2' class='modal-button accept-button' @click='showModalAccept = false'>WRÓC DO GRAFIKU</button>
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
      dayDisplay: '',
      dayLong: '',
      dayLongList: ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'],
      dayTime: '',
      dayAndDateInWeek: [],
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
