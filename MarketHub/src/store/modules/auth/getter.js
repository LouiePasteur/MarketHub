export default {
  userId(state) {
    return state.userId
  },
  token(state) {
    return state.token
  },
  currentUser(state) {
    return state.users.find((user) => user.userId === state.userId)
  },
}
