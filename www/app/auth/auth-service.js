function AuthService() {
    var baseUrl = 'http://localhost:3000/'

    var auth = axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 2000,
        withCredentials: true
    })

    var user = {}

    function logError() {
        console.log('your request failed')
    }

    this.login = function login(user, cb) {
        console.log(user)
        $.post(baseUrl + 'login', user)
            .then(res => {
                console.log(res)
                cb(res)
                // user = res
                // console.log(user)
                
                // return res
                
            })
            .fail(logError)
    }

    this.registration = function registration(form, cb) {
        $.post(baseUrl + 'register', form)
            .then(res => {
                cd(res)
            })
            .fail(logError)
    }

    this.authenticate = function authenticate(cb) {
        auth('authenticate')
            .then(res => {
                console.log('authenticated: ', res)
                cb(res)
            })
            .catch(logError)
    }


    this.logout = function logout(cb) {
        $.ajax({
            url: baseUrl + 'logout',
            method: 'DELETE'
        })
            .then(res => {
                user = {}
                console.log('logout: ', res)
                cb(user)
            })
            .fail(logError)
    }
}