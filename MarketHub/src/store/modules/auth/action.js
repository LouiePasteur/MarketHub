import router from '@/router'
let timer = null
export default {
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
    })
  },
  async auth(context, payload) {
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

    let url = ''
    if (payload.login) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.error?.message || 'Failed to authenticate')
      throw error
    }

    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    timer = setTimeout(function () {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    })

    if (!payload.login) {
      context.dispatch('user/addUser', {
        userId: responseData.localId,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: '',
        cart: [],
        orders: [],
        addresses: [],
        paymentMethods: [],
        followers: [],
        followedStores: [],
        settings: [],
      })
    } else {
      router.replace('/products')
    }
  },
  autoLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expireIn = +tokenExpiration - new Date().getTime()

    if (expireIn < 0) {
      return
    }

    timer = setTimeout(function () {
      context.dispatch('autoLogout')
    }, expireIn)

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      })
    }
  },
  logout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)
    context.commit('setUser', {
      userId: null,
      token: null,
    })
  },

  autoLogout(context) {
    context.dispatch('logout')
    context.commit('didAutoLogout')
  },
}
