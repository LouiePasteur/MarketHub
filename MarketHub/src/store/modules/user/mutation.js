export default {
  setUsers(state, users) {
    state.users = users
  },
  addUser(state, user) {
    state.users.push(user)
    console.log('all Users in add user', state.users.length)
  },
  updateUser(state, user) {
    const index = state.users.findIndex((u) => u.id === user.id)
    if (index !== -1) {
      state.users[index] = user
    }
  },
}
