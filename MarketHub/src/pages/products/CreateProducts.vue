<template>
  <base-card class="container">
    <h1>Add Product</h1>
    <product-form class="product_form" @submit="handleSubmit"></product-form>
  </base-card>
</template>

<script>
import ProductForm from '@/components/products/ProductForm.vue'
export default {
  components: {
    ProductForm,
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
