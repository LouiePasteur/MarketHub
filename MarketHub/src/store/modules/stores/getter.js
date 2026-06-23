export default {
  stores(state) {
    return state.stores
  },
  myStore(state, _, __, rootGetters) {
    const userId = rootGetters['user/currentUser']?.userId
    if (!userId) {
      return undefined
    }
    return state.stores.find((store) => store.storeOwnerId === userId)
  },
}
