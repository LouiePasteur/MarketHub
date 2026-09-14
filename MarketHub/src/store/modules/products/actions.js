import router from '@/router'

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

async function normalizeProductImages(images = []) {
  const normalized = await Promise.all(
    images.map(async (image) => {
      if (typeof image === 'string') {
        if (image.startsWith('data:') || image.startsWith('https://')) return image
        return null
      }

      if (image?.file instanceof File) {
        return await blobToDataUrl(image.file)
      }

      if (typeof image?.preview === 'string') {
        if (image.preview.startsWith('data:') || image.preview.startsWith('https://')) {
          return image.preview
        }

        if (image.preview.startsWith('blob:')) {
          const blobResponse = await fetch(image.preview)
          const blob = await blobResponse.blob()
          return await blobToDataUrl(blob)
        }

        return null
      }

      return null
    }),
  )

  return normalized.filter((url) => typeof url === 'string' && url.length > 0)
}

export default {
  async fetchProducts(context) {
    const response = await fetch(
      'https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/products.json',
    )
    const responseData = await response.json()
    const products = []
    for (const key in responseData) {
      products.push({
        ...responseData[key],
      })
    }
    context.commit('setProducts', products)
  },

  async addProduct(context, payload) {
    const currentUser = context.rootGetters['user/currentUser']
    if (!currentUser?.userId) {
      throw new Error('You must be logged in to create a product.')
    }

    const store = context.rootGetters['stores/myStore']
    if (!store) {
      throw new Error('You must have a store first to create a product.')
    }

    const id = ''
    const productName = payload.productName
    const productImage = await normalizeProductImages(payload.productImage)
    const productCategory = payload.productCategory
    const productDescription = payload.productDescription
    const stocks = payload.stocks
    const price = payload.price
    const sold = payload.sold
    const storeId = store.id
    const productRating = payload.productRating

    const response = await fetch(
      'https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/products.json',
      {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          productName: productName,
          productImage: productImage,
          productCategory: productCategory,
          productDescription: productDescription,
          stocks: stocks,
          price: price,
          sold: sold,
          storeId: storeId,
          productRating: productRating,
        }),
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to add product')
      throw error
    }

    await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/products/${responseData.name}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ id: responseData.name }),
      },
    )
    const newProduct = {
      id: responseData.name,
      productName: productName,
      productImage: productImage,
      productCategory: productCategory,
      productDescription: productDescription,
      stocks: stocks,
      price: price,
      sold: sold,
      storeId: storeId,
      productRating: productRating,
    }

    context.commit('addProduct', newProduct)
    router.replace('/products')
  },

  async updateProduct(context, payload) {
    const id = payload.id
    const productName = payload.productName
    const productImage = await normalizeProductImages(payload.productImage)
    const productCategory = payload.productCategory
    const productDescription = payload.productDescription
    const stocks = payload.stocks
    const price = payload.price
    const sold = payload.sold
    const storeId = payload.storeId
    const productRating = payload.productRating

    const response = await fetch(
      `https://markethub-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          productName: productName,
          productImage: productImage,
          productCategory: productCategory,
          productDescription: productDescription,
          stocks: stocks,
          price: price,
          sold: sold,
          storeId: storeId,
          productRating: productRating,
        }),
      },
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to update product')
      throw error
    }
    const updatedProduct = {
      id: id,
      productName: productName,
      productImage: productImage,
      productCategory: productCategory,
      productDescription: productDescription,
      stocks: stocks,
      price: price,
      sold: sold,
      storeId: storeId,
      productRating: productRating,
    }
    context.commit('updateProduct', updatedProduct)
    router.replace('/products')
  },
}
