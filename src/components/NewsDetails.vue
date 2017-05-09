<template>
  <div>
    <div class="loader" v-if="loading"></div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div v-else>
      <h1>{{ newsDetails.title }}</h1>
       <!--<h2>{{ newsDetails.date.day }} / {{ newsDetails.date.month }} / {{ newsDetails.date.year }}</h2>-->
      <h3>{{ newsDetails.contents }}</h3>
      <img :src="newsDetails.photoUrl"
           class="img-fluid">
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
        contents: '',
        photoUrl: '',
        created: ''
      },
      id: this.$route.params.id,
      loading: true
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route.fullPath': 'fetchData'
  },
  methods: {
    fetchData () {
      this.$http.get(this.apiUrl + 'news/' + this.id)
        .then(response => {
          this.newsDetails.title = response.data.title
          this.newsDetails.contents = response.data.contents
          this.newsDetails.photoUrl = response.data.photoUrl
          this.newsDetails.created = response.data.created
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
