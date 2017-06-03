<template>
  <div class="container-fluid">
    <loader v-if="loading"></loader>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <transition name="slide-fade">
      <div class="row mt-5" v-if="!loading && !errors.length">
        <div class="col-12 col-lg-9">
          <h5 class="news-header font-weight-bold">{{ $t('news.news') }}</h5>
          <hr>
          <div v-for="item of news" :key="item.id" class="row panel-item" v-show="isNewsExpired(item.published)">
            <div class="col-12 col-lg-3 pl-0 pr-0">
              <img :src="setUrl(item)" @error="defaultImg()" alt="" class="img-fluid float-left">
            </div>
            <div class="col-12 col-lg-9 pt-2 pb-2">
              <div class="row">
                <div class="col">
                  <p class="float-right">{{ $t('news.added') }} {{ convertTimeStamp(item.published) }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h4 class="float-left"><u>{{ item.title }}</u></h4>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="float-left">{{ item.contents }}</p>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <router-link :to="{ name: 'news', params: { id: item.id } }" class="btn news-button mb-1">
                    {{ $t('news.readMore') }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Sidebar></Sidebar>
      </div>
    </transition>
  </div>
</template>

<script>
  import Loader from './Loader'
  import moment from 'moment'
  import Sidebar from './Sidebar.vue'

  export default {
    name: 'News',
    data () {
      return {
        news: {},
        errors: [],
        loading: true
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.$http.get(this.apiUrl + 'news?type=RELEASED&isShortened=true&isOrdered=true')
          .then(response => {
            this.news = response.data
            this.loading = false
          })
          .catch(error => {
            this.errors.push(error)
            this.loading = false
          })
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
      setUrl (news) {
        if (news.imageUrl === '' || news.imageUrl === null || news.imageUrl === undefined) {
          return this.defaultImg()
        } else if (news.imageUrl.includes('data')) {
          return news.imageUrl
        } else {
          return this.apiUrl.substr(0, this.apiUrl.length - 4) + news.imageUrl
        }
      },
      defaultImg () {
        const imgUrl = require('../assets/default_avatar_dog.svg')
        return imgUrl
      }
    },
    components: {
      Loader,
      Sidebar
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/loader.css"
  @import "../assets/styles/variables.sass"

  .panel-item
    border: 2px solid $gray
    margin: 20px 0 20px 0

  .news-button
    border-color: $white
    text-transform: none
    text-align: center
    @media (min-width: 1024px)
      float: right

  .news-header
    text-align: left
    padding: 0
    margin: 0

  .slide-fade-enter-active
    transition: all 1s ease

  .slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  .slide-fade-enter, .slide-fade-leave-to
    transform: translateY(3em)
    opacity: 0
</style>
