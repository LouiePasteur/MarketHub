export default{
    async fetchUsers(context){
        const response = await fetch('https://markethub-13478-default-rtdb.firebaseio.com/users.json')
        const responseData = await response.json()
        const users = []
        for(const key in responseData){
            users.push({
                id: key,
                ...responseData[key]
            })
        }
        context.commit('setUsers', users)
    },
    async addUser(context, payload){
        const userId = payload.userId
        const userEmail = payload.email
        // Get user details from rootGetters if they exist, otherwise use empty strings
        const userFirstName = context.rootGetters.userFirstName || ''
        const userLastName = context.rootGetters.userLastName || ''
        const userPhone = context.rootGetters.userPhone || ''
        const userAddress = context.rootGetters.userAddress || ''

        const response = await fetch('https://markethub-13478-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                email: userEmail,
                firstName: userFirstName,
                lastName: userLastName,
                phone: userPhone,
                address: userAddress,
            }),
        })
        const responseData = await response.json()

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to add user')
            throw error
        }

        const newUser = {
            id: userId,
            email: userEmail,
            firstName: userFirstName,
            lastName: userLastName,
            phone: userPhone,
            address: userAddress,
        }
        context.commit('users/addUser', newUser)

    }
}