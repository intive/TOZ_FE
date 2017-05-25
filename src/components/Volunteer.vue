<template>
  <div class="container">
    <div>
      <span class="icon-stack">
        <i class="icon-chevron-down"></i>
      </span>

      <!-- Success modal -->
      <modals v-if="formSend && errors.length === 0" :isError="false">
       <p slot="header">
         <span class="fa fa-chevron-down okIcon"></span>
         {{ $t('volunteer.submissionSent') }}
         <button type="button" class="close" @click="closeModal">&times;</button>
       </p>
      </modals>

      <!-- Failed modal -->
      <modals v-if="formSend && errors.length > 0" :isError="true">
        <p slot="header">
          <span class="fa fa-question errorIcon"></span>
          {{ $t('volunteer.submissionFailed') }}
          <button type="button" class="close" @click="closeModal">&times;</button>
        </p>
      </modals>

      <div class="row navigation">
        <span class="grayText spanProperties">{{ $t('volunteer.home') }} / {{ $t('volunteer.help') }} / </span><span class="darkGrayText spanProperties">{{ $t('volunteer.becomeVolunteer') }}</span>
      </div>

      <form >
        <!-- Name input field -->
        <div class="form-group row align-items-start"
             v-bind:class="[ nameError ? 'has-danger' : (nameOk ? 'has-success' : '') ]">
          <label for="nameInput" class="col-4 col-form-label text-right labelProperties">{{ $t('volunteer.name') }}</label>
          <div class="col-5">
            <input type="text" class="form-control form-control-lg form-control-success form-control-danger" id="nameInput"
                   @blur="nameValidate"
                   v-model="nameValue"
                   maxlength="35">
            <div class="form-control-feedback text-left">{{ nameError }}</div>
          </div>
        </div>

        <!-- Surname input field -->
        <div class="form-group row align-items-start"
             v-bind:class="[ surnameError ? 'has-danger' : (surnameOk ? 'has-success' : '') ]">
          <label for="surnameInput" class="col-4 col-form-label text-right labelProperties">{{ $t('volunteer.surname') }}</label>
          <div class="col-5">
            <input type="text" class="form-control form-control-lg form-control-success form-control-danger" id="surnameInput"
                   @blur="surnameValidate"
                   v-model="surnameValue"
                   maxlength="35">
            <div class="form-control-feedback text-left">{{ surnameError }}</div>
          </div>
        </div>

        <!-- Phone number input field -->
        <div class="form-group row align-items-start"
             v-bind:class="[ phoneError ? 'has-danger' : (phoneOk ? 'has-success' : '') ]">
          <label for="phoneInput" class="col-4 col-form-label text-right labelProperties">{{ $t('volunteer.phoneNumber') }}</label>
          <div class="col-5">
            <input type="number" class="form-control form-control-lg form-control-success form-control-danger" id="phoneInput"
                   @blur="phoneValidate"
                   v-model="phoneNumber"
                   maxlength="11">
            <div class="form-control-feedback text-left">{{ phoneError }}</div>
          </div>
        </div>

        <!-- Email input field -->
        <div class="form-group row align-items-start"
             v-bind:class="[ emailError ? 'has-danger' : (emailOk ? 'has-success' : '') ]">
          <label for="emailInput" class="col-4 col-form-label text-right labelProperties">{{ $t('volunteer.email') }}</label>
          <div class="col-5">
            <input type="text" class="form-control form-control-lg form-control-success form-control-danger" id="emailInput"
                   @blur="emailValidate"
                   v-model="emailValue"
                   maxlength="35">
            <div class="form-control-feedback text-left">{{ emailError }}</div>
          </div>
        </div>

        <!-- Radio fields -->
        <div class="form-group row align-items-start topMargin"
        v-bind:class="[ radioFields ? 'has-danger' : '' ]">
          <label for="becomeVolunteer" class="col-4 col-form-label text-right labelProperties">{{ $t('volunteer.target') }}</label>
          <div class="col-5 text-left">
            <div>
              <input type="radio"
                     id="becomeVolunteer"
                     class="radioInputs"
                     v-bind:value="$t('volunteer.becomeVolunteer')"
                     v-model="picked" @change="radioFieldsValidate">
              <label for="becomeVolunteer" class="radioLabel labelProperties">{{ $t('volunteer.becomeVolunteer') }}</label>
            </div>

            <div>
              <input type="radio"
                     id="becomeTemporaryHouse"
                     class="radioInputs"
                     v-bind:value="$t('volunteer.becomeTemporaryHouse')"
                     v-model="picked" @change="radioFieldsValidate">
              <label for="becomeTemporaryHouse" class="radioLabel labelProperties">{{  $t('volunteer.becomeTemporaryHouse') }}</label>
            </div>
            <div class="form-control-feedback text-left" v-if="radioFields">{{ $t('volunteer.fieldRequired') }}</div>
          </div>
        </div>

        <!-- Sent and Cancel buttons -->
        <div class="row align-items-start buttons">
          <div class="col-9 text-right">
            <router-link to="/help-info" class="btn btnCancel">{{ $t('volunteer.cancel') }}</router-link>
          </div>
          <div class="col-3 text-left">
            <button type="button" class="btn btnSent" @click="sendForm" v-if="!loading">{{ $t('volunteer.sent') }}</button>
            <div class="loadingBtn" v-if="loading">
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
        } else if (!this.nameValue.length) {
          this.nameError = this.$t('volunteer.fieldRequired')
        } else if (reg.test(this.nameValue) && this.nameValue.length) {
          this.nameError = ''
          this.nameOk = true
        }
        return this.nameError
      },
      surnameValidate () {
        const reg = /^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż]*$/
        if (!reg.test(this.surnameValue)) {
          this.surnameError = this.$t('volunteer.incorrectData')
        } else if (!this.surnameValue.length) {
          this.surnameError = this.$t('volunteer.fieldRequired')
        } else if (reg.test(this.surnameValue) && this.surnameValue.length) {
          this.surnameError = ''
          this.surnameOk = true
        }
        return this.surnameError
      },
      phoneValidate () {
        if ((this.phoneNumber.length === 9) || (this.phoneNumber.length === 11)) {
          this.phoneError = ''
          this.phoneOk = true
        } else if (!this.phoneNumber.length) {
          this.phoneError = this.$t('volunteer.fieldRequired')
        } else {
          this.phoneError = this.$t('volunteer.incorrectData')
        }
        return this.phoneError
      },
      emailValidate () {
        const reg = /^[a-zA-Z]{1}[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/
        if (!this.emailValue.length) {
          this.emailError = this.$t('volunteer.fieldRequired')
        } else if (!reg.test(this.emailValue)) {
          this.emailError = this.$t('volunteer.incorrectData')
        } else if ((this.emailValue.length) && (reg.test(this.emailValue))) {
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
  .labelProperties {
    font-size: 1.8em;
  }
  .spanProperties {
    font-size: 1.8em;
  }
  .navigation {
    margin: 8em 0;
  }
  .buttons {
    padding: 1.6em;
  }
  .radioInputs {
    display: none;
  }
  .radioLabel {
    padding-left: 3em;
  }
  .radioLabel:before {
    content: '';
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
    border-radius: 0.7em;
    margin: 0 1em 0 1em;
    position: absolute;
    left: 0;
    background-color: #fff;
    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, .7), 0px 0px 2px rgba(255, 255, 255, .8);
  }
  .radioInputs:checked + .radioLabel:before {
    content: '';
    background-color: #4cd374;
    border-radius: 50%;
    border: 0.2em solid #fff;
    box-shadow: 0 0 10px #888888;
  }
  .okIcon {
    color: #4cd374;
    font-size: 2em;
    padding-right: 1em;
  }
  .errorIcon {
    margin-right: 1em;
    color: #f54b5e;
    font-size: 1.4em;
    padding: 0.1em 0.3em;
    border: 0.1em solid #f54b5e;
    border-radius: 50%;
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
  .loadingBtn {
    background-color: #FFAF4F;
    border-radius: 0.3em;
    width: 14.858em;
    height: 5.1em;
    margin-left: -2.8em;
    padding: 0.5em 0 0 5.3em;
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
