export default {
  addStore(state, payload) {
    state.stores.push(payload)
  },
  setStores(state, payload) {
    state.stores = payload
  },
  updateStore(state, payload) {
    const index = state.stores.findIndex((s) => s.id === payload.id)
    if (index !== -1) {
      state.stores[index] = payload
    }
  },
}
