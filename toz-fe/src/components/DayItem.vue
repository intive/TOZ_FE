<template>
  <div class="dayView" v-if="dayTime === 'morning'">
    <h1>{{ day }}</h1>
    {{ $t(dayShortcut) }}
  </div>
  <div class="dayView" v-else></div>
</template>

<script>
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
      dayShortcut: ''
    }
  },
  methods: {
    setDayShortcut () {
      const nowDate = new Date(this.year, this.month - 1, this.day)
      const dayIndex = (nowDate.getDay() === 0) ? 6 : nowDate.getDay() - 1
      this.dayShortcut = `schedule.dayInWeek[${dayIndex}]`
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
}
</style>
