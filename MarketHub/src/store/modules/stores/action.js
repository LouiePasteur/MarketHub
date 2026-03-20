import router from '@/router'

export default {
  async fetchStores(context) {
    const response = await fetch(
      'https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/stores.json',
    )
    const responseData = await response.json()
    const stores = []
    for (const key in responseData) {
      stores.push({
        ...responseData[key],
      })
    }
    context.commit('setStores', stores)
  },
  async addStore(context, payload) {
    const currentUser = context.rootGetters['user/currentUser']
    if (!currentUser?.userId) {
      throw new Error('You must be logged in to create a store.')
    }

    const id = ''
    const storeName = payload.storeName
    const storeImage = payload.storeImage ?? null
    const storeAddress = payload.storeAddress
    const storeDescription = payload.storeDescription
    const storeContact = payload.storeContact
    const storeEmail = payload.storeEmail
    const storeOwnerId = currentUser.userId
    const storeRate = payload.storeRate

    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/stores.json?auth=${context.rootGetters.token}`,
      {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          storeName: storeName,
          storeImage: storeImage,
          storeAddress: storeAddress,
          storeDescription: storeDescription,
          storeContact: storeContact,
          storeEmail: storeEmail,
          storeOwnerId: storeOwnerId,
          storeRate: storeRate,
        }),
      },
    )
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to add store')
      throw error
    }

    await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/stores/${responseData.name}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ id: responseData.name }),
      },
    )

    const newStore = {
      id: responseData.name,
      storeName: storeName,
      storeImage: storeImage,
      storeAddress: storeAddress,
      storeDescription: storeDescription,
      storeContact: storeContact,
      storeEmail: storeEmail,
      storeOwnerId: storeOwnerId,
      storeRate: storeRate,
    }
    context.commit('addStore', newStore)

    router.replace('/store')
  },

  async updateStore(context, payload) {
    const id = payload.id
    const storeName = payload.storeName
    const storeImage = payload.storeImage
    const storeAddress = payload.storeAddress
    const storeDescription = payload.storeDescription
    const storeContact = payload.storeContact
    const storeEmail = payload.storeEmail
    const storeOwnerId = context.rootGetters['user/currentUser']?.userId
    const storeRate = payload.storeRate

    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/stores/${id}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          storeName: storeName,
          storeImage: storeImage,
          storeAddress: storeAddress,
          storeDescription: storeDescription,
          storeContact: storeContact,
          storeEmail: storeEmail,
          storeOwnerId: storeOwnerId,
          storeRate: storeRate,
        }),
      },
    )
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to update store')
      throw error
    }

    const updatedStore = {
      id: id,
      storeName: storeName,
      storeImage: storeImage,
      storeAddress: storeAddress,
      storeDescription: storeDescription,
      storeContact: storeContact,
      storeEmail: storeEmail,
      storeOwnerId: storeOwnerId,
      storeRate: storeRate,
    }
    context.commit('updateStore', updatedStore)
    router.push('/products')
  },
}
