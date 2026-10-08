export default {
  setCartItems(state, payload) {
    state.cartItems = payload
  },
  addCartItem(state, payload) {
    state.cartItems.push(payload)
  },
  updateCartItem(state, payload) {
    const index = state.cartItems.findIndex((item) => item.id === payload.id)
    if (index !== -1) {
      state.cartItems[index] = payload
    }
  },
  deleteCartItem(state, payload) {
    state.cartItems = state.cartItems.filter((item) => item.id !== payload.id)
  },
}
