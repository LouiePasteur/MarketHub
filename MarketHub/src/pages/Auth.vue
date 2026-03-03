<template>
  <div class="container">
    <auth-form
      class="auth_form"
      :login="false"
      :error="error"
      :errorMessage="errorMessage"
      :submitting="submitting"
      :issueLocation="issueLocation"
      @submit="submitForm"
      @clear-error="clearErrorState"
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
    }
  },
  methods: {
    async submitForm(payload) {
      // Always have a payload object
      payload = payload || {}

      // Prevent double submission (avoids duplicate signUp request and ADMIN_ONLY_OPERATION + success in one click)
      if (this.submitting) return
      this.submitting = true

      // Reset error state
      this.error = false
      this.errorMessage = ''
      this.issueLocation = ''

      const email =
        typeof payload.email === 'string' ? payload.email.trim() : ''
      const password =
        typeof payload.password === 'string' ? payload.password : ''
      const confirmPassword =
        typeof payload.confirmPassword === 'string'
          ? payload.confirmPassword
          : ''

      // 1) Email validation (first, matches UI order)
      if (!email || !email.includes('@') || !email.includes('.')) {
        this.issueLocation = 'email'
        this.error = true
        this.errorMessage = 'Please enter a valid email address. Please try again.'
        this.submitting = false
        return
      }

      const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/

      // 2) Password validations
      if (confirmPassword && password !== confirmPassword) {
        this.issueLocation = 'password'
        this.error = true
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

      try {
        // Dispatch signup action
        await this.$store.dispatch('signup', {
          email: email,
          password: password,
        })
      } catch (error) {
        const msg = error?.message || ''
        if (msg.includes('EMAIL_EXISTS')) {
          this.issueLocation = 'email'
          this.error = true
          this.errorMessage = 'This email is already in use. Please use a different email.'
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
}
</style>
