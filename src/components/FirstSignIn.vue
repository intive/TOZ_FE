<template>
  <div class="container">
    <form @submit.prevent>
      <div class="form-group row"
            :class="{'has-danger': passwordWarning || confirmedPasswordWarning === $t('firstSignIn.message.differentPasswords') }">
        <label for="inputPassword" class="col-sm-2 col-form-label">{{ $t("firstSignIn.label.password") }}</label>
        <div class="col-sm-10">
          <input type="password"
                class="form-control"
                id="inputPassword"
                maxlength="30"
                :placeholder="$t('firstSignIn.placeholder')"
                v-model="password"
                @blur="isPasswordValid">
          <p if="passwordWarning" class="text-danger">{{ passwordWarning }}</p>
        </div>
      </div>
      <div class="form-group row"
            :class="{'has-danger': confirmedPasswordWarning}">
        <label for="inputPassword2" class="col-sm-2 col-form-label">{{ $t("firstSignIn.label.confirmPassword") }}</label>
        <div class="col-sm-10">
          <input type="password"
                class="form-control"
                id="inputPassword2"
                maxlength="30"
                :placeholder="$t('firstSignIn.placeholder')"
                v-model="confirmedPassword"
                @blur="isConfirmedPasswordValid">
          <p if="confirmedPasswordWarning" class="text-danger">{{ confirmedPasswordWarning }}</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="offset-sm-2 col-sm-10">
          <a href="#">{{ $t("common.button.cancel") }}</a>
          <button type="submit" class="btn">{{ $t("common.button.ok") }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      confirmedPassword: '',
      passwordWarning: '',
      confirmedPasswordWarning: ''
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="sass" scoped>
  form
    margin-top: 100px
</style>