export default {
  addStoreComment(state, payload) {
    state.storeComments.push(payload)
  },
  addProductComment(state, payload) {
    state.productComments.push(payload)
  },
  editStoreComment(state, payload) {
    const index = state.storeComments.findIndex((comment) => comment.id === payload.id)
    if (index !== -1) {
      state.storeComments[index] = payload
    }
  },
  editProductComment(state, payload) {
    const index = state.productComments.findIndex((comment) => comment.id === payload.id)
    if (index !== -1) {
      state.productComments[index] = payload
    }
  },
  deleteStoreComment(state, payload) {
    state.storeComments = state.storeComments.filter((comment) => comment.id !== payload.id)
  },
  deleteProductComment(state, payload) {
    state.productComments = state.productComments.filter((comment) => comment.id !== payload.id)
  },
  setStoreComments(state, payload) {
    state.storeComments = payload
  },
  setProductComments(state, payload) {
    state.productComments = payload
  },
  likeStoreComment(state, payload) {
    const index = state.storeComments.findIndex((comment) => comment.id === payload.id)
    if (index !== -1) {
      state.storeComments[index].likeCount++
      state.storeComments[index].likers.push(payload.likerId)
    }
  },
  likeProductComment(state, payload) {
    const index = state.productComments.findIndex((comment) => comment.id === payload.id)
    if (index !== -1) {
      state.productComments[index].likeCount++
      state.productComments[index].likers.push(payload.likerId)
    }
  },
  unlikeStoreComment(state, payload) {
    const index = state.storeComments.findIndex((comment) => comment.id === payload.id)
    if (index !== -1) {
      state.storeComments[index].likeCount--
      state.storeComments[index].likers = state.storeComments[index].likers.filter(
        (liker) => liker !== payload.likerId,
      )
    }
  },
  unlikeProductComment(state, payload) {
    const index = state.productComments.findIndex((comment) => comment.id === payload.id)
    if (index !== -1) {
      state.productComments[index].likeCount--
      state.productComments[index].likers = state.productComments[index].likers.filter(
        (liker) => liker !== payload.likerId,
      )
    }
  },
}
