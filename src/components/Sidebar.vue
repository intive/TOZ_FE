<template>
  <div class="col-lg-3 col-12 mt-5">
    <CompanyInfo></CompanyInfo>
    <div v-if="user.authenticated" id="recentComments" class="text-justify py-3">
      <p class="sidebar-header text-center">{{$t('sidebar.newestComments')}}</p>
      <Comments v-for="item in comments" :comment="item" :key="item.id"></Comments>
    </div>
  </div>
</template>

<script>
import Comments from './RecentComments'
import auth from '../auth.js'
import CompanyInfo from './CompanyInfo.vue'

export default {
  data () {
    return {
      user: auth.user,
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
    Comments,
    CompanyInfo
  }
}
</script>

<style lang="sass">
  @import "../assets/styles/variables"

  #recentComments
    font-weight: bold
</style>
