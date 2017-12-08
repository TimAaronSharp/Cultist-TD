function AuthController() {
    var authService = new authService()

    this.login = function login(event) {
        event.preventDefault()
        var loginData = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        authService.login(loginData, drawNav)
    }

    function drawNav(res) {
        if(res.data) {
            
        }
    }

    this.registration = function registation(event) {
        event.preventDefault()
        if(event.target.password.value != event.target.reEnterPassword.value) {
            console.log('please re-enter password')
        } else {
            var registerData = {
                email: event.target.email.value,
                username: event.target.username.value,
                password: event.target.password.value
            }
            authService.registration(registerData, drawNav)
        }
    }

    this.logout = function logout() {
        authService.logout(drawNav)
    }

    authService.authenticate(drawNav)
}