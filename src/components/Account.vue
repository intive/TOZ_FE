<template>
  <div class="container" id="dashboard">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-4 mt-5">
        <span class="fa fa-key fa-large"></span>
        <router-link to="/account-password" class="btn">{{ $t("account.changePassword") }}</router-link>
      </div>
      <div class="col-12 col-lg-4 mt-5">
        <span class="fa fa-reply fa-large"></span>
        <router-link to="/" class="btn">{{ $t("common.backHome") }}</router-link>
      </div>
      <div class="col-12 col-lg-4 mt-5">
        <span class="fa fa-sign-out fa-large"></span>
        <button class="btn" @click="logout">{{ $t("navbar.signOut") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth.js'

export default {
  name: 'Account',
  methods: {
    logout () {
      auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass">
  @import "../assets/styles/variables.sass"

  #dashboard [class^="col-"]:hover
    .fa
      transform: scale(1.1)
      color: $green
      transition-duration: 0.3s
</style>
