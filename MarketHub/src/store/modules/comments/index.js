import mutations from './mutation'
import actions from './actions'
import getters from './getter'

export default {
  namespaced: true,
  state() {
    return {
      storeComments: [],
      productComments: [],
    }
  },
  mutations,
  actions,
  getters,
}
