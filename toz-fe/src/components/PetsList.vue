<template>
  <div class="posrel">
  <carousel :navigationEnabled="true" :paginationEnabled="false" :navigationClickTargetSize="0" :perPageCustom="[[768, 3], [1024, 5]]">
    <slide v-for="pet of pets[0]" :key="pet.name" >
      <div @click="openModal(pet)">
        <img :src="pet.profilePic" alt="pet photo">
        <h2>Imię: {{ pet.name }}</h2>
        <h2>Typ: {{ pet.type }}</h2>
      </div>
    </slide>
  </carousel>
    <modal v-if="showModal" @close="showModal = false">
      <h1 slot="header">{{ currentPet.name }}</h1>
      <h2 slot="header">{{ currentPet.description }}</h2>
    </modal>
  <!--<petDetails :details="this.currentPet" v-if="showDetails" @close="showDetails = false"></petDetails>-->
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import petDetails from '@/components/petDetails'
import Modal from './Modal.vue'
export default {
  data () {
    return {
      pets: [],
      errors: [],
      showModal: false,
      currentPet: {}
    }
  },
  created () {
    this.$http.get(`https://private-anon-1d69436fab-zwierzakiandroid.apiary-mock.com/pets`)
    .then(response => {
      this.pets.push(response.data)
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
