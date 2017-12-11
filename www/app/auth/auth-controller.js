function AuthController() {
    var authService = new AuthService()

    this.login = function login(event) {
        debugger
        event.preventDefault()
        var loginData = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        authService.login(loginData)
    }

   

    this.registration = function registation(event) {
        debugger
        event.preventDefault()
        if(event.target.password.value != event.target.reEnterPassword.value) {
            console.log('please re-enter password')
        } else {
            var registerData = {
                email: event.target.email.value,
                username: event.target.username.value,
                password: event.target.password.value
            }
            authService.registration(registerData)
        }
    }

    this.logout = function logout() {
        authService.logout
    }

    // authService.authenticate
}