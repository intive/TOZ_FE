<template>
  <div>
    <div class="loader" v-if="loading"></div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div v-else>
      <h1>{{ newsDetails.title }}</h1>
      <h2>{{ newsDetails.date.day }} / {{ newsDetails.date.month }} / {{ newsDetails.date.year }}</h2>
      <h3>{{ newsDetails.longContent }}</h3>
      <img :src="newsDetails.photoUrl"
           class="img-fluid"
           :alt="$t('img.alt.dog')">
    </div>
    <router-link to="/">{{ $t("common.backHome") }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'NewsDetails',
  data () {
    return {
      errors: [],
      newsDetails: {
        title: '',
        shortContent: '',
        longContent: '',
        date: {
          day: '',
          month: '',
          year: ''
        },
        photoUrl: ''
      },
      id: this.$route.params.id,
      loading: true
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.$http.get('/news/' + this.id)
      // this.$http.get(this.apiUrl + '/news?shortened=false')
          .then(response => {
            this.newsDetails = {...response.data[this.id - 1]}
            this.loading = false
          })
          .catch(error => {
            this.errors.push(error)
            this.loading = false
          })
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/loader.css";
</style>
