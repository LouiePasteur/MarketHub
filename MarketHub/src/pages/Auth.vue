<template>
  <div class="container">
    <auth-form class="auth_form" :login="isLogin"></auth-form>
    <img src="/auth.png" alt="Auth Background" />
    <base-toast
      :visible="toastVisible"
      :message="toastMessage"
      :type="toastType"
      @close="toastVisible = false"
    />
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
      isLogin: true,
      toastVisible: false,
      toastMessage: '',
      toastType: 'info',
      toastTimeoutId: null,
    }
  },
  mounted() {
    if(this.$route.path.includes('signup')) {
      this.isLogin = false;
    }
  },
  methods: {
    async handleSubmit(formData) {
      console.log('Form submitted:', formData)
      const { password, confirmPassword } = formData

      const payload = {
        email: formData.email,
        password: password,
      }
      if (password !== confirmPassword) {
        this.showToast('Password and Confirm Password must be the same.', 'error')
        return
      }

      if (!password || password.length < 8) {
        this.showToast('Password must be at least 8 characters long.', 'error')
        return
      }

      const complexityRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
      if (!complexityRegex.test(password)) {
        this.showToast(
          'Password must contain letters, numbers, and at least one special character.',
          'error',
        )
        return
      }

      try {
        await this.$store.dispatch('signup', payload)
        this.showToast('Account created successfully!', 'success')
      } catch (error) {
        this.showToast(error.message, 'error')
        return
      }
    },
    showToast(message, type = 'info') {
      this.toastMessage = message
      this.toastType = type
      this.toastVisible = true

      if (this.toastTimeoutId) {
        clearTimeout(this.toastTimeoutId)
      }

      this.toastTimeoutId = setTimeout(() => {
        this.toastVisible = false
        this.toastTimeoutId = null
      }, 3000)
    },
  }
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