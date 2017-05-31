<template>
  <div class="container">
    <div class="loader" v-if="loading"></div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div class="row mt-5" v-if="!errors.length">
      <div class="col-lg-9 col-12">
        <p class="text-left top-date">{{ $t('news.added') }} {{ convertTimeStamp }}</p>
        <h3 class="title text-left">{{ newsDetails.title }}</h3>
        <img :src="setImg()" class="img">
        <p class="text-left news-info added">{{ $t('news.added') }} {{ convertTimeStamp }}</p>
        <p class="text-left content">{{ newsDetails.contents }}</p>
        <hr class="divider">
        <p class="next-news-title">{{ $t('news.nextNews') }}</p>
        <div class="row next-news-normal">
          <div class="col-md-4">
            <img src="http://loremflickr.com/200/167" class="img-fluid img-small">
          </div>
          <div class="col-md-4">
            <img src="http://loremflickr.com/200/167" class="img-fluid img-small">
          </div>
          <div class="col-md-4">
            <img src="http://loremflickr.com/200/167" class="img-fluid img-small">
          </div>
        </div>
        <div class="row next-news-carousel">
          <div class="col">
            <carousel class="carousel"
            :navigationEnabled="settings.navigationEnabled"
            :paginationEnabled="settings.paginationEnabled"
            :navigationClickTargetSize="settings.navigationClickTargetSize"
            :perPageCustom="settings.perPageCustom">
              <slide v-for="item of images" :key="item.id">
                <img :src="item" class="img-fluid img-small">
              </slide>
            </carousel>
          </div>
        </div>
      </div>
      <Sidebar></Sidebar>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import { Carousel, Slide } from 'vue-carousel'
  import Sidebar from './Sidebar'

  export default {
    name: 'NewsDetails',
    components: {
      Carousel,
      Slide,
      Sidebar
    },
    data () {
      return {
        settings: {
          navigationEnabled: true,
          paginationEnabled: false,
          navigationClickTargetSize: 0,
          perPageCustom: [[300, 1], [500, 2], [730, 3]]
        },
        errors: [],
        newsDetails: {},
        id: this.$route.params.id,
        loading: true,
        images: [
          'http://loremflickr.com/200/167',
          'http://loremflickr.com/200/167',
          'http://loremflickr.com/200/167'
        ]
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route.fullPath': 'fetchData'
    },
    computed: {
      convertTimeStamp () {
        const date = moment(this.newsDetails.published).locale(this.$t('common.code'))
        return date.format(this.$t('common.dateFormat'))
      }
    },
    methods: {
      fetchData () {
        this.$http.get(this.apiUrl + 'news/' + this.id)
        .then(response => {
          this.newsDetails = {...response.data}
          this.loading = false
        })
        .catch(error => {
          this.errors.push(error)
          this.loading = false
        })
      },
      setImg () {
        if (!this.newsDetails.imageUrl) {
          this.newsDetails.imageUrl = require('../assets/default_avatar_dog.svg')
          return this.newsDetails.imageUrl
        } else {
          return this.newsDetails.imageUrl
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/loader.css"
  @import "../assets/styles/variables.sass"

  .title
    text-decoration: underline
    margin-bottom: 35px

  .content
    margin-top: 20px

  .news-info
    @media (max-width: 435px)
      display: none

  .top-date
    font-size: 1.8em
    margin: 35px 0 12px 0
    @media (min-width: 435px)
      display: none

  .divider
    background-color: $green
    height: 5px

  .img
    float: left
    height: 287px
    margin-bottom: 30px
    width: 344px
    @media (min-width: 430px)
      height: 600px
      width: 100%

  .img-small
    width: 200px
    height: 167px
    @media (min-width: 768px)
      height: 100%
      width: 100%

  .next-news-title
    font-size: 2.5em
    font-weight: bold
    margin: 25px 0 25px 0

  .next-news-normal
    @media (max-width: 767px)
      display: none

  .next-news-carousel
    @media (min-width: 767px)
      display: none

</style>
