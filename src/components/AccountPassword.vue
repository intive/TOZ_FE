<template>
  <div>
    <form @submit.prevent class="loginForm" v-if="!volunteer.fetching">
      <div class="form-group" :class="{'has-danger': isWarning.old || volunteer.errorMessage}">
        <label for="oldPassword">{{ $t("accountPassword.oldPassword") }}</label>
        <input type="password"
               class="form-control"
               v-model="credentials.oldPassword"
               :placeholder="$t('accountPassword.oldPassword')"
               maxlength="30">
        <span class="is-danger" v-if="isEmpty.old">{{ $t("accountPassword.errors.required") }}</span>
        <br>
        <span class="is-danger" v-if="volunteer.errorMessage">{{ $t("accountPassword.errors.wrongPassword") }}</span>
      </div>
      <div class="form-group" :class="{'has-danger': isWarning.new || volunteer.errorMessage}">
        <label for="newPassword">{{ $t("accountPassword.newPassword") }}</label>
        <input type="password"
               class="form-control"
               v-model="credentials.newPassword"
               :placeholder="$t('accountPassword.newPassword')"
               maxlength="30">
        <span class="is-danger" v-if="isEmpty.new">{{ $t("accountPassword.errors.required") }}</span>
        <br>
        <span class="is-danger" v-if="!areEqual">{{ $t("accountPassword.errors.differentPasswords") }}</span>
        <br>
        <span class="is-danger" v-if="volunteer.errorMessage">{{ $t("accountPassword.errors.wrongPassword") }}</span>
      </div>
      <div class="form-group" :class="{'has-danger': isWarning.confirm || volunteer.errorMessage}">
        <label for="confirmNewPassword">{{ $t("accountPassword.confirmNewPassword") }}</label>
        <input type="password"
               class="form-control"
               v-model="credentials.confirmNewPassword"
               :placeholder="$t('accountPassword.confirmNewPassword')"
               maxlength="30">
        <span class="is-danger" v-if="isEmpty.confirm">{{ $t("accountPassword.errors.required") }}</span>
        <br>
        <span class="is-danger" v-if="!areEqual">{{ $t("accountPassword.errors.differentPasswords") }}</span>
        <br>
        <span class="is-danger" v-if="volunteer.errorMessage">{{ $t("accountPassword.errors.wrongPassword") }}</span>
      </div>
      <div class="form-group">
        <button type="submit"
                class="btn btn-outline-success my-2"
                @click="tryResetPassword">{{ $t('common.button.ok') }}</button>
        <button class="btn btn-outline-success my-2" @click="goBack">{{ $t('common.button.cancel') }}</button>
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
</style>
