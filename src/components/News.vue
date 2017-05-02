<template>
  <div>
    <div v-if="loading" class="sk-fading-circle">
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    </div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <carousel class="carousel"
              v-else-if="!loading"
              :navigationEnabled="settings.navigationEnabled"
              :paginationEnabled="settings.paginationEnabled"
              :navigationClickTargetSize="settings.navigationClickTargetSize"
              :perPageCustom="settings.perPageCustom">
      <slide v-for="item in news" :key="item.id">
        <div class="container">
          <div class="row">
            <div class="column news-container">
              <img :src="item.photoUrl"
                   class="img-fluid">
            </div>
            <div class="column news-container">
              <router-link :to="{ name: 'news', params: { id: item.id } }">
                <h2>{{ item.title }}</h2>
              </router-link>
              <hr>
              <h3>{{ item.date.day }} / {{ item.date.month }} / {{ item.date.year }}</h3>
              <h4>{{ item.shortContent }}</h4>
            </div>
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel'

  export default {
    name: 'News',
    data () {
      return {
        settings: {
          navigationEnabled: true,
          paginationEnabled: false,
          navigationClickTargetSize: 0,
          perPageCustom: [[768, 1], [1024, 1], [1920, 1]]
        },
        news: [],
        errors: [],
        loading: true
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        // this.$http.get(this.apiUrl + '/news?shortened=false')
        this.$http.get('/news')
            .then(response => {
              this.news = response.data
              this.loading = false
            })
            .catch(error => {
              this.errors.push(error)
              this.loading = false
            })
      }
    },
    components: {
      Carousel,
      Slide
    }
  }
</script>

<style scoped>
@import "../assets/styles/loader.css";

.news-container {
  height: 350px;
  width: 600px;
  margin: 0;
  padding: 10px;
  border: 1px solid rgba(0,0,0,.1);
}

.carousel,
.container,
.row {
  width: 1200px;
}

.carousel {
  margin: 0 auto;
}
</style>
