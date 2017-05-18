<template>
  <div>
      <h6>Dodaj komentarz</h6>
      <textarea name="comment" id="comment" cols="40" rows="5" maxlength="500" v-model="newComment"></textarea><br>
      <button @click="addNewComment" class="btn">Dodaj</button>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        newComment: '',
        errors: []
      }
    },
    props: ['petId'],
    computed: {
      timestamp () {
        return moment().unix() * 1000
      }
    },
    methods: {
      addNewComment () {
        const newComment = {
          id: sessionStorage.getItem('userId'),
          contents: this.newComment,
          userUuid: sessionStorage.getItem('userId'),
          petUuid: this.petId,
          state: 'ACTIVE',
          created: this.timestamp,
          lastModified: this.timestamp
        }
        this.$emit('newComment', [newComment])
        this.$http.post(this.apiUrl + 'comments', newComment)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            this.errors.push(error)
          })
      }
    }
  }
</script>
<style lang="sass">
  @import "../assets/styles/variables.sass"
  #comment
    resize: none
    outline: none
    font: $font-stack
    font-size: 2em
</style>
