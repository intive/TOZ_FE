<template>
  <div>
    <router-link to="/transfer">Kliknij tutaj, aby wyświetlić dane do przelewu</router-link>
    <div class="news-container" v-for="item in news">
      <router-link :to="{ name: 'news', params: {
        id: item.id,
        title: item.title,
        longContent: item.longContent,
        dateDay: item.date.day,
        dateMonth: item.date.month,
        dateYear: item.date.year }
      }">
        <h1>{{ item.title }}</h1>
      </router-link>
      <h3>{{ item.date.day }}-{{ item.date.month }}-{{ item.date.year }}</h3>
      <h3>{{ item.shortContent }}</h3>
    </div>
  </div>
</template>

<script>
  import News from './News'
  export default {
    name: 'Home',
    data () {
      return {
        news: [
          {
            id: 1,
            title: 'Komunikat 1',
            shortContent: 'Skrócona treść komunikatu 1.',
            longContent: 'Długa treść komunikatu 1.',
            date: {
              day: '01',
              month: '01',
              year: '2017'
            }
          },
          {
            id: 2,
            title: 'Komunikat 2',
            shortContent: 'Skrócona treść komunikatu 2.',
            longContent: 'Długa treść komunikatu 2.',
            date: {
              day: '02',
              month: '01',
              year: '2017'
            }
          }
        ]
      }
    },
    components: {
      News
    }
  }
</script>

<style scoped>
  .news-container {
    border: 1px solid black;
    width: 500px;
    height: 200px;
  }</style>
