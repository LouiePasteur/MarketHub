export default {
  users(state) {
    return state.users
  },
  userByEmail: (state) => (email) => state.users.find((user) => user.email === email),
  userByPhone: (state) => (phone) => state.users.find((user) => user.phone === phone),
  currentUser(state, _, rootState) {
    const authUserId = rootState.auth.userId
    return state.users.find((user) => user.userId === authUserId) || null
  },
}
