<template>
  <div class="container row wrapper">
    <div class="col-12 col-lg-9">
      <loader v-if="loading"></loader>
      <div class="errors" v-if="errors.length">
        <h2 v-for="error of errors">{{ error.message }}</h2>
      </div>
      <h5 class="news-header">{{ $t('news.news') }}</h5>
      <hr>
      <div v-for="item of news" :key="item.id" class="row panel-item clearfix" v-show="item.published > Date.now() - 13046400000">
        <div class="col-3">
          <img :src="item.imageUrl" alt="" class="panel-img float-left">
        </div>
        <div class="col-8 offset-1">
          <div class="row">
            <div class="col panel-date">
              <p>{{ $t('news.added') }} {{ convertTimeStamp(item.published) }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col panel-title">
              <u>{{ item.title }}</u>
            </div>
          </div>
          <div class="row">
            <div class="col panel-content">
              <p>{{ shortenContent(item.contents) }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <router-link :to="{ name: 'news', params: { id: item.id }, query: { type: 'RELEASED', shortened: false } }" class="btn news-button">
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
      fetchData () {
        this.$http.get(this.apiUrl + 'news?type=RELEASED&shortened=true')
          .then(response => {
            this.news = response.data
            this.loading = false
            this.news.sort(this.sortNews('published'))
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
      shortenContent (item) {
        const MAX_WORDS = 30
        const words = item.split(' ')
        const wordCount = words.length

        if (wordCount > MAX_WORDS) {
          let sliced = words.slice(0, MAX_WORDS)
          sliced.push(' [...]')
          return sliced.join(' ')
        } else return item
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

  .panel-content
    margin: 10px 0 10px -50px
    text-align: justify
    p
      line-height: 1.42

  .panel-date
    font-size: .5rem
    margin: 20px 10px 0 0
    text-align: right

  .panel-img
    height: 278px
    margin: 0 10px 0 -15px
    width: 345px

  .panel-item
    border: 2px solid $gray
    margin: 20px 0 20px 0

  .panel-title
    font-size: 1.2rem
    font-weight: bold
    margin: 10px 0 10px -50px
    text-align: left

  .news-button
    border-color: $white
    margin: 20px 50px 20px 0
    text-transform: none
    text-align: center
    @media (min-width: 1024px)
      float: right

  .wrapper
    height: 100%
    margin-top: 5em
    width: 100%
</style>
