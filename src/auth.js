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
        context.$http.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`
        context.$router.go(-1)
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
    const jwt = sessionStorage.getItem('token')
    jwt ? this.user.authenticated = true : this.user.authenticated = false
  }
}
