<template>
  <div class="product-description">
    <p v-if="productDescription">{{ productDescription }}</p>
    <p v-else class="no-description">No description available</p>
  </div>
</template>

<script>
export default {
  props: {
    productDescription: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
p {
  width: 100%;
  margin-top: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #000;
}

.no-description {
  text-align: center;
}
</style>
