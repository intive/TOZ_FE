<template>
  <div class="container">
    <div>
      <div class="alert alert-success" role="alert" v-if="formSend">
        {{ $t('help.form.sendMessage') }}
      </div>
      <form >
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 text-right">
            {{ $t('help.form.name') }}
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            <input type="text" class="inputField" 
              v-bind:class="{ inputFieldErrors: emptyName || errorsName }" 
              v-bind:placeholder="$t('help.form.name')" @blur="nameAndSurnameValidate(2, 'name')" maxlength="35"> 
            <p class="errors" v-if="emptyName">{{ $t('help.form.fieldRequired') }}</p>
            <p class="errors" v-if="errorsName">{{ $t('help.form.incorrectData') }}</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 text-right">
            {{ $t('help.form.surname') }}
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            <input type="text" class="inputField" 
              v-bind:class="{ inputFieldErrors: emptySurname || errorsSurname }" 
              v-bind:placeholder="$t('help.form.surname')" maxlength="35" @blur="nameAndSurnameValidate(3, 'surname')">
            <p class="errors" v-if="emptySurname">{{ $t('help.form.fieldRequired') }}</p>
            <p class="errors" v-if="errorsSurname">{{ $t('help.form.incorrectData') }}</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 text-right">
            {{ $t('help.form.phoneNumber') }}
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            <input type="number" class="inputField" 
              v-bind:class="{ inputFieldErrors: emptyPhoneNumber || errorsPhoneNumber }" 
              v-bind:placeholder="$t('help.form.phoneNumber')" maxlength="11" @blur="phoneValidate">
            <p class="errors" v-if="emptyPhoneNumber">{{ $t('help.form.fieldRequired') }}</p>
            <p class="errors" v-if="errorsPhoneNumber">{{ $t('help.form.incorrectData') }}</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 text-right">
            {{ $t('help.form.email') }}
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            <input type="email" class="inputField" 
              v-bind:class="{ inputFieldErrors: emptyEmail || errorsEmail }"
              v-bind:placeholder="$t('help.form.email')" maxlength="35" @blur="emailValidate">
            <p class="errors" v-if="emptyEmail">{{ $t('help.form.fieldRequired') }}</p>
            <p class="errors" v-if="errorsEmail">{{ $t('help.form.incorrectData') }}</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 radio-right">
            <input type="radio" v-bind:value="$t('help.form.becomeVolunteer')" v-model="picked" @change="radioFieldsValidate" @blur="radioFieldsValidate">
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            {{ $t('help.form.becomeVolunteer') }}
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6 col-md-6 col-xl-6 radio-right">
            <input type="radio" class="notSelected" v-bind:value="$t('help.form.becomeTemporaryHouse')" v-model="picked" @change="radioFieldsValidate" @blur="radioFieldsValidate">
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            {{ $t('help.form.becomeTemporaryHouse') }}
            <p class="errors" v-if="radioFields">{{ $t('help.form.fieldRequired') }}</p>
          </div>
        </div>
        <div class="row justify-content-center buttons">
          <div class="col-6 col-md-6 col-xl-6 radio-right">
            <router-link to="/help/info" class="btn btn-danger">{{ $t('help.form.cancel') }}</router-link>
          </div>
          <div class="col-6 col-md-6 col-xl-6 text-left">
            <button type="submit" class="btn btn-success" @click="sendForm">{{ $t('help.form.send') }}</button>
          </div>
        </div>
      </form>
      <router-link to="/help">{{ $t("help.back") }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'volunteer',
  data () {
    return {
      emptyName: false,
      errorsName: false,
      emptySurname: false,
      errorsSurname: false,
      errorsPhoneNumber: false,
      emptyPhoneNumber: false,
      emptyEmail: false,
      errorsEmail: false,
      formSend: false,
      radioFields: false,
      inputValue: '',
      picked: ''
    }
  },
  methods: {
    nameAndSurnameValidate (index, whichField, e) {
      const inputValue = document.getElementsByTagName('input')[index]
      const reg = /^[a-zA-Z]*$/
      if (!reg.test(inputValue.value)) {
        if (whichField === 'name') {
          this.errorsName = true
          this.emptyName = false
        } else {
          this.errorsSurname = true
          this.emptySurname = false
        }
      }
      if (inputValue.value.length === 0) {
        if (whichField === 'name') {
          this.errorsName = false
          this.emptyName = true
        } else {
          this.errorsSurname = false
          this.emptySurname = true
        }
      }
      if (reg.test(inputValue.value) && inputValue.value.length > 0) {
        if (whichField === 'name') {
          this.errorsName = false
          this.emptyName = false
        } else {
          this.errorsSurname = false
          this.emptySurname = false
        }
      }
    },
    phoneValidate (e) {
      const phoneNumber = document.getElementsByTagName('input')[4]
      if ((phoneNumber.value.length === 9) || (phoneNumber.value.length === 11)) {
        this.errorsPhoneNumber = false
        this.emptyPhoneNumber = false
      } else {
        this.errorsPhoneNumber = true
        this.emptyPhoneNumber = false
      }
      if (phoneNumber.value.length === 0) {
        this.emptyPhoneNumber = true
        this.errorsPhoneNumber = false
      }
    },
    emailValidate (e) {
      const email = document.getElementsByTagName('input')[5]
      const emailVal = email.value
      const reg = /^[a-zA-Z]{1}[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/
      if (!reg.test(emailVal)) {
        this.errorsEmail = true
        this.emptyEmail = false
      }
      if (emailVal.length === 0) {
        this.emptyEmail = true
        this.errorsEmail = false
      }
      if ((emailVal.length !== 0) && (reg.test(emailVal))) {
        this.emptyEmail = false
        this.errorsEmail = false
      }
    },
    radioFieldsValidate (e) {
      const volunteer = document.getElementsByTagName('input')[6].checked
      const temporaryHouse = document.getElementsByTagName('input')[7].checked
      if (!volunteer && !temporaryHouse) {
        this.radioFields = true
      } else {
        this.radioFields = false
      }
    },
    sendForm () {
      this.nameAndSurnameValidate(2, 'name')
      this.nameAndSurnameValidate(3, 'surname')
      this.phoneValidate()
      this.emailValidate()
      this.radioFieldsValidate()
      const condition = !this.radioFields && !this.emptyName && !this.errorsName && !this.emptySurname && !this.errorsSurname && !this.emptyPhoneNumber && !this.errorsPhoneNumber && !this.emptyEmail && !this.errorsEmail
      if (condition) {
        // HERE WE WILL BE SENDING A FORMS
        this.formSend = true
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
