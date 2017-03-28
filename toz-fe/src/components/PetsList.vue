<template>
  <div>
  <div class="errors" v-if="errors.length">
    <h2 v-for="error of errors">{{ error.message }}</h2>
  </div>
  <carousel v-else :navigationEnabled="true" :paginationEnabled="false" :navigationClickTargetSize="0" :perPageCustom="[[768, 3], [1024, 5]]">
    <slide v-for="pet in petsList" :key="pet.name" >
      <router-link :to="{
      name: 'petDetails',
      params: {
        id: pet.id,
        name: pet.name,
        description: pet.description
       }}">
        <div>
          <img :src="pet.img" alt="pet photo">
          <h2>Name: {{ pet.name }}</h2>
          <h2>Type: {{ pet.type }}</h2>
          <h2>Sex: {{ pet.sex }}</h2>
        </div>
      </router-link>
    </slide>
  </carousel>
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import petDetails from '@/components/PetDetails'
// import MockAdapter from 'axios-mock-adapter'
// import petsTable from '@/petsMock'
// const mock = new MockAdapter(this.$http)
// mock.onGet('/petsInfo').reply(200, petsTable)

export default {
  data () {
    return {
      petsList: [],
      errors: [],
      showModal: false,
      currentPet: {}
    }
  },
  created () {
    // this.$http.get('/petsInfo')
    this.$http.get('http://dev.patronage2017.intive-projects.com/pets')
    .then(response => {
      this.petsList = [...response.data]
    })
    .catch(error => {
      this.errors.push(error)
    })
  },
  components: {
    Carousel,
    Slide,
    petDetails
  }
}
</script>
<style>
.VueCarousel {
  width: 90%;
  margin: 0 auto;
}
</style>
