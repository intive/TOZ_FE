<template>
  <div class="container">
    <div>
      <div class="alert alert-success" role="alert" v-if="formSend">
        {{ $t('help.form.sendMessage') }}
      </div>
      <form >
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 text-right">
            {{ $t('volunteer.name') }}
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            <input type="text" class="inputField"
              v-bind:class="{ inputFieldErrors: nameError }"
              v-bind:placeholder="$t('volunteer.name')"
              @blur="nameAndSurnameValidate(true)"
              v-model="nameValue"
              maxlength="35">
            <p class="errors" v-if="nameError">{{ nameError }}</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 text-right">
            {{ $t('volunteer.surname') }}
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            <input type="text" class="inputField"
              v-bind:class="{ inputFieldErrors: surnameError }"
              v-bind:placeholder="$t('volunteer.surname')"
              @blur="nameAndSurnameValidate(false)"
              v-model="surnameValue"
              maxlength="35">
            <p class="errors" v-if="surnameError">{{ surnameError }}</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 text-right">
            {{ $t('volunteer.phoneNumber') }}
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            <input type="number" class="inputField"
              v-bind:class="{ inputFieldErrors: phoneError }"
              v-bind:placeholder="$t('volunteer.phoneNumber')"
              @blur="phoneValidate"
              v-model="phoneNumber"
              maxlength="11" >
            <p class="errors" v-if="phoneError">{{ phoneError }}</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 text-right">
            {{ $t('volunteer.email') }}
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            <input type="email" class="inputField"
              v-bind:class="{ inputFieldErrors: emailError }"
              v-bind:placeholder="$t('volunteer.email')"
              v-model="emailValue"
              @blur="emailValidate"
              maxlength="35" >
            <p class="errors" v-if="emailError">{{ emailError }}</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 radio-right">
            <input type="radio" v-bind:value="$t('volunteer.becomeVolunteer')" v-model="picked" @change="radioFieldsValidate" @blur="radioFieldsValidate">
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            {{ $t('volunteer.becomeVolunteer') }}
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 radio-right">
            <input type="radio" class="notSelected" v-bind:value="$t('volunteer.becomeTemporaryHouse')" v-model="picked" @change="radioFieldsValidate" @blur="radioFieldsValidate">
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            {{ $t('volunteer.becomeTemporaryHouse') }}
            <p class="errors" v-if="radioFields">{{ $t('volunteer.fieldRequired') }}</p>
          </div>
        </div>
        <div class="row justify-content-center buttons">
          <div class="col-6 col-md-6 col-xl-6 radio-right">
            <router-link to="/help/info" class="btn btn-danger">{{ $t('volunteer.cancel') }}</router-link>
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            <button type="button" class="btn btn-success" @click="sendForm">{{ $t('volunteer.send') }}</button>
          </div>
        </div>
      </form>
      <router-link to="/help/info">{{ $t("common.back") }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'volunteer',
  data () {
    return {
      formSend: false,
      radioFields: false,
      picked: false,
      nameValue: '',
      surnameValue: '',
      phoneNumber: '',
      emailValue: '',
      nameError: '',
      surnameError: '',
      phoneError: '',
      emailError: ''
    }
  },
  methods: {
    nameAndSurnameValidate (whichField) {
      const reg = /^[a-zA-Z]*$/
      let inputValue = ''
      whichField ? inputValue = this.nameValue : inputValue = this.surnameValue
      if (!reg.test(inputValue)) {
        whichField ? this.nameError = this.$t('volunteer.incorrectData')
        : this.surnameError = this.$t('volunteer.incorrectData')
      } else if (inputValue.length === 0) {
        whichField ? this.nameError = this.$t('volunteer.fieldRequired')
        : this.surnameError = this.$t('volunteer.fieldRequired')
      } else if (reg.test(inputValue) && inputValue.length > 0) {
        whichField ? this.nameError = '' : this.surnameError = ''
      }
      if (whichField) {
        return this.nameError
      } else {
        return this.surnameError
      }
    },
    phoneValidate () {
      if ((this.phoneNumber.length === 9) || (this.phoneNumber.length === 11)) {
        this.phoneError = ''
      } else if (this.phoneNumber.length === 0) {
        this.phoneError = this.$t('volunteer.fieldRequired')
      } else {
        this.phoneError = this.$t('volunteer.incorrectData')
      }
      return this.phoneError
    },
    emailValidate () {
      const reg = /^[a-zA-Z]{1}[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/
      if (this.emailValue.length === 0) {
        this.emailError = this.$t('volunteer.fieldRequired')
      } else if (!reg.test(this.emailValue)) {
        this.emailError = this.$t('volunteer.incorrectData')
      } else if ((this.emailValue.length !== 0) && (reg.test(this.emailValue))) {
        this.emailError = ''
      }
      return this.emailError
    },
    radioFieldsValidate (e) {
      let volunteer = false
      let temporaryHouse = false
      if (this.picked === this.$t('volunteer.becomeVolunteer')) {
        volunteer = true
      } else if (this.picked === this.$t('volunteer.becomeTemporaryHouse')) {
        temporaryHouse = true
      }
      if (!volunteer && !temporaryHouse) {
        this.radioFields = true
      } else {
        this.radioFields = false
      }
      return this.radioFields
    },
    sendForm () {
      if (!this.nameAndSurnameValidate(true)) {
        if (!this.nameAndSurnameValidate(false)) {
          if (!this.phoneValidate()) {
            if (!this.emailValidate()) {
              if (!this.radioFieldsValidate()) {
                // TODO: HERE WE WILL BE SENDING A FORMS
                this.formSend = true
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.buttons {
  padding: 1em;
}
.radio-right {
  text-align: right;
}
.text-right {
  padding-top: 0.8em;
}
.inputField {
  margin: 0.5em;
  padding: 0.5em;
  border: 0.1em solid #ddd;
  border-radius: 0.5em;
  outline: none;
}
.inputField:focus {
  -webkit-box-shadow: 0em 0em 0.5em 0em rgba(0,72,255,1);
  -moz-box-shadow: 0em 0em 0.5em 0em rgba(0,72,255,1);
  box-shadow: 0em 0em 0.5em 0em rgba(0,72,255,1);
}
.errors {
  color: red;
}
.inputFieldErrors {
  background-color: #f7aaaa;
  border-color: red;
}
.inputFieldErrors:focus {
  -webkit-box-shadow: 0em 0em 0.5em 0em rgba(255,0,34,1);
  -moz-box-shadow: 0em 0em 0.5em 0em rgba(255,0,34,1);
  box-shadow: 0em 0em 0.5em 0em rgba(255,0,34,1);
}
</style>
