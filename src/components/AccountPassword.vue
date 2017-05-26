<template>
  <div class="container">
    <div class="row icon-row">
      <div class="col-sm-12">
        <i class="fa fa-lock fa-5x" aria-hidden="true"></i>
      </div>
    </div>
    <form @submit.prevent class="loginForm" v-if="!volunteer.fetching">
      <div class="col-sm-6 offset-sm-3 form-group" :class="{ 'has-danger': isWarning.old || volunteer.errorMessage }">
        <input type="password"
               class="form-control"
               :class="{ 'form-control-danger': isWarning.old || volunteer.errorMessage }"
               id="oldPassword"
               v-model="credentials.oldPassword"
               :placeholder="$t('accountPassword.oldPassword')"
               maxlength="30">
        <div class="form-control-feedback" v-if="isEmpty.old">{{ $t("accountPassword.errors.required") }}</div>
        <div class="form-control-feedback" v-if="volunteer.errorMessage">{{ $t("accountPassword.errors.wrongPassword") }}</div>
      </div>
      <div class="col-sm-6 offset-sm-3 form-group" :class="{'has-danger': isWarning.new || volunteer.errorMessage}">
        <input type="password"
               class="form-control"
               :class="{ 'form-control-danger': isWarning.new || volunteer.errorMessage }"
               id="newPassword"
               v-model="credentials.newPassword"
               :placeholder="$t('accountPassword.newPassword')"
               maxlength="30">
        <div class="form-control-feedback" v-if="isEmpty.new">{{ $t("accountPassword.errors.required") }}</div>
        <div class="form-control-feedback" v-if="!areEqual">{{ $t("accountPassword.errors.differentPasswords") }}</div>
        <div class="form-control-feedback" v-if="volunteer.errorMessage">{{ $t("accountPassword.errors.wrongPassword") }}</div>
      </div>
      <div class="col-sm-6 offset-sm-3 form-group" :class="{'has-danger': isWarning.confirm || volunteer.errorMessage}">
        <input type="password"
               class="form-control"
               :class="{ 'form-control-danger': isWarning.confirm || volunteer.errorMessage }"
               id="confirmNewPassword"
               v-model="credentials.confirmNewPassword"
               :placeholder="$t('accountPassword.confirmNewPassword')"
               maxlength="30">
        <div class="form-control-feedback" v-if="isEmpty.confirm">{{ $t("accountPassword.errors.required") }}</div>
        <div class="form-control-feedback" v-if="!areEqual">{{ $t("accountPassword.errors.differentPasswords") }}</div>
        <div class="form-control-feedback" v-if="volunteer.errorMessage">{{ $t("accountPassword.errors.wrongPassword") }}</div>
      </div>
      <div class="col-sm-6 offset-sm-3 form-group buttons">
        <button type="submit"
                class="btn"
                @click="tryResetPassword">{{ $t('common.button.ok') }}</button>
        <button class="btn" @click="goBack">{{ $t('common.button.cancel') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
  import auth from '../auth.js'

  export default {
    name: 'AccountPassword',
    data () {
      return {
        credentials: {
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        },
        areEqual: true,
        isWarning: {
          old: false,
          new: false,
          confirm: false
        },
        isEmpty: {
          old: false,
          new: false,
          confirm: false
        },
        volunteer: auth.user
      }
    },
    created () {
      this.volunteer.errorMessage = ''
    },
    methods: {
      areInputsEmpty () {
        if (this.credentials.oldPassword === '') {
          this.isEmpty.old = true
          this.isWarning.old = true
        } else {
          this.isEmpty.old = false
          this.isWarning.old = false
        }

        if (this.credentials.newPassword === '') {
          this.isEmpty.new = true
          this.isWarning.new = true
        } else {
          this.isEmpty.new = false
          this.isWarning.new = false
        }

        if (this.credentials.confirmNewPassword === '') {
          this.isEmpty.confirm = true
          this.isWarning.confirm = true
        } else {
          this.isEmpty.confirm = false
          this.isWarning.confirm = false
        }
      },
      areInputsEqual () {
        if (!this.isEmpty.new && !this.isEmpty.confirm) {
          if (this.credentials.newPassword !== this.credentials.confirmNewPassword) {
            this.areEqual = false
            this.isWarning.new = true
            this.isWarning.confirm = true
          } else {
            this.areEqual = true
            this.isWarning.new = false
            this.isWarning.confirm = false
          }
        }
      },
      anyError () {
        if (this.isEmpty.old || this.isEmpty.new || this.isEmpty.confirm || !this.areEqual) {
          return true
        } else {
          return false
        }
      },
      tryResetPassword () {
        const credentials = {
          oldPassword: this.credentials.oldPassword,
          token: sessionStorage.getItem('token'),
          newPassword: this.credentials.newPassword
        }

        this.areInputsEmpty()
        this.areInputsEqual()

        if (!this.anyError()) {
          auth.changePassword(this, credentials)
        }
      },
      goBack () {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="sass">

  $grey: #a8a8a8

  @mixin placeholder()
    input::-webkit-input-placeholder
      @content
    input:-moz-placeholder
      @content
    input::-moz-placeholder
      @content
    input:-ms-input-placeholder
      @content

  .type-style
    font-size: 15px
    font-family: sans-serif
    letter-spacing: 1px

  @include placeholder()
    color: $grey
    @extend .type-style

  .icon-row
    margin-top: 2em
  .loginForm
    margin-top: 3em
  .container
    font-size: 1.8em
  .buttons
    margin-top: 2em
</style>
