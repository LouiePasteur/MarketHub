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
      // Prevent double submission (avoids duplicate signUp request and ADMIN_ONLY_OPERATION + success in one click)
      if (this.submitting) return
      this.submitting = true

      // Reset error state
      this.error = false
      this.errorMessage = ''
      this.issueLocation = ''

      try {
        // Dispatch signup action
        await this.$store.dispatch('signup', {
          email: payload.email,
          password: payload.password,
        })
      } catch (error) {
        // Check if account was created but auth failed
        this.error = true
        this.errorMessage = error.message

        if (!payload.email.includes('@') || !payload.email.includes('.')) {
          this.issueLocation = 'email'
          this.error = true
          this.errorMessage = 'Please enter a valid email address. Please try again.'
          return
        }

        if (this.errorMessage.includes('EMAIL_EXISTS')) {
          this.issueLocation = 'email'
          this.errorMessage = 'This email is already in use. Please use a different email.'
        }

        const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/

        if (payload.confirmPassword && payload.password !== payload.confirmPassword) {
          this.issueLocation = 'password'
          this.error = true
          this.errorMessage = 'Passwords do not match. Please try again.'
          return
        }
        if (payload.password.length < 8) {
          this.issueLocation = 'password'
          this.error = true
          this.errorMessage = 'Password must be at least 8 characters long. Please try again.'
          return
        }
        if (!passwordStrength.test(payload.password)) {
          this.issueLocation = 'password'
          this.error = true
          this.errorMessage =
            'Password must contain at least one uppercase letter, one lowercase letter, and one special character. Please try again.'
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
