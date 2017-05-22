<template>
  <div class="container viewProperties">
    <div>
      <modals v-if="formSend && errors.length === 0" :isError="false">
       <p slot="header" class="sendMessage">
         <img src="../assets/ok.png" class="okImg" />
         {{ $t('volunteer.submissionSent') }}
         <button type="button" class="close" @click="closeModal">&times;</button>
       </p>
      </modals>

      <modals v-if="formSend && errors.length > 0" :isError="true">
        <p slot="header" class="sendMessage">
          <img src="../assets/error.png" class="errorImg" />
          {{ $t('volunteer.submissionFailed') }}
          <button type="button" class="close" @click="closeModal">&times;</button>
        </p>
      </modals>

      <div class="row navigation">
        <span class="grayText">{{ $t('volunteer.home') }} / {{ $t('volunteer.help') }} / </span><span class="darkGrayText">{{ $t('volunteer.becomeVolunteer') }}</span>
      </div>

      <form >
        <div class="row align-items-start">
          <div class="col-4 col-md-4 col-xl-4 text-right">
            {{ $t('volunteer.name') }}
          </div>
          <div class="col-5 col-md-5 col-xl-5 text-left">
            <input type="text" class="inputField"
                   v-bind:class="{ inputFieldErrors: nameError, inputFieldOk: nameOk }"
                   @blur="nameValidate"
                   v-model="nameValue"
                   maxlength="35">
            <span class="errors" v-if="nameError">{{ nameError }}</span>
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-4 col-md-4 col-xl-4 text-right">
            {{ $t('volunteer.surname') }}
          </div>
          <div class="col-5 col-md-5 col-xl-5 text-left">
            <input type="text" class="inputField"
                   v-bind:class="{ inputFieldErrors: surnameError, inputFieldOk: surnameOk }"
                   @blur="surnameValidate"
                   v-model="surnameValue"
                   maxlength="35">
            <span class="errors" v-if="surnameError">{{ surnameError }}</span>
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-4 col-md-4 col-xl-4 text-right">
            {{ $t('volunteer.phoneNumber') }}
          </div>
          <div class="col-5 col-md-5 col-xl-5 text-left">
            <input type="number" class="inputField"
                   v-bind:class="{ inputFieldErrors: phoneError, inputFieldOk: phoneOk }"
                   @blur="phoneValidate"
                   v-model="phoneNumber"
                   maxlength="11" >
            <span class="errors" v-if="phoneError">{{ phoneError }}</span>
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-4 col-md-4 col-xl-4 text-right">
            {{ $t('volunteer.email') }}
          </div>
          <div class="col-5 col-md-5 col-xl-5 text-left">
            <input type="email" class="inputField"
                   v-bind:class="{ inputFieldErrors: emailError, inputFieldOk: emailOk }"
                   v-model="emailValue"
                   @blur="emailValidate"
                   maxlength="255" >
            <span class="errors" v-if="emailError">{{ emailError }}</span>
          </div>
        </div>

        <div class="row align-items-start topMargin">
          <div class="col-4 col-md-4 col-xl-4 radio-right">
            {{ $t('volunteer.target') }}
          </div>
          <div class="col-5 col-md-5 col-xl-5 text-left">
            <div>
              <input type="radio"
                     id="becomeVolunteer"
                     class="radioInputs"
                     v-bind:value="$t('volunteer.becomeVolunteer')"
                     v-model="picked" @change="radioFieldsValidate">
              <label for="becomeVolunteer">{{ $t('volunteer.becomeVolunteer') }}</label>
            </div>

            <div>
              <input type="radio"
                     id="becomeTemporaryHouse"
                     class="radioInputs"
                     v-bind:value="$t('volunteer.becomeTemporaryHouse')"
                     v-model="picked" @change="radioFieldsValidate">
              <label for="becomeTemporaryHouse">{{  $t('volunteer.becomeTemporaryHouse') }}</label>
            </div>
            <span class="errors" v-if="radioFields">{{ $t('volunteer.fieldRequired') }}</span>
          </div>
        </div>

        <div class="row align-items-start buttons">
          <div class="col-9 col-md-9 col-xl-9 radio-right">
            <router-link to="/help-info" class="btn btnCancel">{{ $t('volunteer.cancel') }}</router-link>
          </div>
          <div class="col-3 col-md-3 col-xl-3 text-left">
            <button type="button" class="btn btnSent" @click="sendForm" v-if="!loading">{{ $t('volunteer.send') }}</button>
            <div class="example" v-if="loading">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Modals from './Modals'
  export default {
    name: 'volunteer',
    data () {
      return {
        loading: false,
        formSend: false,
        radioFields: false,
        picked: false,
        nameValue: '',
        surnameValue: '',
        phoneNumber: '',
        emailValue: '',
        nameError: '',
        nameOk: false,
        surnameError: '',
        surnameOk: false,
        phoneError: '',
        phoneOk: false,
        emailError: '',
        emailOk: false,
        errors: []
      }
    },
    components: {
      Modals
    },
    methods: {
      nameValidate () {
        const reg = /^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż]*$/
        if (!reg.test(this.nameValue)) {
          this.nameError = this.$t('volunteer.incorrectData')
        } else if (this.nameValue.length === 0) {
          this.nameError = this.$t('volunteer.fieldRequired')
        } else if (reg.test(this.nameValue) && this.nameValue.length > 0) {
          this.nameError = ''
          this.nameOk = true
        }
        return this.nameError
      },
      surnameValidate () {
        const reg = /^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż]*$/
        if (!reg.test(this.surnameValue)) {
          this.surnameError = this.$t('volunteer.incorrectData')
        } else if (this.surnameValue.length === 0) {
          this.surnameError = this.$t('volunteer.fieldRequired')
        } else if (reg.test(this.surnameValue) && this.surnameValue.length > 0) {
          this.surnameError = ''
          this.surnameOk = true
        }
        return this.surnameError
      },
      phoneValidate () {
        if ((this.phoneNumber.length === 9) || (this.phoneNumber.length === 11)) {
          this.phoneError = ''
          this.phoneOk = true
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
          this.emailOk = true
        }
        return this.emailError
      },
      radioFieldsValidate () {
        if (this.picked) {
          this.radioFields = false
        } else {
          this.radioFields = true
        }
        return this.radioFields
      },
      sendForm () {
        if (!this.nameValidate() &&
          !this.surnameValidate() &&
          !this.phoneValidate() &&
          !this.emailValidate() &&
          !this.radioFieldsValidate()) {
          this.loading = true
          this.$http.post(this.apiUrl + 'proposals', {
            name: this.nameValue,
            surname: this.surnameValue,
            phoneNumber: this.phoneNumber,
            email: this.emailValue,
            roles: [
              'VOLUNTEER'
            ]
          })
            .then(response => {
              this.formSend = true
              this.loading = false
            })
            .catch(e => {
              this.errors.push(e)
              this.formSend = true
              this.loading = false
            })
        }
      },
      closeModal () {
        this.formSend = !this.formSend
      }
    }
  }
