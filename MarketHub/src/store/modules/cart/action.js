const quantityUpdateTimers = {}

export default {
  async fetchCartItems(context) {
    const token = context.rootGetters.token
    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems.json${token ? `?auth=${token}` : ''}`,
    )
    const responseData = await response.json()
    const cartItems = []
    if (responseData) {
      for (const key in responseData) {
        cartItems.push({
          ...responseData[key],
          id: responseData[key].id || key,
        })
      }
    }
    context.commit('setCartItems', cartItems)
  },

  async addCartItem(context, payload) {
    const currentUser = context.rootGetters['user/currentUser']
    const token = context.rootGetters.token

    if (!currentUser?.userId || !token) {
      throw new Error('You must be logged in to add an item to your cart.')
    }

    const stores = context.rootGetters['stores/stores'] || []
    const store = stores.find(
      (item) =>
        String(item.id) === String(payload.productStoreId) ||
        String(item.storeId) === String(payload.productStoreId),
    )
    const productStoreName = payload.productStoreName || store?.storeName || ''

    const cartItem = {
      id: '',
      cartOwnerId: currentUser.userId,
      productId: payload.productId,
      productName: payload.productName,
      productPrice: payload.productPrice,
      productQuantity: payload.productQuantity,
      productImage: payload.productImage,
      productStoreId: payload.productStoreId,
      productStoreName: productStoreName,
    }

    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems.json?auth=${token}`,
      {
        method: 'POST',
        body: JSON.stringify(cartItem),
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      throw new Error(responseData.error || responseData.message || 'Failed to add item to cart')
    }

    await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems/${responseData.name}.json?auth=${token}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ id: responseData.name }),
      },
    )

    const newCartItem = {
      ...cartItem,
      id: responseData.name,
    }
    context.commit('addCartItem', newCartItem)
  },

  async updateCartItem(context, payload) {
    const currentUser = context.rootGetters['user/currentUser']
    const token = context.rootGetters.token

    if (!currentUser?.userId || !token) {
      throw new Error('You must be logged in to update an item in your cart.')
    }

    const existingItem = context.state.cartItems.find((item) => item.id === payload.id)
    if (!existingItem) {
      throw new Error('Cart item not found.')
    }

    const updatedItem = {
      ...existingItem,
      ...payload,
    }
    context.commit('updateCartItem', updatedItem)

    if (quantityUpdateTimers[payload.id]) {
      clearTimeout(quantityUpdateTimers[payload.id])
    }

    quantityUpdateTimers[payload.id] = setTimeout(async () => {
      const latestItem = context.state.cartItems.find((item) => item.id === payload.id)
      if (!latestItem) {
        return
      }

      try {
        const response = await fetch(
          `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems/${payload.id}.json?auth=${token}`,
          {
            method: 'PATCH',
            body: JSON.stringify({
              productQuantity: latestItem.productQuantity,
            }),
          },
        )
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(
            responseData.error || responseData.message || 'Failed to update item in cart',
          )
        }
        context.commit('updateCartItem', {
          ...latestItem,
          ...responseData,
        })
      } catch (error) {
        await context.dispatch('fetchCartItems')
      }
    }, 400)
  },

  async deleteCartItem(context, payload) {
    const token = context.rootGetters.token
    if (!token) {
      throw new Error('You must be logged in to delete an item from your cart.')
    }

    const id = typeof payload === 'string' ? payload : payload?.id

    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems/${id}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    )
    if (!response.ok) {
      const responseData = await response.json()
      throw new Error(
        responseData.error || responseData.message || 'Failed to delete item from cart',
      )
    }
    context.commit('deleteCartItem', { id })
  },
}
