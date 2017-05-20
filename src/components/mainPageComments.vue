<template>
  <div class="container news-item clearfix">
    <div v-if="loading" class="loader"></div>
    <div class="errors" v-if="errors.length">
      <h6 v-for="error of errors">{{ error.message }}</h6>
    </div>
    <div>
      <div class="news-date">
        {{ $t('news.added') }} {{ convertTimeStamp }}
      </div>
      <h6 class="news-title">
        {{currentUser.name}} {{currentUser.surname}}
      </h6>
      <h6>
        <router-link :to="{name: 'petDetails', params: { id: comment.petUuid }}" class="news-title">
        {{ comment.contents }}
        </router-link>
      </h6>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        currentUser: {
          name: '',
          surname: ''
        },
        loading: true,
        errors: []
      }
    },
    props: ['comment'],
    computed: {
      convertTimeStamp () {
        const date = moment(this.comment.created).locale(this.$t('common.code'))
        return date.format(this.$t('common.dateFormat'))
      }
    },
    created () {
      this.$http.get(this.apiUrl + 'users/' + this.comment.userUuid)
        .then(response => {
          console.log(response)
          this.currentUser.name = response.data.name
          this.currentUser.surname = response.data.surname
          this.loading = false
        })
        .catch(error => {
          this.errors.push(error)
          this.loading = false
        })
    }
  }
</script>
<style>

</style>
