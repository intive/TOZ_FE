<template>
  <div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <carousel v-else :navigationEnabled="true" :paginationEnabled="false" :navigationClickTargetSize="0" :perPageCustom="responsiveBreakpoints" class="carousel">
      <slide v-for="pet in petsList" :key="pet.id" >
        <router-link :to="{name: 'petDetails', params:{ id: pet.id }}">
          <div class="sliderContent">
            <img src="http://lorempixel.com/200/200/" alt="pet photo">
            <h2>{{ $t("pets.name") }}: {{ pet.name }}</h2>
            <h2>{{ $t("pets.type") }}: {{ pet.type }}</h2>
            <h2>{{ $t("pets.sex") }}: {{ pet.sex }}</h2>
          </div>
        </router-link>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
// import MockAdapter from 'axios-mock-adapter'
// import petsTable from '@/petsMock'

export default {
  data () {
    return {
      petsList: [],
      errors: [],
      responsiveBreakpoints: [[768, 3], [1024, 5]]
    }
  },
  created () {
    // const mock = new MockAdapter(this.$http)
    // mock.onGet('/petsInfo').reply(200, petsTable)
    this.$http.get('http://dev.patronage2017.intive-projects.com/pets')
    // this.$http.get('/petsInfo')
    .then(response => {
      this.petsList = [...response.data]
    })
    .catch(error => {
      this.errors.push(error)
    })
  },
  components: {
    Carousel,
    Slide
  }
}
</script>
<style>
.VueCarousel {
  width: 90%;
  margin: 0 auto;
}
</style>
