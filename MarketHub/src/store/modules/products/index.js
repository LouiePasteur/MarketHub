import mutations from './mutation'
import actions from './actions'
import getters from './getter'

export default {
  namespaced: true,
  state() {
    return {
      products: [],
    }
  },
  mutations,
  actions,
  getters,
}
