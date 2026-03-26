<template>
  <div class="container">
    <product-form class="product_form" @submit="handleSubmit"></product-form>
    <img src="/factory.png" alt="Auth Background" />
  </div>
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
  width: 50%;

  @media (max-width: 1024px) {
    width: 100%;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

img {
  width: 50%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 1024px) {
    display: none;
  }
}
</style>
