<template>
  <div class="transfer">
    <router-link to="/">Powrót do strony głównej</router-link>
    <div> 
      <router-link to="calendar/previous" class="navigateButton"><<</router-link> 
      {{ date }} 
      <router-link to="calendar/next" class="navigateButton">>></router-link> 
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-1 morningImg"></div><div class="col-md-11 line"></div>
      </div>
      <!-- Morning calendar-->
      <div class="row justify-content-end">
        <div class="col-md-11">
          <table class="table">
            <tr>
              <td v-for="day in dayAndDateInWeek">
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
              <td v-for="(day, index) in dayInWeek"></td>
            </tr>         
          </table>
        </div>
      </div>
      <!--END Morning Calendar--> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      date: '',
      dayInWeek: ['pn', 'wt', 'śr', 'czw', 'pt', 'sb', 'nd'],
      dayAndDateInWeek: [],
      mondayDate: ''
    }
  },
  created () {
    this.formatedMonthAndWeek()
  },
  methods: {
    formatedMonthAndWeek () {
      const month = ['STYCZEŃ', 'LUTY', 'MARZEC', 'KWIECIEŃ', 'MAJ', 'CZERWIEC', 'LIPIEC', 'SIERPIEŃ', 'WRZESIEŃ', 'PAŹDZIERNIK', 'LISTOPAD', 'GRUDZIEŃ']
      const nowDate = new Date(2017, 2, 25)
      const monSunDate = new Array(2)
      this.mondayDate = nowDate.getDate() - (nowDate.getDay() === 0 ? 6 : (nowDate.getDay() - 1))
      const dayInMonth = this.howMuchDayInMonth(nowDate.getMonth() + 1, nowDate.getFullYear())
      if ((this.mondayDate + 6) > dayInMonth) {
        const remainingDays = 7 - (dayInMonth - this.mondayDate + 1)
        monSunDate[0] = this.mondayDate < 10 ? `0${this.mondayDate}` : `${this.mondayDate}`
        monSunDate[1] = remainingDays < 10 ? `0${remainingDays}` : `${remainingDays}`
        this.date = `${month[nowDate.getMonth()]} ${monSunDate[0]}-${dayInMonth}, ${month[nowDate.getMonth() + 1]} 01-${monSunDate[1]}`
      } else {
        monSunDate[0] = this.mondayDate < 10 ? `0${this.mondayDate}` : `${this.mondayDate}`
        monSunDate[1] = (this.mondayDate + 6) < 10 ? `0${this.mondayDate + 6}` : `${this.mondayDate + 6}`
        this.date = `${month[nowDate.getMonth()]} ${monSunDate[0]}-${monSunDate[1]}`
        for (let i = monSunDate[0]; i <= monSunDate[1]; i++) {
          let day = {
            dayName: this.dayInWeek[i - monSunDate[0]],
            dayDate: i
          }
          this.dayAndDateInWeek.push(day)
        }
      }
      /* this.mondayDate = nowDate.getDate() - (nowDate.getDay() === 0 ? 6 : (nowDate.getDay() - 1))
      const dayInMonth = this.howMuchDayInMonth(nowDate.getMonth() + 1, nowDate.getFullYear())
      if ((this.mondayDate + 6) > dayInMonth) {
        const remainingDays = 7 - (dayInMonth - this.mondayDate + 1)
        this.date = `${month[nowDate.getMonth()]} ${this.mondayDate}-${dayInMonth}, ${month[nowDate.getMonth() + 1]} 01-0${remainingDays}`
      } else {
        this.date = `${month[nowDate.getMonth()]} ${this.mondayDate}-${this.mondayDate + 6}`
      } */
    },
    howMuchDayInMonth (month, year) {
      return new Date(year, month, 0).getDate()
    }
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
</style>
