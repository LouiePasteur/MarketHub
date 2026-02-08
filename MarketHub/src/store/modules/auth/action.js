let timer = null

export default {
  async signup(context, payload) {
    console.log('signup in')
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    })
  },
  async auth(context, payload) {
    console.log('auth in')
    const mode = payload.mode
    const apiKey = import.meta.env.VITE_API_KEY
    console.log(apiKey)

    if (!apiKey) {
      const error = new Error(
        'API key is missing. Please configure VITE_API_KEY in your environment variables.',
      )
      throw error
    }

    let url = ''
    if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    })
    const responseData = await response.json()

    if (!response.ok) {
      console.error('API Error:', responseData)

      // Firebase API error structure: { error: { message: "...", code: ... } }
      let errorMessage = 'Failed to authenticate. Please check your login data.'
      if (responseData.error) {
        errorMessage = responseData.error.message || errorMessage
      } else if (responseData.message) {
        errorMessage = responseData.message
      }

      const error = new Error(errorMessage)
      throw error
    }

    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      userId: responseData.localId,
      token: responseData.idToken,
    })
  },
  logout(context) {
    context.commit('autoLogout')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    context.commit('setUser', {
      userId: null,
      token: null,
    })
  },
  autoLogout(context) {
    context.dispatch('logout')
    context.commit('setAutoLogout')
  },
}
