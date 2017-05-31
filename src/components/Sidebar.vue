<template>
  <div class="col-lg-3 col-12 sidebar-panel mt-5">
    <p class="sidebar-panel-header">{{ $t('news.rightPanel.companyName') }}</p>
    <p class="sidebar-panel-text">{{ $t('news.rightPanel.address.street') }}</p>
    <p class="sidebar-panel-text">{{ $t('news.rightPanel.address.country') }}</p>
    <p class="sidebar-panel-text last">{{ $t('news.rightPanel.address.tel') }}</p>
    <p class="sidebar-panel-header">{{ $t('news.rightPanel.openingHours.title') }}</p>
    <p class="sidebar-panel-text last">{{ $t('news.rightPanel.openingHours.hours') }}</p>
    <p class="sidebar-panel-header">{{ $t('news.rightPanel.clinic.title') }}</p>
    <p class="sidebar-panel-text">{{ $t('news.rightPanel.clinic.hours') }}</p>
    <p class="sidebar-panel-text">{{ $t('news.rightPanel.clinic.break') }}</p>
    <p class="sidebar-panel-text last">{{ $t('news.rightPanel.clinic.weekend') }}</p>
    <div v-if="authenticated" id="recentComments" class="text-justify py-3">
      <p class="sidebar-header text-center">{{$t('news.rightPanel.newestComments')}}</p>
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

  #recentComments
    border-top: 5px solid $green
    font-weight: bold

  .sidebar-panel
    border-top: 5px solid $green
    border-bottom: 5px solid $green
    height: 100%
    margin: 0 50px 0 55px
    padding: 10px 0 0 18px
    @media (max-width: 1108px)
      margin: 0
    @media (max-width: 768px)
      display: none
    @media (min-width: 1200px)
      margin: 0 auto

  .sidebar-panel-header
    font-size: 1.8em
    font-weight: bold
    line-height: 1.3
    text-align: center

  .sidebar-panel-text
    color: #b9b9b9
    font-size: 1.8em
    line-height: 1
    text-align: center

  .last
    margin-bottom: 50px
</style>
