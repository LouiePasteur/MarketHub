import mutations from './mutation'
import actions from './action'
import getters from './getter'

export default {
  namespaced: true,
  state() {
    return {
      users: [
        {
          id: '1',
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          addresses: [
            { addressLine: '123 Main St, Anytown, USA', isDefault: true },
          ],
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
