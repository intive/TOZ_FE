<template>
  <div class="container comment">
    <div v-if="loading" class="loader"></div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div class="row">
      <h6 class="col-lg-5 col-12 commentAuthor">{{currentUser.name}} {{currentUser.surname}}</h6>
      <button class="col-lg-2 col-12 editBtn" v-show="isAuthor" @click="editFlag = false">Edytuj</button>
    </div>
    <div class="row">
      <span v-show="errorFlag" class="error">{{$t('comments.newComment.errorMessage')}}</span>
      <textarea class="commentContent col-12" maxlength="500" spellcheck="false" :disabled="editFlag" v-model="newContents"></textarea><br>
      <span class="col-lg-5 commentDate">{{convertTimeStamp}}</span>
    </div>
    <div class="editWrapper" v-if="!editFlag">
      <button class="control saveBtn" @click="saveEditedComment">{{$t('common.button.save')}}</button>
      <button class="control cancelBtn" @click="cancelEdit">{{$t('common.button.cancel')}}</button>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        newContents: this.comment.contents,
        editedContent: '',
        currentUser: {
          name: '',
          surname: ''
        },
        isAuthor: false,
        editFlag: true,
        errorFlag: false,
        loading: true,
        errors: []
      }
    },
    props: ['comment'],
    computed: {
      convertTimeStamp () {
        const date = moment(this.comment.created).locale(this.$t('common.code'))
        return date.format(this.$t('common.dateFormat'))
      },
      createTimeStamp () {
        return moment().unix() * 1000
      }
    },
    created () {
      this.$http.get(this.apiUrl + 'users/' + this.comment.userUuid)
        .then(response => {
          this.currentUser.name = response.data.name
          this.currentUser.surname = response.data.surname
          this.loading = false
        })
        .catch(error => {
          this.errors.push(error)
          this.loading = false
        })
      this.checkCommentAuthor()
    },
    methods: {
      checkCommentAuthor () {
        const con = (sessionStorage.getItem('userId') === this.comment.userUuid) ? this.isAuthor = true : this.isAuthor = false
        return con
      },
      cancelEdit () {
        this.editFlag = !this.editFlag
        if (!this.editedContent) {
          this.newContents = this.comment.contents
        } else {
          this.newContents = this.editedContent
        }
      },
      saveEditedComment () {
        if (this.checkIfEmpty()) {
          const editedComment = {
            id: this.comment.id,
            contents: this.newContents,
            userUuid: this.comment.userUuid,
            petUuid: this.comment.petUuid,
            state: 'ACTIVE',
            created: this.comment.created,
            lastModified: this.createTimeStamp
          }
          this.$http.put(this.apiUrl + 'comments/' + this.comment.id, editedComment)
            .then(response => {
              this.editedContent = response.data.contents
              this.editFlag = true
            })
            .catch(error => {
              this.errors.push(error)
            })
        }
      },
      checkIfEmpty () {
        if (this.newContents === '') {
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

  .comment
    width: 50%
    height: 20%
    border-top: 0.1em solid lightgray
    margin: 1.5em auto
    @media screen and (max-width: 576px)
      width: 80%
      float: left
      left: 10%
  .commentContent
    width: 40em
    height: 17em
    font: $font-stack
    font-size: 1.2em
    background-color: #fff
    resize: none
    outline: none
  textarea
    resize: none
    outline: none
    &:disabled
        background-color: #fff
        border: 0
        font: $font-stack
        font-size: 1.2em

  .error
    color: red
    font: $font-stack

  .editBtn
    left: 10em
    margin: 1em auto
    font-size: 1em
    width: .1em
    height: 2.2em
    padding: 0.1em
    background-color: $orange
    border: 0
    border-radius: 2px
    color: #ffffff
    text-transform: uppercase
    text-decoration: none
    box-sizing: border-box
    &:hover
        background-color: #FFAF4F
    @media screen and (max-width: 576px)
      left: 0
      margin: 0 0 1.5em 0

  .editWrapper
    position: absolute
    bottom: 1em
    right: 43em
    width: 20%
    @media screen and (max-width: 576px)
      width: 50%
      right: 6.2em
      top: 75%
      margin: 1.5em 0 1.5em 0
    .control
      border: 0
      border-radius: 2px
      color: #ffffff
      text-transform: uppercase
      text-decoration: none
      box-sizing: border-box
      padding: .5em
    .saveBtn
      background-color: $orange
      &:hover
        background-color: #FFAF4F
    .cancelBtn
      background-color: $silver


  .commentDate
    left: 10em
    margin: 0.1em auto
    font-size: 2.1em
    padding: 0.1em
    @media screen and (max-width: 576px)
      left: 0
      right: 10em
      font-size: 1.4em
      padding: 0
      margin: 4em 0 0 0
    &:before
      margin: 0 0 0.5em 0.5em
      padding-right: .3em
      content: '|'

  .commentAuthor
    right: 1.2em
    font-size: 2em !important
    padding: 0.3em
    margin-top: 0.1em
    @media screen and (max-width: 576px)
      right: 0
      font-size: 1.4em !important
      padding: 0
</style>
