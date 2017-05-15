<template>
  <div class="container">
    <div v-if="volunteer.fetching" class="loader"></div>
    <form @submit.prevent class="loginForm" v-if="!volunteer.fetching">
      <div class="form-group row"
        :class="{'has-danger': emailWarning || volunteer.errorMessage}">
        <label for="login" class="col-sm-2 col-form-label">{{ $t("common.label.login") }}</label>
        <div class="col-sm-10">
          <input type="email"
          class="form-control"
          id="login"
          maxlength="255"
          placeholder="login"
          v-model="credentials.login">
        </div>
      </div>
      <div class="form-group row"
        :class="{'has-danger': emailWarning || volunteer.errorMessage}">
        <label for="password" class="col-sm-2 col-form-label">{{ $t("common.label.password") }}</label>
        <div class="col-sm-10">
          <input type="password"
          class="form-control"
          id="password"
          maxlength="30"
          placeholder="password"
          v-model="credentials.password">
        </div>
      </div>
      <p v-if="warning || volunteer.errorMessage">{{ $t('login.invalid') }}</p>
      <div class="form-group row">
        <div class="offset-sm-2 col-sm-10">
          <button type="submit" class="btn" @click="signIn">{{ $t("common.button.ok") }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import auth from '../auth.js'

export default {
  data () {
    return {
      credentials: {
        login: '',
        password: ''
      },
      emailWarning: false,
      volunteer: auth.user
    }
  },
  methods: {
    validateEmail () {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegex.test(this.credentials.login)) {
        this.emailWarning = true
        return false
      }
      this.emailWarning = false
      return true
    },
    signIn () {
      const credentials = {
        email: this.credentials.login,
        password: this.credentials.password
      }
      if (!this.validateEmail()) {
        return false
      }
      auth.login(this, credentials)
    }
  }
}
</script>

<style lang="sass">
  .loginForm
    margin-top: 100px
</style>
