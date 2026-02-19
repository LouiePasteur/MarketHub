import { createStore } from 'vuex'
import auth from './modules/auth'
import userModule from './modules/user'

const store = createStore({ modules: { auth, user: userModule } })

export default store
