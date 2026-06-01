export default {
  async fetchStoreComments(context) {
    const response = await fetch(
      'https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/storeComments.json',
    )
    const responseData = await response.json()
    const storeComments = []
    for (const key in responseData) {
      storeComments.push({
        ...responseData[key],
      })
    }
    context.commit('setStoreComments', responseData)
  },
  async fetchProductComments(context) {
    const response = await fetch(
      'https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/productComments.json',
    )
    const responseData = await response.json()
    const productComments = []
    for (const key in responseData) {
      productComments.push({
        ...responseData[key],
      })
    }
    context.commit('setProductComments', responseData)
  },
  async addStoreComment(context, payload) {
    const currentUser = context.rootGetters['user/currentUser']
    if (!currentUser?.userId) {
      throw new Error('You must be logged in to add a store comment.')
    }

    const id = ''
    const storeId = payload.storeId
    const comment = payload.comment
    const commenterId = context.rootGetters['user/currentUser'].userId
    const commenterName = currentUser.firstName + ' ' + currentUser.lastName
    const commenterProfile = currentUser.profilePicture
    const rating = payload.rating
    const commentDate = new Date().toISOString()
    const likeCount = 0
    const likers = []

    const response = await fetch(
      'https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/storeComments.json',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to add store comment')
      throw error
    }

    await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/storeComments/${responseData.name}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ id: responseData.name }),
      },
    )
    const newStoreComment = {
      id: responseData.name,
      storeId: storeId,
      comment: comment,
      commenterId: commenterId,
      commenterName: commenterName,
      commenterProfile: commenterProfile,
      rating: rating,
      commentDate: commentDate,
      likeCount: likeCount,
      likers: likers,
    }
    context.commit('addStoreComment', newStoreComment)
  },
  async addProductComment(context, payload) {
    const currentUser = context.rootGetters['user/currentUser']
    if (!currentUser?.userId) {
      throw new Error('You must be logged in to add a product comment.')
    }

    const id = ''
    const productId = payload.productId
    const comment = payload.comment
    const commenterId = context.rootGetters['user/currentUser'].userId
    const commenterName = currentUser.firstName + ' ' + currentUser.lastName
    const commenterProfile = currentUser.profilePicture
    const rating = payload.rating
    const commentDate = new Date().toISOString()
    const likeCount = 0
    const likers = []

    const response = await fetch(
      'https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/productComments.json',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to add product comment')
      throw error
    }

    await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/productComments/${responseData.name}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ id: responseData.name }),
      },
    )
    const newProductComment = {
      id: responseData.name,
      productId: productId,
      comment: comment,
      commenterId: commenterId,
      commenterName: commenterName,
      commenterProfile: commenterProfile,
      rating: rating,
      commentDate: commentDate,
      likeCount: likeCount,
      likers: likers,
    }
    context.commit('addProductComment', newProductComment)
  },
  async editStoreComment(context, payload) {
    const id = payload.id
    const storeId = payload.storeId
    const comment = payload.comment
    const commenterId = context.rootGetters['user/currentUser'].userId
    const commenterName = currentUser.firstName + ' ' + currentUser.lastName
    const commenterProfile = currentUser.profilePicture
    const rating = payload.rating
    const commentDate = new Date().toISOString()
    const likeCount = payload.likeCount
    const likers = payload.likers
    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/storeComments/${id}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          comment: comment,
          rating: rating,
          commentDate: commentDate,
          likeCount: likeCount,
          likers: likers,
        }),
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to edit store comment')
      throw error
    }
    const updatedStoreComment = {
      id: id,
      storeId: storeId,
      comment: comment,
      commenterId: commenterId,
      commenterName: commenterName,
      commenterProfile: commenterProfile,
      rating: rating,
      commentDate: commentDate,
      likeCount: likeCount,
      likers: likers,
    }
    context.commit('editStoreComment', updatedStoreComment)
  },
  async editProductComment(context, payload) {
    const id = payload.id
    const productId = payload.productId
    const comment = payload.comment
    const commenterId = context.rootGetters['user/currentUser'].userId
    const commenterName = currentUser.firstName + ' ' + currentUser.lastName
    const commenterProfile = currentUser.profilePicture
    const rating = payload.rating
    const commentDate = new Date().toISOString()
    const likeCount = payload.likeCount
    const likers = payload.likers
    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/productComments/${id}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          comment: comment,
          rating: rating,
          commentDate: commentDate,
          likeCount: likeCount,
          likers: likers,
        }),
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to edit product comment')
      throw error
    }
    const updatedProductComment = {
      id: id,
      productId: productId,
      comment: comment,
      commenterId: commenterId,
      commenterName: commenterName,
      commenterProfile: commenterProfile,
      rating: rating,
      commentDate: commentDate,
      likeCount: likeCount,
      likers: likers,
    }
    context.commit('editProductComment', updatedProductComment)
  },
  async deleteStoreComment(context, payload) {
    const id = payload.id
    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/storeComments/${id}.json?auth=${context.rootGetters.token}`,
      {
        method: 'DELETE',
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to delete store comment')
      throw error
    }
    context.commit('deleteStoreComment', id)
  },
  async deleteProductComment(context, payload) {
    const id = payload.id
    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/productComments/${id}.json?auth=${context.rootGetters.token}`,
      {
        method: 'DELETE',
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
    }
    context.commit('deleteProductComment', id)
  },
  async likeStoreComment(context, payload) {
    const id = payload.id
    const likerId = context.rootGetters['user/currentUser'].userId
    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/storeComments/${id}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PUT',
        body: JSON.stringify({ likerId: likerId }),
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to like store comment')
      throw error
    }
    context.commit('likeStoreComment', id)
  },
  async likeProductComment(context, payload) {
    const id = payload.id
    const likerId = context.rootGetters['user/currentUser'].userId
    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/productComments/${id}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PUT',
        body: JSON.stringify({ likerId: likerId }),
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to like product comment')
      throw error
    }
    context.commit('likeProductComment', id)
  },
  async unlikeStoreComment(context, payload) {
    const id = payload.id
    const likerId = context.rootGetters['user/currentUser'].userId
    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/storeComments/${id}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PUT',
        body: JSON.stringify({ likerId: likerId }),
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to unlike store comment')
      throw error
    }
    context.commit('unlikeStoreComment', id)
  },
  async unlikeProductComment(context, payload) {
    const id = payload.id
    const likerId = context.rootGetters['user/currentUser'].userId
    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/productComments/${id}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PUT',
        body: JSON.stringify({ likerId: likerId }),
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to unlike product comment')
      throw error
    }
    context.commit('unlikeProductComment', id)
  },
}
