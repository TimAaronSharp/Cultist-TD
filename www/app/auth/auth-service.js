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
        auth.post('login', user)
            .then(res => {
                console.log('login', res.data)
                cb(res)
            })
            .catch(logError)
    }



    this.registration = function registration(form, cb) {
        auth.post('register', form)
            .then(res => {
                cb(res)
                
            })
            .catch(logError)
    }

    this.authenticate = function authenticate(drawLogin, drawLogout) {
        auth('authenticate')
            .then(res => {
                console.log('authenicate', res.data.data)
                if (res.data.data.username) {
                    drawLogout(res)
                } else {
                    drawLogin(res)
                }
            })
            .catch(logError)
    }


    this.logout = function logout(cb) {
        auth.delete('logout')
            .then(res => {
                user = {}
                console.log('logout: ', res)
                cb(res)
            })
            .catch(logError)
    }
}