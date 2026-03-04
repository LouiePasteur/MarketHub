import router from '@/router'
export default {
  async fetchUsers(context) {
    const response = await fetch(
      'https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/users.json',
    )
    const responseData = await response.json()
    const users = []
    for (const key in responseData) {
      users.push({
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

    await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/users/${responseData.name}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ id: responseData.name }),
      },
    )

    const newUser = {
      id: responseData.name,
      userId: userId,
      email: userEmail,
      firstName: userFirstName,
      lastName: userLastName,
      phone: userPhone,
      address: userAddress,
      cart: userCart,
      orders: userOrders,
      addresses: userAddresses,
      paymentMethods: userPaymentMethods,
      followers: userFollowers,
      followedStores: userFollowedStores,
      settings: userSettings,
    }
    context.commit('addUser', newUser)

    const currentRoute = router.currentRoute.value
    const redirectPath = currentRoute?.query?.redirect || `user/${newUser.id}/edit`
    const redirectUrl = `/${redirectPath}`

    router.push(redirectUrl)
  },

  async updateUser(context, payload) {
    const id = payload.id
    const userId = payload.userId
    const userEmail = payload.email
    const userFirstName = payload.firstName
    const userLastName = payload.lastName
    const userPhone = payload.phone
    const userAddress = payload.address
    const userCart = payload.cart
    const userOrders = payload.orders
    const userAddresses = payload.addresses
    const userPaymentMethods = payload.paymentMethods
    const userFollowers = payload.followers
    const userFollowedStores = payload.followedStores
    const userSettings = payload.settings

    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          userId: userId,
          email: userEmail,
          firstName: userFirstName,
          lastName: userLastName,
          phone: userPhone,
          address: userAddress,
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
    console.log('currentUser2', context.rootGetters['user/currentUser'])

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to update user')
      throw error
    }

    const updatedUser = {
      id: id,
      userId: userId,
      email: userEmail,
      firstName: userFirstName,
      lastName: userLastName,
      phone: userPhone,
      address: userAddress,
      cart: userCart,
      orders: userOrders,
      addresses: userAddresses,
      paymentMethods: userPaymentMethods,
      followers: userFollowers,
      followedStores: userFollowedStores,
      settings: userSettings,
    }
    context.commit('updateUser', updatedUser)
  },
}
