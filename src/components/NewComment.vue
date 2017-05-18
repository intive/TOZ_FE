<template>
  <div>
      <h6>Dodaj komentarz</h6>
      <textarea name="comment" id="comment" cols="40" rows="5" maxlength="500" v-model="newComment"></textarea><br>
      <span v-show="errorFlag" class="error">Pole komentarza nie może być puste</span>
      <button @click="addNewComment" class="btn">Dodaj</button>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        newComment: '',
        errorFlag: false,
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
        if (this.checkIfEmpty()) {
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
            .catch(error => {
              this.errors.push(error)
            })
        }
      },
      checkIfEmpty () {
        if (this.newComment === '') {
          this.errorFlag = true
          return false
        } else {
          this.errorFlag = false
          return true
        }
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
