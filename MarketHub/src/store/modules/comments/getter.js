export default {} {
    storeComments(state) {
        return state.storeComments
    },
    productComments(state) {
        return state.productComments
    },
    myStoreComments(state, _, __, rootGetters) {
        return state.storeComments.filter((comment) => rootGetters['stores/myStore'].id === comment.storeId)
    },
    myProductComments(state, _, __, rootGetters) {
        return state.productComments.filter((comment) => rootGetters['products/myProducts'].id === comment.productId)
    },
    isLikedStoreComment(state, _, __, rootGetters) {
        return state.storeComments.find((comment) => comment.id === rootGetters['user/currentUser'].userId)
    },
    isLikedProductComment(state, _, __, rootGetters) {
        return state.productComments.find((comment) => comment.id === rootGetters['user/currentUser'].userId)
    },
    averageStoreRating(state) {
        return state.storeComments.reduce((acc, comment) => acc + comment.rating, 0) / state.storeComments.length
    },
    averageProductRating(state) {
        return state.productComments.reduce((acc, comment) => acc + comment.rating, 0) / state.productComments.length
    },
}