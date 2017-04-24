<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="loader" v-if="loading"></div>
      <div class="col-12 col-md-12 col-xl-12" v-else-if="!loading">
        <p>{{ howBeVolunteer.content }}</p>
      </div>
      <div class="col-12 col-md-12 col-xl-12" v-if="errors">
        <h3 v-for="error in errors">{{ error.message }}</h3>
      </div>
      <router-link to="/volunteer" class="btn btn-primary goToForm">{{ $t('help.goToForm') }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transferData',
  data () {
    return {
      howBeVolunteer: [],
      errors: [],
      loading: true
    }
  },
  created () {
    this.$http.get('/help/info')
      .then(response => {
        this.howBeVolunteer = response.data.info
        this.loading = false
      })
      .catch(error => {
        this.errors.push(error)
        this.loading = false
      })
  }
}
</script>

<style scoped>
@import "../assets/styles/loader.css";

.goToForm {
  margin-top: 2em;
}
</style>
