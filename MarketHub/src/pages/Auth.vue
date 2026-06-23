<template>
  <div class="container">
    <auth-form
      class="auth_form"
      :login="isLogin"
      :error="error"
      :errorMessage="errorMessage"
      :submitting="submitting"
      :issueLocation="issueLocation"
      @submit="submitForm"
      @clear-error="clearErrorState"
      @toggle-form="toggleLoginForm"
    />
    <img src="/auth.png" alt="Auth Background" />
  </div>
</template>

<script>
import authForm from '@/components/ui/auth/AuthForm.vue'
export default {
  components: {
    authForm,
  },
  data() {
    return {
      error: false,
      errorMessage: '',
      success: false,
      successMessage: '',
      submitting: false,
      issueLocation: '',
      isLogin: true,
    }
  },
  methods: {
    async submitForm(payload) {
      // If a native submit event bubbles up, ignore it; we only care about the payload object
      if (payload && payload.target && payload.type === 'submit') {
        return
      }

      // Prevent double submission (avoids duplicate signUp request and ADMIN_ONLY_OPERATION + success in one click)
      if (this.submitting) return
      this.submitting = true

      // Reset error state
      this.error = false
      this.errorMessage = ''
      this.issueLocation = ''

      const email = payload.email
      const password = payload.password
      const confirmPassword = payload.confirmPassword

      if (!email || !email.includes('@') || !email.includes('.')) {
        this.issueLocation = 'email'
        this.error = true
        this.errorMessage = 'Please enter a valid email address. Please try again.'
        this.submitting = false
        return
      }

      const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/

      if (!payload.login) {
        if (confirmPassword && password !== confirmPassword) {
          this.issueLocation = 'password'
          this.error = true
          this.errorMessage = 'Passwords do not match. Please try again.'
          this.submitting = false
          return
        }
        if (password.length < 8) {
          this.issueLocation = 'password'
          this.error = true
          this.errorMessage = 'Password must be at least 8 characters long. Please try again.'
          this.submitting = false
          return
        }
        if (!passwordStrength.test(password)) {
          this.issueLocation = 'password'
          this.error = true
          this.errorMessage =
            'Password must contain at least one uppercase letter, one lowercase letter, and one special character. Please try again.'
          this.submitting = false
          return
        }
      }

      try {
        // Dispatch signup action
        await this.$store.dispatch('signup', {
          email: email,
          password: password,
          login: payload.login,
        })
      } catch (error) {
        if (!payload.login) {
          const msg = error?.message || ''
          if (msg.includes('EMAIL_EXISTS')) {
            this.issueLocation = 'email'
            this.error = true
            this.errorMessage = 'This email is already in use. Please use a different email.'
            this.submitting = false
            return
          }
        } else {
          this.error = true
          this.errorMessage = 'Incorrect username or password. Please try again.'
          this.submitting = false
          return
        }
      } finally {
        this.submitting = false
      }
    },
    clearErrorState() {
      this.error = false
      this.errorMessage = ''
      this.issueLocation = ''
    },
    toggleLoginForm() {
      this.isLogin = false
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-image: linear-gradient(to bottom right, #57d7e6, #7ced61);
}

.auth_form {
  width: 30%;

  @media (max-width: 1024px) {
    width: 100%;
  }
}

img {
  @media (max-width: 1024px) {
    display: none;
  }
}
</style>
