<template>
  <div class="container">
    <loader v-if="loading"></loader>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <transition name="slide-fade">
      <div class="row mt-5" v-if="!loading && !errors.length">
        <div class="col-12 col-lg-9">
          <h5 class="news-header font-weight-bold">{{ $t('news.news') }}:</h5>
          <hr>
          <div v-for="item of news" :key="item.id" class="news-item clearfix">
            <p class="news-date">
              {{ $t('news.added') }} {{ convertTimeStamp(item.published) }}
            </p>
            <h2 class="news-title">
              <router-link :to="{ name: 'news', params: { id: item.id } }">
                {{ item.title }}
              </router-link>
            </h2>
            <img :src="setImg(item)" class="news-image img-fluid">
            <p class="news-body text-left"> {{ shortenContent(item) }} </p>
            <router-link :to="{ name: 'news', params: { id: item.id } }" class="btn news-button">
              {{ $t('news.readMore') }}
            </router-link>
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
        news: [],
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
      shortenContent (item) {
        const MAX_WORDS = 30
        const words = item.contents.split(' ')
        const wordCount = words.length

        if (wordCount > MAX_WORDS) {
          const sliced = words.slice(0, MAX_WORDS)
          sliced.push(' [...]')
          return sliced.join(' ')
        } else {
          return item.contents
        }
      },
      setImg (news) {
        if (!news.imageUrl) {
          const imgUrl = require('../assets/default_avatar_dog.svg')
          return imgUrl
        } else {
          return news.imageUrl
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
      width: 345px
      height: 278px
      @media (min-width: 1024px)
        float: left
        margin: -2rem 2rem -2rem -2rem

  .news-date
    font-size: 1em
    text-align: left
    @media (min-width: 1024px)
      float: right

  .news-button
      border-color: $white
      text-transform: none
      text-align: center
      @media (min-width: 1024px)
        float: right

  .slide-fade-enter-active
    transition: all 1s ease

  .slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  .slide-fade-enter, .slide-fade-leave-to
    transform: translateY(3em)
    opacity: 0
</style>
