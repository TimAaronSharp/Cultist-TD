function AuthController() {
    var authService = new AuthService()

    function drawWelcome(res) {
        if(res.data) {
            var template = ''
            template = `
                <h3> Welcome ${res.data.username} </h3>
            `
            document.getElementById('welcome').innerHTML = template
        } else {
            var template = ''
            template = `
                <h3> Welcome </h3>
            `
            document.getElementById('welcome').innerHTML = template
        }
    }

    this.login = function login(event) {
        // debugger
        event.preventDefault()
        var loginData = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        authService.login(loginData, drawWelcome)
        $('#login').submit(function(e) {
            e.preventDefault();
            // Coding
            $('#loginModal').modal('toggle'); //or  $('#IDModal').modal('hide');
            return false;
        });

    }

   

    this.registration = function registration(event) {
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
            authService.registration(registerData, drawWelcome)
            $('#registration').submit(function(e) {
                e.preventDefault();
                $('#registerModal').modal('toggle');
                return false;
            });
            $('#login').submit(function(e) {
                e.preventDefault();
                // Coding
                $('#loginModal').modal('toggle'); //or  $('#IDModal').modal('hide');
                return false;
            });
        }
    }

    this.logout = function logout() {
        authService.logout(drawWelcome)
    }

    authService.authenticate(drawWelcome)
}