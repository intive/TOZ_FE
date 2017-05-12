export default {
  user: {
    authenticated: false
  },
  login (context, creds) {
    context.$http.post(context.apiUrl + 'tokens/acquire', creds)
      .then(response => {
        console.log(response)
        sessionStorage.setItem('token', response.data.jwt)
        this.user.authenticated = true
        context.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')
      })
       .catch(error => {
         console.log(error)
       })
  },
  logout () {
    sessionStorage.removeItem('token')
    this.user.authenticated = false
  },
  checkAuth () {
    var jwt = sessionStorage.getItem('token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  }
}
