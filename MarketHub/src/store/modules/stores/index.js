import mutations from './mutation'
import actions from './action'
import getters from './getter'

export default {
  namespaced: true,
  state() {
    return {
      stores: [],
      myStore: null,
    }
  },
  mutations,
  actions,
  getters,
}
