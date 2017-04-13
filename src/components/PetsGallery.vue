<template>
  <div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div class="container">
      <div v-for="row in currentPage.length" class="row">
        <div v-for="pet in currentPage.slice((row - 1) * 3, row * 3)" :key="pet.name" class="col-lg-4">
          <div class="card">
            <router-link :to="{
            name: 'petDetails',
            params: {
            id: pet.id,
            name: pet.name,
            sex: pet.sex,
            created:pet.created,
            type:pet.type,
            description: pet.description
            }}">
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
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate'
import petDetails from '@/components/PetDetails'
// import MockAdapter from 'axios-mock-adapter'
// import petsTable from '@/petsMock'

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
        clickCallback: this.clickCallback
      }
    }
  },
  methods: {
    clickCallback (pageNum) {
      this.currentPage = this.petsList.slice((pageNum - 1) * 9, (pageNum - 1) * 9 + 9)
    }
  },
  created () {
    // const mock = new MockAdapter(this.$http)
    // mock.onGet('/petsInfo').reply(200, petsTable)
    this.$http.get(this.apiUrl + '/pets')
    // this.$http.get('/petsInfo')
    .then(response => {
      this.petsList = [...response.data]
      this.paginationConfig.numberOfPages = this.petsList.length / 9
      this.clickCallback(1)
    })
    .catch(error => {
      this.errors.push(error)
    })
  },
  components: {
    petDetails,
    Paginate
  }
}
</script>
<style>
.card {
  border: none;
}
</style>
