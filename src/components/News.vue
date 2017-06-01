<template>
  <div class="container row wrapper">
    <div class="col-12 col-lg-9">
      <loader v-if="loading"></loader>
      <div class="errors" v-if="errors.length">
        <h2 v-for="error of errors">{{ error.message }}</h2>
      </div>
      <h5 class="news-header">{{ $t('news.news') }}</h5>
      <hr>
      <div v-for="item of news" :key="item.id" class="row panel-item" v-show="isNewsExpired(item.published)">
        <div class="col-3 hidden-md-down">
          <img :src="item.imageUrl" alt="" class="panel-img float-left">
        </div>
        <div class="col-12 col-sm-9 pt-2 pl-5 pb-2">
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
          <div class="row mt-5">
            <div class="col">
              <router-link :to="{ name: 'news', params: { id: item.id }, query: { type: 'RELEASED', isShortened: false, isOrdered: true } }" class="btn news-button">
                {{ $t('news.readMore') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Sidebar></Sidebar>
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
      convertTimeStamp (publishedDate) {
        const date = moment(publishedDate).locale(this.$t('common.code'))
        return date.format(this.$t('common.dateFormat'))
      },
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

  .card
    border: none
    &:hover
      background-color: inherit
      color: inherit

  .panel-img
    height: 278px
    margin: 0 10px 0 -15px
    width: 345px

  .panel-item
    border: 2px solid $gray
    margin: 20px 0 20px 0

  .news-button
    border-color: $white
    text-transform: none
    text-align: center
    @media (min-width: 1024px)
      float: right

  .wrapper
    height: 100%
    margin-top: 5em
    width: 100%
</style>