</script>

<style scoped>
  .viewProperties {
    font-size: 1.8em;
  }
  .sendMessage {
    font-size: 1em;
  }
  .navigation {
    margin: 4.4em 0;
  }
  .buttons {
    padding: 1.6em;
  }
  .radio-right {
    text-align: right;
  }
  .text-right {
    padding-top: 1.8em;
  }
  .inputField {
    margin: 1em;
    padding: 0.8em;
    border: 0.1em solid #ddd;
    border-radius: 0.2em;
    width: 23em;
    outline: none;
  }
  .inputField:focus {
    border: 0.1em solid rgba(0,72,255,1);
  }
  .errors {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 2em;
    font-size: 0.7em;
    color: red;
    display: block;
  }
  .inputFieldErrors {
    margin: 1em 1em 0 1em;
    background: url('../assets/error_form.png') no-repeat scroll 20em 0.7em;
  }
  .inputFieldOk {
    margin: 1em;
    background: url('../assets/ok_form.png') no-repeat scroll 20em 0.7em;
  }
  .radioInputs {
    display: none;
  }
  label {
    padding-left: 3em;
  }
  label:before {
    content: '';
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
    border-radius: 0.7em;
    margin: 0 1em 0 2em;
    position: absolute;
    left: 0;
    background-color: #fff;
    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, .7), 0px 0px 2px rgba(255, 255, 255, .8);
  }
  input[type=radio]:checked + label:before {
    content: '';
    background: url('../assets/radio.png') no-repeat;
  }
  .okImg {
    margin-right: 2.5em;
  }
  .errorImg {
    margin-right: 1.5em;
  }
  .topMargin {
    margin-top: 1em;
  }

  .grayText {
    color: #B9B9B9;
  }
  .darkGrayText {
    color: #363636;
    font-weight: bold;
  }
  .btnSent {
    margin-left: -2em;
  }
  .btnCancel {
    background-color: #fff;
    color: #000;
  }
  .example {
    background-color: #FFAF4F;
    border-radius: 0.23em;
    width: 8.23em;
    height: 2.84em;
    margin-left: -1.5em;
    padding: 0.3em 0 0 2.9em;
  }

  .loader {
    border: 0.3em solid #b9b9b9;
    border-top: 0.3em solid #363636;
    border-radius: 50%;
    width: 1.6em;
    height: 1.6em;
    margin: 0;
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
