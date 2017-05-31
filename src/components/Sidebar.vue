<template>
  <div class="col-lg-3 col-12 sidebar mt-5">
    <div class="sidebar-info py-3">
      <p class="sidebar-header">{{ $t('sidebar.companyName') }}</p>
      <p>{{ $t('sidebar.address.street') }}</p>
      <p>{{ $t('sidebar.address.country') }}</p>
      <p>{{ $t('sidebar.address.tel') }}</p>
      <p class="sidebar-header">{{ $t('sidebar.openingHours.title') }}</p>
      <p>{{ $t('sidebar.openingHours.hours') }}</p>
      <p class="sidebar-header">{{ $t('sidebar.clinic.title') }}</p>
      <p>{{ $t('sidebar.clinic.hours') }}</p>
      <p>{{ $t('sidebar.clinic.break') }}</p>
      <p>{{ $t('sidebar.clinic.weekend') }}</p>
    </div>
    <div v-if="authenticated" id="recentComments" class="text-justify py-3">
      <p class="sidebar-header text-center">{{$t('sidebar.newestComments')}}</p>
      <Comments v-for="item in comments" :comment="item" :key="item.id"></Comments>
    </div>
  </div>
</template>

<script>
import Comments from './RecentComments'
import auth from '../auth.js'

export default {
  data () {
    return {
      authenticated: auth.user.authenticated,
      comments: [],
      loading: false
    }
  },
  created () {
    this.$http.get(this.apiUrl + 'comments?isShortened=true&state=ACTIVE')
      .then(response => {
        this.comments = [...response.data]
        this.comments = this.comments.slice(0, 5)
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
  },
  components: {
    Comments
  }
}
</script>

<style lang="sass">
  @import "../assets/styles/variables"

  .sidebar-info
    border-top: 5px solid $green

  .sidebar-header
    font-weight: bold

  #recentComments
    border-top: 5px solid $green
</style>
