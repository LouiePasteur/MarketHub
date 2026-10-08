import mutations from './mutation'
import actions from './action'
import getters from './getter'

export default {
  namespaced: true,
  state() {
    return {
      cartItems: [],
    }
  },
  mutations,
  actions,
  getters,
}
