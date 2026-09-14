export default {
  addProduct(state, payload) {
    state.products.push(payload)
  },
  deleteProduct(state, payload) {
    state.products = state.products.filter((product) => product.id !== payload.id)
  },
  updateProduct(state, payload) {
    const index = state.products.findIndex((product) => product.id === payload.id)
    if (index !== -1) {
      state.products[index] = payload
    }
  },
  setProducts(state, payload) {
    state.products = payload
  },
}
