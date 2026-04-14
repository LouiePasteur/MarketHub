import { createStore } from 'vuex'
import auth from './modules/auth'
import userModule from './modules/user'
import storesModule from './modules/stores'
import productsModule from './modules/products'

const store = createStore({
  modules: { auth, user: userModule, stores: storesModule, products: productsModule },
})

export default store
