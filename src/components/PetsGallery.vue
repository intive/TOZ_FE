<template>
  <div>
    <div v-if="loading" class="loader"></div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div class="container">
      <div class="row">
        <div v-for="pet in currentPage" :key="pet.id" class="col-lg-4">
          <div class="card">
            <router-link :to="{name: 'petDetails', params: { id: pet.id }}">
              <div class="card-block">
                <img class="imgCard" :src="setUrl(pet)" @error="defaultImg(pet)" alt="">
                <h2 class="card-title">{{pet.name}}</h2>
                <h3 class="card-text">{{pet.type}}</h3>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <paginate
      :page-count="paginationConfig.numberOfPages"
      :container-class="paginationConfig.containerClass"
      :page-class="paginationConfig.pageClass"
      :page-link-class="paginationConfig.pageLinkClass"
      :prev-text="paginationConfig.prevText"
      :next-text="paginationConfig.nextText"
      :prev-class="paginationConfig.prevClass"
      :next-class="paginationConfig.nextClass"
      :click-handler="paginationConfig.clickCallback">
    </paginate>
    <router-link to="/">{{ $t("common.backHome") }}</router-link>
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
          prevClass: 'page-link',
          nextClass: 'page-link',
          clickCallback: this.changePage
        },
        itemsPerPage: 9,
        loading: true
      }
    },
    methods: {
      changePage (pageNum) {
        this.currentPage = this.petsList.slice((pageNum - 1) * this.itemsPerPage, (pageNum - 1) * this.itemsPerPage + this.itemsPerPage)
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
          this.changePage(1)
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
<style>
  @import "../assets/styles/loader.css";

  .card {
    border: none;
  }
  .imgCard {
    width: 30em;
    height: 30em;
  }
</style>
