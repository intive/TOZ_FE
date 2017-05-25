<template>
  <FirstSignIn v-if="!invalidToken"
              :token="token"
              @invalidToken="invalidToken = true"
              @accountActivated="activated = true">
  </FirstSignIn>
  <ActivationLinkExpired v-else-if="invalidToken"></ActivationLinkExpired>
  <AccountActivated v-else-if="activated"></AccountActivated>
</template>

<script>
import ActivationLinkExpired from './ActivationLinkExpired'
import FirstSignIn from './FirstSignIn'
import AccountActivated from './AccountActivated'

export default {
  data () {
    return {
      token: this.$route.query.token,
      invalidToken: false,
      activated: false
    }
  },
  components: {
    ActivationLinkExpired,
    FirstSignIn,
    AccountActivated
  }
}
</script>
