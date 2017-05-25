<template>
  <div class="container">
    <div class="row justify-content-center">
      <loader v-if="loading"></loader>
      <div class="col-12 col-md-12 col-xl-12" v-else-if="!loading">
        <p>{{ howToBecomeVolunteer }}</p>
      </div>
      <div class="col-12 col-md-12 col-xl-12" v-if="errors">
        <h3 v-for="error in errors">{{ error.message }}</h3>
      </div>
      <router-link to="/volunteer" class="btn goToForm">{{ $t('helpInfo.goToForm') }}</router-link>
    </div>
    <router-link to="/help" class="routerLink">{{ $t("common.back") }}</router-link>
  </div>
</template>

<script>
import Loader from './Loader'
export default {
  name: 'helpInfo',
  data () {
    return {
      howToBecomeVolunteer: [],
      errors: [],
      loading: true
    }
  },
  created () {
    this.$http.get(this.apiUrl + '/organization/becomevolunteer')
      .then(response => {
        this.howToBecomeVolunteer = response.data.howToHelpDescription
        this.loading = false
      })
      .catch(error => {
        this.errors.push(error)
        this.loading = false
      })
  },
  components: {
    Loader
  }
}
</script>

<style scoped>
  .goToForm {
    margin-top: 2em;
    margin-bottom: 1.5em;
  }
  .routerLink {
    font-size: 1.8em;
  }
</style>
