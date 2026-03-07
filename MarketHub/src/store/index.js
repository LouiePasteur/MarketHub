import { createStore } from 'vuex'
import auth from './modules/auth'
import userModule from './modules/user'
import storesModule from './modules/stores'

const store = createStore({ modules: { auth, user: userModule, stores: storesModule } })

export default store
