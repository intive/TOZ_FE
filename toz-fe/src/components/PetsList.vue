<template>
  <div class="posrel">
  <carousel :navigationEnabled="true" :paginationEnabled="false" :navigationClickTargetSize="0" :perPageCustom="[[768, 3], [1024, 5]]">
    <slide v-for="pet in petsList.petsTable" :key="pet.name" >
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
import petDetails from '@/components/petDetails'
import Modal from './Modal.vue'
export default {
  data () {
    return {
      petsList: {},
      errors: [],
      showModal: false,
      currentPet: {}
    }
  },
  created () {
    this.$http.get('/petsInfo')
    .then(response => {
      this.petsList = {...response.data}
      console.log(response.data)
    })
    .catch(error => {
      this.errors.push(error)
    })
  },
  methods: {
    openModal (pet) {
      this.showModal = true
      this.currentPet.name = pet.name
      this.currentPet.description = pet.description
    }
  },
  components: {
    Carousel,
    Slide,
    petDetails,
    Modal
  }
}
</script>
<style>
.VueCarousel {
  width: 90%;
  margin: 0 auto;
}
</style>
