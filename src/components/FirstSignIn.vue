<template>
  <div class="container">
    <div class="loader"v-if="loading"></div>
    <h2 v-for="error in errors">{{ error.message }}</h2>
    <form id="accountActivationForm" @submit.prevent v-if="!loading">
      <div class="form-group row"
          :class="{'has-danger': emailWarning }">
        <label for="email" class="col-12 col-form-label">{{ $t("firstSignIn.label.email") }}</label>
        <div class="col-12 offset-lg-3 col-lg-6">
          <input type="email"
            class="form-control form-control-danger"
            id="email"
            maxlength="255"
            :placeholder="$t('firstSignIn.placeholder.email')"
            v-model="email"
            @blur="isEmailValid">
          <p v-if="emailWarning" class="text-danger">{{ emailWarning }}</p>
        </div>
      </div>
      <div class="form-group row"
          :class="{'has-danger': passwordWarning || confirmedPasswordWarning === $t('firstSignIn.message.differentPasswords') }">
        <label for="inputPassword" class="col-12 col-form-label">{{ $t("firstSignIn.label.password") }}</label>
        <div class="col-12 offset-lg-3 col-lg-6">
          <input type="password"
            class="form-control form-control-danger"
            id="inputPassword"
            maxlength="30"
            :placeholder="$t('firstSignIn.placeholder.password')"
            v-model="password"
            @blur="isPasswordValid">
          <p v-if="passwordWarning" class="text-danger">{{ passwordWarning }}</p>
        </div>
      </div>
      <div class="form-group row"
          :class="{'has-danger': confirmedPasswordWarning}">
        <label for="inputPassword2" class="col-12 col-form-label">{{ $t("firstSignIn.label.confirmPassword") }}</label>
        <div class="col-12 offset-lg-3 col-lg-6">
          <input type="password"
            class="form-control form-control-danger"
            id="inputPassword2"
            maxlength="30"
            :placeholder="$t('firstSignIn.placeholder.password')"
            v-model="confirmedPassword"
            @blur="isConfirmedPasswordValid">
          <p v-if="confirmedPasswordWarning" class="text-danger">{{ confirmedPasswordWarning }}</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-12">
          <a href="#" class="btn">{{ $t("common.button.cancel") }}</a>
          <button type="submit" class="btn" @click="activate">{{ $t("common.button.ok") }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['token'],
  data () {
    return {
      email: '',
      password: '',
      confirmedPassword: '',
      emailWarning: false,
      passwordWarning: '',
      confirmedPasswordWarning: '',
      errors: [],
      loading: false
    }
  },
  methods: {
    isEmailValid () {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,15})+$/
      if (!this.email) {
        this.emailWarning = this.$t('firstSignIn.message.inputRequired')
        return false
      } else if (!emailRegex.test(this.email)) {
        this.emailWarning = this.$t('firstSignIn.message.invalidEmail')
        return false
      }
      this.emailWarning = ''
      return true
    },
    isPasswordValid () {
      if (this.password) {
        this.passwordWarning = ''
        this.confirmedPassword && this.password !== this.confirmedPassword ? this.confirmedPasswordWarning = this.$t('firstSignIn.message.differentPasswords') : this.confirmedPasswordWarning = ''
      } else {
        this.passwordWarning = this.$t('firstSignIn.message.inputRequired')
        this.confirmedPasswordWarning = ''
      }
    },
    isConfirmedPasswordValid () {
      if (this.confirmedPassword) {
        this.password && this.password !== this.confirmedPassword ? this.confirmedPasswordWarning = this.$t('firstSignIn.message.differentPasswords') : this.confirmedPasswordWarning = ''
      } else {
        this.confirmedPasswordWarning = this.$t('firstSignIn.message.inputRequired')
      }
    },
    activate () {
      if (this.isEmailValid() && (this.password && !this.passwordWarning) && (this.confirmedPassword && !this.confirmedPasswordWarning)) {
        this.loading = true
        this.$http.post(this.apiUrl + '/users/register/activate', {
          email: this.email,
          password: this.password,
          token: this.token
        })
          .then(response => {
            this.loading = false
            this.$emit('accountActivated')
          })
          .catch(error => {
            this.errors.splice(0)
            this.loading = false
            if (error.response.data.message === 'Invalid token') {
              this.$emit('invalidToken')
            } else {
              this.errors.push(error)
            }
          })
      }
    }
  }
}
</script>

<style lang="sass">
  @import "../assets/styles/loader.css"

  #accountActivationForm
    margin-top: 100px
</style>
