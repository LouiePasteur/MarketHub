export default {
  stores(state) {
    return state.stores
  },
  myStore(state, _, __, rootGetters) {
    return state.stores.find(
      (store) => store.storeOwnerId === rootGetters['user/currentUser'].userId,
    )
  },
}
