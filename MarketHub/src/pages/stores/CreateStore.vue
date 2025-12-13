<template>
  <base-card class="container">
    <h1>Create Store</h1>
    <store-form class="store_form" @submit="handleSubmit"></store-form>
  </base-card>
</template>

<script>
import StoreForm from '@/components/store/StoreForm.vue'
export default {
  components: {
    StoreForm,
  },
  methods: {
    handleSubmit() {
      console.log('Create Store')
    },
  },
}
</script>

<style lang="scss" scoped>
.store_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
</style>
