<template>
  <div class="container">
    <form @submit.prevent>
      <div class="form-group row"
          :class="{'has-danger': emailWarning}">
        <div class="offset-lg-2 col-lg-8 col-xs-12">
          <p>{{ $t('resetPassword.message') }}</p>
          <label for="login">{{ $t('common.label.login') }}</label>
          <input type="email" name="login" class="form-control form-control-danger" maxlength="255" v-model="login">
          <p v-if="emailWarning">{{ $t('resetPassword.invalidLogin') }}</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-lg-12">
          <router-link to="/" class="btn cancelBtn">{{ $t('common.button.cancel') }}</router-link>
          <button type="submit" class="btn" @click="resetPassword">{{ $t('common.button.ok') }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  data () {
    return {
      login: '',
      emailWarning: false
    }
  },
  methods: {
    validateEmail () {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,15})+$/
      if (!emailRegex.test(this.login)) {
        this.emailWarning = true
        return false
      }
      this.emailWarning = false
      return true
    },
    resetPassword () {
      if (!this.validateEmail()) {
        return false
      }
      // TODO: make an API call
    }
  }
}
</script>

<style lang="sass">
  .cancelBtn
    text-decoration: none
    &:focus,
    &:hover
      color: #fff
</style>
