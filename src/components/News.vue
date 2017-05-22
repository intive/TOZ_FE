<template>
  <div class="container">
    <loader v-if="loading"></loader>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
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
</template>

<script>
  import Loader from './Loader'
  import moment from 'moment'

  export default {
    name: 'News',
    data () {
      return {
        // news: [{
        //   'id': '1',
        //   'title': 'Zostań naszym wolontariuszem!',
        //   'contents': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio sit nobis aut facilis praesentium, nihil, commodi dignissimos illum vitae. Quasi vel neque aspernatur ex placeat vero! Voluptates, temporibus ratione tempore atque et consequatur distinctio quisquam, dolore expedita assumenda non, facere magnam debitis quae! Veniam amet consequatur ab ipsum beatae dolor.',
        //   'type': 'RELEASED',
        //   'photoUrl': 'http://lorempixel.com/287/300',
        //   'created': 1494329859282
        // },
        // {
        //   'id': '567fc68a-0c6a-4dc6-948b-cbc002738839',
        //   'title': 'W niedzielę schronisko zamknięte',
        //   'contents': 'Lorem ipsum ptates, temporibus ratione tempore atque et consequatur distinctio quisquam, dolore expedita assumenda non, facere magnam debitis quae! Veniam amet consequatur ab ipsum beatae dolor.',
        //   'type': 'RELEASED',
        //   'photoUrl': 'http://lorempixel.com/200/200',
        //   'created': 1494329863111
        // },
        // {
        //   'id': 'd8728661-d429-4e96-893a-75c0f89af76e',
        //   'title': 'Kto tu rządzi?',
        //   'contents': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio sit nobis aut facilis praesentium, nihil, commodi dignissimos illum vitae. Quasi vel neque aspernatur ex placeat vero! Voluptates, temporibus ratione tempore atque et consequatur distinctio quisquam, dolore expedita assumenda non, facere magnam debitis quae! Veniam amet consequatur ab ipsum beatae dolor.',
        //   'type': 'RELEASED',
        //   'photoUrl': 'http://lorempixel.com/200/200',
        //   'created': 1494329863111
        // }],
        news: [],
        errors: [],
        loading: true
      }
    },
    created () {
      this.fetchData()
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
      Loader
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/loader.css"
  @import "../assets/styles/variables.sass"

  .news-item
    padding: 2rem 0
    border-bottom: 2px solid $gray
    @media (min-width: 1024px)
      position: relative
      border: 2px solid $gray
      padding: 2rem
      margin-bottom: 1rem

  .news-title
    font-size: 2rem
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
</style>
