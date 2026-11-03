export default {
  setUsers(state, users) {
    state.users = users
  },
  addUser(state, user) {
    state.users.push(user)
  },
  updateUser(state, user) {
    const index = state.users.findIndex((u) => u.id === user.id)
    if (index !== -1) {
      state.users[index] = user
    }
  },
  updateUserAddresses(state, { userId, addresses }) {
    const index = state.users.findIndex((u) => u.userId === userId || u.id === userId)
    if (index !== -1) {
      state.users[index] = {
        ...state.users[index],
        addresses,
      }
    }
  },
}
