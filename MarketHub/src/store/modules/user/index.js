import mutations from './mutation'
import actions from './action'
import getters from './getter'

export default {
  namespaced: true,
  state() {
    return {
      users: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          addresses: ['123 Main St, Anytown, USA'],
          cart: [],
          orders: [],
          paymentMethods: [],
          followers: [],
          followedStores: [],
          settings: [],
        },
      ],
    }
  },
  mutations,
  actions,
  getters,
}
