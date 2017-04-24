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
      const index = (this.weekDay === 0) ? 6 : (this.weekDay - 1)
      this.dayShortcut = `schedule.dayInWeek[${index}]`
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
