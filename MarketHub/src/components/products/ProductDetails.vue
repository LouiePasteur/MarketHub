<template>
  <div class="product-description">
    <p v-if="productDescription" class="text-body-sm text-muted">{{ productDescription }}</p>
    <p v-else class="no-description text-body-sm text-muted">No description available</p>
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
}

.no-description {
  text-align: center;
}
</style>
