<template>
  <base-card class="container">
    <h1>Create Account</h1>
    <user-form class="product_form" @submit="handleSubmit"></user-form>
  </base-card>
</template>

<script>
import UserForm from '@/components/users/UserForm.vue'
export default {
  components: {
    UserForm,
  },
  methods: {
    handleSubmit() {
      console.log('Create Store')
    },
  },
}
</script>

<style lang="scss" scoped>
.product_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

h1 {
  @media (max-width: 1024px) {
    font-size: 1.8em;
  }
}
</style>
