export default {
  async fetchUsers(context) {
    const response = await fetch(
      'https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/users.json',
    )
    const responseData = await response.json()
    const users = []
    for (const key in responseData) {
      users.push({
        id: key,
        ...responseData[key],
      })
    }
    context.commit('setUsers', users)
  },
  async addUser(context, payload) {
    const userId = payload.userId
    const userEmail = payload.email
    // Get user details from rootGetters if they exist, otherwise use empty strings
    const userFirstName = context.rootGetters.userFirstName || ''
    const userLastName = context.rootGetters.userLastName || ''
    const userPhone = context.rootGetters.userPhone || ''
    const userAddress = context.rootGetters.userAddress || []
    const userCart = context.rootGetters.userCart || []
    const userOrders = context.rootGetters.userOrders || []
    const userAddresses = context.rootGetters.userAddresses || []
    const userPaymentMethods = context.rootGetters.userPaymentMethods || []
    const userFollowers = context.rootGetters.userFollowers || []
    const userFollowedStores = context.rootGetters.userFollowedStores || []
    const userSettings = context.rootGetters.userSettings || []

    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?auth=${context.rootGetters.token}`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          email: userEmail,
          firstName: userFirstName,
          lastName: userLastName,
          phone: userPhone,
          cart: userCart,
          orders: userOrders,
          addresses: userAddresses,
          paymentMethods: userPaymentMethods,
          followers: userFollowers,
          followedStores: userFollowedStores,
          settings: userSettings,
        }),
      },
    )
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to add user')
      throw error
    }

    const newUser = {
      id: userId,
      email: userEmail,
      firstName: userFirstName,
      lastName: userLastName,
      phone: userPhone,
      address: userAddress,
    }
    context.commit('users/addUser', newUser)
  },
}
