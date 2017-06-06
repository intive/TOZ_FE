<template>
  <div class="container">
    <div v-if="loading" class="loader"></div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <transition name="slide-fade">
      <div v-if="!loading && !errors.length" class="row">
        <div v-for="pet in currentPage" :key="pet.id" class="col-lg-4">
          <div class="card my-2 border-0">
            <router-link :to="{name: 'petDetails', params: { id: pet.id }}">
              <div class="card-block">
                <img class="card-img-top img-fluid" :src="setUrl(pet)" @error="defaultImg(pet)">
                <h4 class="card-title">{{pet.name}}</h4>
                <h6 class="card-subtitle mb-2">{{pet.type}}</h6>
              </div>
            </router-link>
          </div>
        </div>
        <div class="col-12">
            <paginate
              :page-count="paginationConfig.numberOfPages"
              :container-class="paginationConfig.containerClass"
              :page-class="paginationConfig.pageClass"
              :page-link-class="paginationConfig.pageLinkClass"
              :prev-text="paginationConfig.prevText"
              :next-text="paginationConfig.nextText"
              :prev-class="paginationConfig.prevClass"
              :next-class="paginationConfig.nextClass"
              :click-handler="paginationConfig.clickCallback"
              :initial-page="paginationConfig.initialPage"
              ref="paginate">
            </paginate>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Paginate from 'vuejs-paginate'

  export default {
    data () {
      return {
        petsList: [],
        errors: [],
        currentPage: [],
        paginationConfig: {
          numberOfPages: 0,
          containerClass: 'pagination justify-content-center',
          pageClass: 'page-item',
          pageLinkClass: 'page-link',
          prevText: '<<',
          nextText: '>>',
          prevClass: 'page-link prev',
          nextClass: 'page-link next',
          clickCallback: this.changePage,
          initialPage: this.$route.params.page - 1
        },
        itemsPerPage: 9,
        loading: true
      }
    },
    watch: {
      '$route' (to, from) {
        this.paginationConfig.numberOfPages < this.$route.params.page ? this.changePage(1) : this.changePage(this.$route.params.page)
        this.$refs.paginate.selected = this.$route.params.page - 1
      }
    },
    methods: {
      changePage (pageNum) {
        this.currentPage = this.petsList.slice((pageNum - 1) * this.itemsPerPage, (pageNum - 1) * this.itemsPerPage + this.itemsPerPage)
        this.$router.push({name: 'pets', params: { page: pageNum }})
      },
      setUrl (pet) {
        if (pet.imageUrl === '' || pet.imageUrl === null || pet.imageUrl === undefined) {
          return this.defaultImg(pet)
        } else if (pet.imageUrl.includes('data')) {
          return pet.imageUrl
        } else {
          return this.apiUrl.substr(0, this.apiUrl.length - 4) + pet.imageUrl
        }
      },
      defaultImg (pet) {
        if (pet.type === 'dog' || pet.type === 'DOG') {
          pet.imageUrl = require('../assets/default_avatar_dog.svg')
          return pet.imageUrl
        } else {
          pet.imageUrl = require('../assets/default_avatar_cat.svg')
          return pet.imageUrl
        }
      }
    },
    created () {
      this.$http.get(this.apiUrl + 'pets')
        .then(response => {
          this.petsList = response.data
          this.paginationConfig.numberOfPages = Math.ceil(this.petsList.length / this.itemsPerPage)
          this.changePage(this.$route.params.page)
          this.loading = false
        })
        .catch(error => {
          this.errors.push(error)
          this.loading = false
        })
    },
    components: {
      Paginate
    }
  }
</script>
<style lang="sass">
  @import "../assets/styles/loader.css"
  @import "../assets/styles/variables"

  .card
    transition-duration: .4s
    a
      color: $black
      &:hover
      text-decoration: none
    &:hover
      background-color: $green
      .card-title
        color: #fff
      .card-subtitle
        color: $black

  .card-subtitle
    color: $orange

  .card-img-top
    height: 300px

  .page-link
    font-size: 1.8em
    color: #fff
    background-color: $green
    border-color: #000
    &:hover
      border-color: #000
      background-color: $green
      text-decoration: none
      color: #000

  .page-item.active .page-link
    background-color: $orange
    border-color: #000
    color: #fff

  .next, .prev
    &:hover
      a
        color: #000
    a
      color: #fff
      &:hover
        text-decoration: none

  .slide-fade-enter-active
    transition: all 1s ease

  .slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  .slide-fade-enter, .slide-fade-leave-to
    transform: translateY(3em)
    opacity: 0

</style>
