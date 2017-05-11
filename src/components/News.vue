<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="container">
      <div v-for="item in news" :key="item.id" class="news-item clearfix">
        <div class="news-date">
          {{ $t('news.added') }} {{ convertTimeStamp }}
        </div>
        <h2 class="news-title">
          <router-link :to="{ name: 'news', params: { id: item.id } }">
            {{ item.title }}
          </router-link>
        </h2>
        <div class="row">
          <div class="col-md-5">
            <img :src="item.photoUrl" alt="" class="news-image">
          </div>
          <div class="col-md-7 content-wrapper">
            <p class="content"> {{ shortenContent(item) }} </p>
            <div class="wrapper">
              <router-link :to="{ name: 'news', params: { id: item.id } }" class="btn">
                {{ $t('news.readMore') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
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
        news: [{
          'id': '9b6d936b-56d6-49b7-801f-c0d62b3adf6f',
          'title': 'Zostań naszym wolontariuszem!',
          'contents': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorum incidunt cum facilis veniam deleniti ullam alias excepturi pariatur quod sunt quasi delectus, maiores rerum provident vero expedita et earum adipisci! Qui enim laboriosam sequi quibusdam? Nam sint commodi tenetur veritatis tempora eaque nulla voluptatibus.',
          'type': 'RELEASED',
          'photoUrl': 'http://lorempixel.com/287/300',
          'created': 1494329859282
        },
        {
          'id': '31f5cad8-ffa4-4789-8216-37c0ab7f03a0',
          'title': 'title_3',
          'contents': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio sit nobis aut facilis praesentium, nihil, commodi dignissimos illum vitae. Quasi vel neque aspernatur ex placeat vero! Voluptates, temporibus ratione tempore atque et consequatur distinctio quisquam, dolore expedita assumenda non, facere magnam debitis quae! Veniam amet consequatur ab ipsum beatae dolor.',
          'type': 'RELEASED',
          'photoUrl': 'http://lorempixel.com/200/200',
          'created': 1494329863111
        }],
        // news: [],
        loading: false
      }
    },
    created () {
      // this.fetchData()
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
            this.news = response.data
            this.loading = false
          })
          .catch(error => {
            this.errors.push(error)
            this.loading = false
          })
      },
      shortenContent (item) {
        console.log(item)
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
    border-bottom: 1px solid $gray
    @media (min-width: 768px)
      margin-bottom: 10px

  .news-date
    margin-top: 0
    text-align: left
    margin: 25px 0 10px 0
    @media (min-width: 768px)
      text-align: right

  .news-title
    text-align: center
    font-size: 2rem
    margin-bottom: 16px
    text-decoration: underline

  .news-title a
    color: black

  .content-wrapper
    padding-right: 40px

  .news-image
    width: 345px
    height: 278px
    margin-bottom: 10px
    max-width: 100%
    @media (min-width: 768px)
      margin-bottom: 0

  .wrapper
    margin-bottom: 20px
    text-align: center
    @media (min-width: 768px)
      text-align: right
      position: absolute
      bottom: 0
      right: 40px

  a
    color: #fff
</style>
