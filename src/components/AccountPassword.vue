<template>
  <div class="container">
    <form @submit.prevent class="loginForm" v-if="!volunteer.fetching">
      <div class="form-group row label" :class="{'has-danger': isWarning.old || volunteer.errorMessage}">
        <label for="oldPassword" class="col-sm-2 col-form-label">{{ $t("accountPassword.oldPassword") }}</label>
        <div class="col-sm-10">
          <input type="password"
                 class="form-control"
                 id="oldPassword"
                 v-model="credentials.oldPassword"
                 :placeholder="$t('accountPassword.oldPassword')"
                 maxlength="30">
          <span class="is-danger" v-if="isEmpty.old">{{ $t("accountPassword.errors.required") }}</span>
          <br>
          <span class="is-danger" v-if="volunteer.errorMessage">{{ $t("accountPassword.errors.wrongPassword") }}</span>
        </div>
      </div>
      <div class="form-group row label2" :class="{'has-danger': isWarning.new || volunteer.errorMessage}">
        <label for="newPassword" class="col-sm-2 col-form-label">{{ $t("accountPassword.newPassword") }}</label>
        <div class="col-sm-10">
          <input type="password"
                 class="form-control"
                 id="newPassword"
                 v-model="credentials.newPassword"
                 :placeholder="$t('accountPassword.newPassword')"
                 maxlength="30">
          <span class="is-danger" v-if="isEmpty.new">{{ $t("accountPassword.errors.required") }}</span>
          <br>
          <span class="is-danger" v-if="!areEqual">{{ $t("accountPassword.errors.differentPasswords") }}</span>
          <br>
          <span class="is-danger" v-if="volunteer.errorMessage">{{ $t("accountPassword.errors.wrongPassword") }}</span>
        </div>
      </div>
      <div class="form-group row label2" :class="{'has-danger': isWarning.confirm || volunteer.errorMessage}">
        <label for="confirmNewPassword" class="col-sm-2 col-form-label">{{ $t("accountPassword.confirmNewPassword") }}</label>
        <div class="col-sm-10">
          <input type="password"
                 class="form-control"
                 id="confirmNewPassword"
                 v-model="credentials.confirmNewPassword"
                 :placeholder="$t('accountPassword.confirmNewPassword')"
                 maxlength="30">
          <span class="is-danger" v-if="isEmpty.confirm">{{ $t("accountPassword.errors.required") }}</span>
          <br>
          <span class="is-danger" v-if="!areEqual">{{ $t("accountPassword.errors.differentPasswords") }}</span>
          <br>
          <span class="is-danger" v-if="volunteer.errorMessage">{{ $t("accountPassword.errors.wrongPassword") }}</span>
        </div>
      </div>
      <div class="form-group offset-sm-2 col-sm-10">
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
          } else {
            this.areEqual = true
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
  .is-danger
    font-size: 14px
    color: red
  .label
    margin-bottom: 0
  .label2
    margin-bottom: -15px
</style>
