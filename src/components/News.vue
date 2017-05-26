<template>
  <div class="container row wrapper">
    <div class="col-lg-9">
    <loader v-if="loading"></loader>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
      <h5 class="news-header">Aktualności:</h5>
      <hr>
    <div v-for="item of news" :key="item.id" class="news-item clearfix">
      <div class="news-date">
        {{ $t('news.added') }} {{ convertTimeStamp }}
      </div>
      <h2 class="news-title">
        <router-link :to="{ name: 'news', params: { id: item.id }, query: { type: 'RELEASED', shortened: false } }">
          {{ item.title }}
        </router-link>
      </h2>
      <img :src="item.photoUrl" alt="" class="news-image">
      <p class="news-body"> {{ shortenContent(item) }} </p>
      <router-link :to="{ name: 'news', params: { id: item.id }, query: { type: 'RELEASED', shortened: false } }" class="btn news-button">
        {{ $t('news.readMore') }}
      </router-link>
    </div>
    </div>
    <div class="col-lg-3 col-12 right-panel">
      <p class="right-panel-header">{{ $t('news.rightPanel.companyName') }}</p>
      <p class="right-panel-text">{{ $t('news.rightPanel.address.street') }}</p>
      <p class="right-panel-text">{{ $t('news.rightPanel.address.country') }}</p>
      <p class="right-panel-text last">{{ $t('news.rightPanel.address.tel') }}</p>
      <p class="right-panel-header">{{ $t('news.rightPanel.openingHours.title') }}</p>
      <p class="right-panel-text last">{{ $t('news.rightPanel.openingHours.hours') }}</p>
      <p class="right-panel-header">{{ $t('news.rightPanel.clinic.title') }}</p>
      <p class="right-panel-text">{{ $t('news.rightPanel.clinic.hours') }}</p>
      <p class="right-panel-text">{{ $t('news.rightPanel.clinic.break') }}</p>
      <p class="right-panel-text last">{{ $t('news.rightPanel.clinic.weekend') }}</p>
      <p class="right-panel-header">{{$t('news.rightPanel.newestComments')}}</p>
      <mainComments v-for="item in comments" :comment="item" :key="item.id"></mainComments>
    </div>
  </div>
</template>

<script>
  import Loader from './Loader'
  import moment from 'moment'
  import mainComments from './mainPageComments.vue'
  export default {
    name: 'News',
    data () {
      return {
        news: [],
        errors: [],
        comments: [],
        loading: true
      }
    },
    created () {
      this.fetchData()
      this.getComments()
    },
    computed: {
      convertTimeStamp () {
        const date = moment(this.created).locale('pl-PL')
        return date.format('l')
      }
    },
    methods: {
      fetchData () {
        this.$http.get(this.apiUrl + 'news?type=RELEASED&shortened=true')
          .then(response => {
            this.news = {...response.data}
            this.loading = false
          })
          .catch(error => {
            this.errors.push(error)
            this.loading = false
          })
      },
      getComments () {
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
      shortenContent (item) {
        const MAX_WORDS = 30
        const words = item.contents.split(' ')
        const wordCount = words.length

        if (wordCount > MAX_WORDS) {
          let sliced = words.slice(0, MAX_WORDS)
          sliced.push(' [...]')
          return sliced.join(' ')
        } else return item.contents
      }
    },
    components: {
      Loader,
      mainComments
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/loader.css"
  @import "../assets/styles/variables.sass"

  .wrapper
    margin-top: 5em
    height: 100%
    width: 100%
  .news-item
    padding: 1rem
    border-bottom: 2px solid $gray
    @media (min-width: 1024px)
      position: relative
      border: 2px solid $gray
      padding: 2rem
      margin-bottom: 1rem
  .news-header
    text-align: left
    padding: 0
    margin: 0
  .news-title
    font: $font-stack
    font-size: 2em
    text-decoration: underline
    a
      color: black
    @media (min-width: 1024px)
      display: inline

  .news-image
      max-width: 100%
      width: 345px
      height: 278px
      @media (min-width: 1024px)
        float: left
        margin: -2rem 2rem -2rem -2rem

  .news-date
      text-align: left
      @media (min-width: 1024px)
        float: right

  .news-button
      border-color: $white
      text-transform: none
      text-align: center
      @media (min-width: 1024px)
        float: right

  .right-panel
      height: 100%
      margin: 5em 5em 0 5.5em
      padding: 1em 0 0 .8em
      @media (max-width: 1108px)
        margin: 0
      @media (max-width: 768px)
        display: none
      @media (min-width: 1200px)
        margin: 0 auto

      .right-panel-header
        font-size: 1.8em
        font-weight: bold
        line-height: 1.3
        text-align: left

      .right-panel-text
        color: #b9b9b9
        font-size: 1.4em
        line-height: 1
        text-align: left

      .last
        margin-bottom: 50px
</style>
