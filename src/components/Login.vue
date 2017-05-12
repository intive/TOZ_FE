<template>
  <div class="container">
    <form @submit.prevent class="loginForm">
      <div class="form-group row"
        :class="{'has-danger': emailWarning }">
        <label for="login" class="col-sm-2 col-form-label">{{ $t("common.label.login") }}</label>
        <div class="col-sm-10">
          <input type="email"
          class="form-control"
          id="login"
          maxlength="30"
          placeholder="login"
          @blur="validateEmail"
          v-model="credentials.login">
          <p v-show="emailWarning">{{emailWarning}}</p>
        </div>
      </div>
      <div class="form-group row">
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
      emailWarning: ''
    }
  },
  methods: {
    validateEmail () {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegex.test(this.credentials.login)) {
        this.emailWarning = this.$t('login.invalidLogin')
        return false
      }
      this.emailWarning = ''
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
