export default {
  stores(state) {
    return state.stores
  },
  myStore(state) {
    return state.stores.find((store) => store.ownerId === state.userId)
  },
}
