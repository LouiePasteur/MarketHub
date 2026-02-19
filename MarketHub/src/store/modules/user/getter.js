export default{
    users(state){
        return state.users
    },
    userByEmail(state){
        return state.users.find(user => user.email === email)
    },
    userByPhone(state){
        return state.users.find(user => user.phone === phone)
    }
}