<template>
  <div class="container wrapper">
      <h6 class="header">{{$t('comments.newComment.addComment')}}</h6>
      <textarea name="comment" class="comment" maxlength="500" :placeholder="$t('comments.newComment.placeholder')" v-model="newComment"></textarea><br>
      <span v-show="errorFlag" class="error">{{$t('comments.newComment.errorMessage')}}</span>
      <button @click="addNewComment" class="btn addBTN">{{$t('common.button.add')}}</button>
      <hr>
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
<style lang="sass" scoped>
  @import "../assets/styles/variables.sass"
  .wrapper
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center
    @media screen and (max-width: 576px)
      right: 2em
  .comment
    margin: 0 auto
    resize: none
    outline: none
    font: $font-stack
    font-size: 2em
    width: 35vw
    height: 25vh
    border-color: lightgray
    @media screen and (max-width: 576px)
      width: 87vw
  .addBTN
    margin: 0 auto
    width: 12em
    height: 4em
    font: $font-stack
    @media screen and (max-width: 576px)
      margin-left: 5em
      width: 50vw
  .error
    color: red
    font: $font-stack
    font-size: 1.5em
    @media screen and (max-width: 576px)
      width: 60vw
      font-size: 1.2em
  .header
    font: $font-stack
    @media screen and (max-width: 576px)
      margin-left: 2.5em
      width: 55vw
</style>
