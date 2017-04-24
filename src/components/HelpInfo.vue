<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-12 col-xl-12">
        {{ howBeVolunteer.content }}
      </div>
      <div class="col-12 col-md-12 col-xl-12" v-if="errors">
        <h3 v-for="error in errors">{{ error.message }}</h3>
      </div>
      <router-link to="/volunteer" class="btn btn-primary goToForm">{{ $t('help.goToForm') }}</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
export default {
  name: 'transferData',
  data () {
    return {
      howBeVolunteer: [],
      errors: []
    }
  },
  created () {
    const mock = new MockAdapter(axios)
    mock.onGet('/info').reply(200, {
      info: {
        'content': 'Tutaj znajdować się będzie informacja o tym jak zostać wolontariuszem TOZ'
      }
    })
    this.$http.get('/info')
      .then(response => {
        this.howBeVolunteer = response.data.info
      })
      .catch(error => {
        this.errors.push(error)
      })
  }
}
</script>

<style scoped>
.goToForm {
  margin-top: 2em;
}
</style>
