<template>
  <div>
    <div v-if="loading" class="loader"></div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div class="container">
      <div v-for="row in currentPage.length" class="row">
        <div v-for="pet in currentPage.slice((row - 1) * 3, row * 3)" :key="pet.id" class="col-lg-4">
          <div class="card">
            <router-link :to="{name: 'petDetails', params: { id: pet.id }}">
            <div class="card-block">
              <img src="http://lorempixel.com/200/200/" alt="">
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
    <router-link to="/">{{ $t("navigation.back.home") }}</router-link>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate'
import petDetails from '@/components/PetDetails'

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
    }
  },
  created () {
    this.$http.get('/pets')
    // this.$http.get('http://dev.patronage2017.intive-projects.com/pets')
    .then(response => {
      this.petsList = [...response.data.petsTable]
      this.paginationConfig.numberOfPages = this.petsList.length / this.itemsPerPage
      this.changePage(1)
      this.loading = false
    })
    .catch(error => {
      this.errors.push(error)
      this.loading = false
    })
  },
  components: {
    petDetails,
    Paginate
  }
}
</script>
<style>
@import "../assets/styles/loader.css";

.card {
  border: none;
}

</style>
