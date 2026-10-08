<template>
  <div class="container">
    <product-form
      v-if="product"
      class="product_form"
      :product="product"
      @submit="handleSubmit"
    ></product-form>
    <img src="/factory.png" alt="Auth Background" />
  </div>
</template>

<script>
import ProductForm from '@/components/products/ProductForm.vue'
export default {
  components: {
    ProductForm,
  },
  computed: {
    product() {
      return this.$store.getters['products/products'].find(
        (item) => String(item.id) === String(this.$route.params.id),
      )
    },
  },
  methods: {
    handleSubmit(payload) {
      this.$store.dispatch('products/updateProduct', payload)
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
