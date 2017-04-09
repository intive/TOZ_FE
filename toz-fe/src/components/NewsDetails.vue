<template>
  <div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div v-if="newsDetails" :key="newsDetails.id">
      <h1>{{ newsDetails.title }}</h1>
      <h1>{{ newsDetails.created }}</h1>
      <h1>{{ newsDetails.published }}</h1>
      <h1>{{ newsDetails.contents }}</h1>
      <img :src="newsDetails.photoUrl"
           class="img-fluid"
           :alt="$t('img.alt.dog')">
      <router-link to="/">{{ $t("navigation.back.home") }}</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewsDetails',
    data () {
      return {
        news: [],
        errors: [],
        newsDetails: null
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      getData (id) {
        setTimeout(() => {
          for (let i = 0; i < this.news.length; i++) {
            if (this.news[i].id === id) {
              this.newsDetails = this.news[i]
            }
          }

          if (!this.newsDetails) {
            this.errors.push(new Error('News not found.'))
          }
        }, 100)
      },
      fetchData () {
        this.$http.get('http://dev.patronage2017.intive-projects.com/news?shortened=false')
            .then(response => {
              this.news = [...response.data]
            })
            .catch(error => {
              this.errors.push(error)
            })

        this.getData(this.$route.params.id)
      }
    }
  }
</script>

<style scoped>
</style>
