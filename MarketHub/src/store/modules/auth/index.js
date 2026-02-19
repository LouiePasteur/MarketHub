import mutations from './mutation'
import actions from './action'
import getters from './getter'

export default {
  state() {
    return {
      userId: null,
      token: null,
      autoLogout: false,
      email: null,
    }
  },
  mutations,
  actions,
  getters,
}
