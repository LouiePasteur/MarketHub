export default {
  products(state) {
    return state.products
  },
  myProducts(state, _, __, rootGetters) {
    return state.products.filter((product) => rootGetters['stores/myStore'].id === product.storeId)
  },
}
