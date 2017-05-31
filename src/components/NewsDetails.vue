<template>
  <div class="container-fluid">
    <div class="row loader" v-if="loading"></div>
    <div class="row errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div class="row" v-if="!errors.length">
      <div class="col">
        <p class="text-left top-date">{{ $t('news.added') }} {{ convertTimeStamp(newsDetails.published) }}</p>
        <div class="row title">
          <h3><u>{{ newsDetails.title }}</u></h3>
        </div>
        <div class="row">
          <div class="col-lg-8 col-md-8 col-xs-12 left-panel">
            <img :src="newsDetails.imageUrl" class="img">
            <p class="text-left news-info added">{{ $t('news.added') }} {{ convertTimeStamp(newsDetails.published) }}</p>
            <p class="text-left">{{ newsDetails.contents }}</p>
            <hr class="divider">
            <p class="next-news-section-title">{{ $t('news.nextNews') }}</p>
            <div class="row">
              <div class="col">
                <carousel class="carousel"
                          :navigationEnabled="settings.navigationEnabled"
                          :paginationEnabled="settings.paginationEnabled"
                          :navigationClickTargetSize="settings.navigationClickTargetSize"
                          :perPageCustom="settings.perPageCustom">
                  <slide v-for="item of nextNews" :key="item.id" v-show="item.id !== newsDetails.id && isNewsExpired(item.published)">
                    <div class="card" @click="openNews(item.id)">
                      <img class="card-img-top" :src="item.imageUrl" alt="">
                      <div class="card-block">
                        <h4 class="card-title">
                        </h4>
                        <p class="card-text">{{ item.title }}</p>
                        <p class="card-text"><small class="text-muted">{{ convertTimeStamp(item.published) }}</small></p>
                      </div>
                    </div>
                  </slide>
                </carousel>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-2 right-panel">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import { Carousel, Slide } from 'vue-carousel'
  export default {
    name: 'NewsDetails',
    components: {
      Carousel,
      Slide
    },
    data () {
      return {
        settings: {
          navigationEnabled: true,
          paginationEnabled: false,
          navigationClickTargetSize: 0,
          perPageCustom: [[300, 1], [500, 2], [1864, 3]]
        },
        errors: [],
        newsDetails: {},
        nextNews: {},
        id: this.$route.params.id,
        loading: true
      }
    },
    created () {
      this.fetchData()
      this.fetchNextNews()
    },
    watch: {
      '$route': 'reloadPage'
    },
    methods: {
      reloadPage () {
        location.reload()
      },
      sortNews (key, order = 'asc') {
        return (a, b) => {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0
          }

          const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
          const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]

          let comparison = 0
          if (varA > varB) {
            comparison = 1
          } else if (varA < varB) {
            comparison = -1
          }

          return ((order === 'desc') ? (comparison * -1) : comparison)
        }
      },
      convertTimeStamp (published) {
        const date = moment(published).locale(this.$t('common.code'))
        return date.format(this.$t('common.dateFormat'))
      },
      isNewsExpired (itemPublished) {
        if (itemPublished > Date.now() - 13046400000) {
          return true
        } else {
          return false
        }
      },
      fetchData () {
        this.$http.get(this.apiUrl + 'news/' + this.id)
          .then(response => {
            this.newsDetails = response.data
            this.loading = false
          })
          .catch(error => {
            this.errors.push(error)
            this.loading = false
          })
      },
      fetchNextNews () {
        this.$http.get(this.apiUrl + 'news?type=RELEASED&shortened=true')
          .then(response => {
            this.nextNews = response.data
            this.loading = false
            this.nextNews.sort(this.sortNews('published'))
          })
          .catch(error => {
            this.errors.push(error)
            this.loading = false
          })
      },
      openNews (itemId) {
        this.$router.push({ name: 'news', params: { id: itemId }, query: { type: 'RELEASED', shortened: false } })
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/loader.css"
  @import "../assets/styles/variables.sass"

  $green: #4CD374

  p
    line-height: 1.7

  .added
    margin-bottom: -2px
    margin-bottom: 40px

  .card
    cursor: pointer
    margin: 5px
    &:hover
      background-color: inherit
      border: 1px solid $green

  .card-text
    font-size: 1.41rem

  .divider
    background-color: $green
    height: 5px
    margin-top: 40px

  .img
    float: left
    height: 287px
    margin-bottom: 30px
    width: 344px
    @media (min-width: 430px)
      height: 600px
      width: 100%

  .last
    margin-bottom: 50px

  .left-panel
    height: 100%
    @media (min-width: 768px)
      margin: 0 0 100px 35px
    @media (min-width: 1200px)
      margin: 0 auto
      margin-right: 0

  .left-panel-top
    border-bottom: 5px solid $green

  .news-info
    @media (max-width: 435px)
      display: none

  .next-news-normal
    @media (max-width: 767px)
      display: none

  .next-news-normal-link
    margin-top: 50px
    font-size: 1.8em

  .next-news-tiny
    @media (min-width: 767px)
      display: none

  .next-news-section-title
    font-size: 2.5em
    font-weight: bold
    margin: 25px 0 25px 0

  .right-panel
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

  .text-left
    line-height: 1.35

  .text-muted
    font-size: .9rem

  .title
    margin: 35px 35px 25px 35px
    @media (max-width: 435px)
      margin: 0 0 25px 0
    @media (min-width: 1200px)
      margin-left: 105px

  .top-date
    font-size: 1.8em
    margin: 35px 0 12px 0
    @media (min-width: 435px)
      display: none
</style>
