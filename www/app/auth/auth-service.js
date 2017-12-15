function AuthService() {
    var baseUrl = 'http://localhost:3000/'

    var auth = axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 2000,
        withCredentials: true
    })

    var currentUser = {}
    ///////////////////////////////////////////////////

    // console.log(app)


    // var currentLevel = app.controllers.authController.getUserLevel();
    // console.log("ZOMFG DID IT WORK?! " , currentLevel)

    // $.get(baseUrl + 'gamedata')
    // .then(res =>)



    ////////////////////////////////////////////////////

    function logError() {
        console.log('your request failed')
    }

    this.login = function login(user, cb) {
        auth.post('login', user)
            .then(res => {
                console.log('login', res.data)
                currentUser = res.data.data
                cb(res)
                getGameData()
            })
            .catch(logError)
    }



    this.registration = function registration(form, cb) {
        auth.post('register', form)
            .then(res => {
                currentUser = res.data.data
                cb(res)
                getGameData()
            })
            .catch(logError)
    }

    this.authenticate = function authenticate(drawLogin, drawLogout) {
        auth('authenticate')
            .then(res => {
        
                console.log('authenicate', res.data.data)
                currentUser = res.data.data
                console.log("hi hi hi ", currentUser)
                if (res.data.data.username) {
                    drawLogout(res)
                    getGameData()
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
                currentUser = {}
                getGameData()
            })
            .catch(logError)
    }

    this.getUserLevel = function getUserLevel() {
        if (!currentUser.currentLevel) {
            return 0
        } else {
            return currentUser.currentLevel
        }
        console.log("hey there buddy ", currentUser)
    }
}