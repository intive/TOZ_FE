<template>
  <div class="container-fluid">
    <div class="row loader" v-if="loading"></div>
    <div class="row errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div class="row" v-if="!errors.length">
      <div class="col">
        <p class="text-left top-date">Dodane: {{ convertTimeStamp }}</p>
        <div class="row title">
          <h3><u>{{ newsDetails.title }}</u></h3>
        </div>
        <div class="row">
          <div class="col-8 left-panel">
            <img src="http://loremflickr.com/344/287" class="img">
            <p class="text-left news-info added">Dodane: {{ convertTimeStamp }}</p>
            <p class="text-left news-info autor">Opublikowała: Joanna Krupa</p>
            <p class="text-left">{{ lorem }}</p>
            <p class="text-left">{{ lorem }}</p>
            <p class="text-left">{{ lorem }}</p>
            <div class="row share">
              <div class="col-md-2">
                <p class="text-left">Udostępnij to!</p>
              </div>
              <div class="col-md-5 hidden-lg-down">
                <p>--------------------------------------------------------></p>
              </div>
              <div class="col-md-5 buttons-wrapper">
                <button type="button" class="btn btn-social btn-pinterest">
                  <span class="fa fa-pinterest"></span> Pinterest
                </button>
                <button type="button" class="btn btn-social btn-google">
                  <span class="fa fa-google"></span> Google
                </button>
                <button type="button" class="btn btn-social btn-facebook">
                  <span class="fa fa-facebook"></span> Facebook
                </button>
                <button type="button" class="btn btn-social btn-twitter">
                  <span class="fa fa-twitter"></span> Twitter
                </button>
              </div>
            </div>
            <hr class="divider">
            <p class="next-news-title">Następne wpisy</p>
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
                  <slide v-for="item of images">
                    <img :src="item" class="img-fluid img-small">
                  </slide>
                </carousel>
              </div>
            </div>
          </div>
          <div class="col-2 right-panel">
            <p class="right-panel-header">Towarzystwo opieki nad zwierzętami w Szczecinie</p>
            <p class="right-panel-text">ul. Ojca Beyzyma 17</p>
            <p class="right-panel-text">70-391 Szczecin</p>
            <p class="right-panel-text last">tel/fax. 91 487-04-37</p>
            <p class="right-panel-header">Godziny otwarcia</p>
            <p class="right-panel-text last">Poniedziałek - Piątek: 9-17</p>
            <p class="right-panel-header">Lecznica TOZ</p>
            <p class="right-panel-text">Poniedziałek - Piątek: 8-18</p>
            <p class="right-panel-text">Przerwa na zabiegi: 11-13</p>
            <p class="right-panel-text last">Sobota: 10-15</p>
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
        ],
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent diam tellus, tempus eget sem tempus, auctor tempus ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Fusce fringilla lacinia laoreet. Vivamus eu massa viverra ipsum suscipit facilisis. Nulla vitae metus sagittis metus condimentum congue et sit amet lectus. Integer sapien felis, faucibus sed tempus et, accumsan quis sapien.'
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
        const date = moment(this.newsDetails.created).locale(this.$t('common.code'))
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
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/loader.css"
  @import "../assets/styles/variables.sass"

  $green: #4CD374
  $twitter: #55acee
  $facebook: #3b5998
  $google: #dd4b39
  $pinterest: #dc143c

  p
    line-height: 1.7

  .news-info
    @media (max-width: 435px)
      display: none

  .autor
    margin-bottom: 40px

  .added
    margin-bottom: -2px


  .top-date
    font-size: 1.8em
    margin: 35px 0 12px 0
    @media (min-width: 435px)
      display: none

  .title
    margin: 35px 35px 25px 35px
    @media (max-width: 435px)
      margin: 0 0 25px 0
    @media (min-width: 1200px)
      margin-left: 105px

  .share
    margin-top: 40px
    margin-bottom: 55px
    p
      font-size: 2.2em

  .divider
    background-color: $green
    height: 5px

  .img
    float: left
    height: 287px
    margin-bottom: 30px
    width: 344px
    @media (min-width: 435px)
      height: 600px
      width: 100%

  .img-small
    width: 200px
    height: 167px
    @media (min-width: 768px)
      height: 100%
      width: 100%

  .text-left
    line-height: 1.35

  .left-panel
    height: 100%
    @media (min-width: 768px)
      margin: 0 0 100px 35px
    @media (min-width: 1200px)
      margin: 0 auto
      margin-right: 0

  .left-panel-top
    border-bottom: 5px solid $green

  .right-panel
    border-top: 5px solid $green
    border-bottom: 5px solid $green
    height: 100%
    margin: 0 50px 0 55px
    padding: 10px 0 0 18px
    @media (max-width: 1108px)
      margin: 0
      /*display: none*/
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

  .btn
    background-color: inherit
    border-radius: 5px
    cursor: pointer
    float: right
    font-size: 1.8em
    margin-right: 7px
    padding: 5px 10px 5px 10px
    text-transform: none
    @media (max-width: 435px)
      margin-bottom: 20px
    &:hover
      background-color: #f6f6f6

  .buttons-wrapper
    @media (max-width: 435px)
      display: grid
      width: 50%

  .btn-social
    border-width: 2px

  .btn-twitter
    border-color: $twitter
    color: $twitter

  .btn-facebook
    border-color: $facebook
    color: $facebook

  .btn-google
    border-color: $google
    color: $google

  .btn-pinterest
    border-color: $pinterest
    color: $pinterest
</style>
