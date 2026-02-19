<template>
  <div class="container">
    <auth-form class="auth_form" :login="false" :error="error" :errorMessage="errorMessage" @submit="submitForm"></auth-form>
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
    }
  },
  methods: {
    async submitForm(payload) {
      // Reset error state
      this.error = false
      this.errorMessage = ''

      try {
        // Validate password confirmation for registration
        if (payload.confirmPassword && payload.password !== payload.confirmPassword) {
          this.error = true
          this.errorMessage = 'Passwords do not match. Please try again.'
          return
        }

        // Dispatch signup action
        await this.$store.dispatch('signup', {
          email: payload.email,
          password: payload.password,
        })
      } catch (error) {
        // Handle error
        this.error = true
        this.errorMessage = error.message || 'Failed to register. Please try again.'
      }
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
  background-image: linear-gradient(to bottom right, #57D7E6, #7CED61);
}
</style>