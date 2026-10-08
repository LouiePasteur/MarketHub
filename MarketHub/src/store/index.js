import { createStore } from 'vuex'
import auth from './modules/auth'
import userModule from './modules/user'
import storesModule from './modules/stores'
import productsModule from './modules/products'
import commentsModule from './modules/comments'
import cartModule from './modules/cart'

const store = createStore({
  modules: {
    auth,
    user: userModule,
    stores: storesModule,
    products: productsModule,
    comments: commentsModule,
    cart: cartModule,
  },
})

export default store
