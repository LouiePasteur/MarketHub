<template>
  <div>
    <base-card class="container">
      <div class="product__filter--action">
        <product-search></product-search>
        <product-filter></product-filter>
      </div>
      <div class="product-list">
        <ul class="product-item">
          <product-items
            v-for="product in products"
            :key="product.id"
            :name="product.productName"
            :image="getProductImage(product)"
            :price="product.price"
            :product="product"
            @open-dialogue="openDialogue"
          />
        </ul>
      </div>
      <product-dialogue
        :isOpen="isDialogueOpen"
        :product="selectedProduct"
        @close="closeDialogue"
      />
    </base-card>
    <sp-navigation />
  </div>
</template>

<script>
import ProductSearch from '@/components/products/ProductSearch.vue'
import ProductFilter from '@/components/products/ProductFilter.vue'
import ProductItems from '@/components/products/ProductItems.vue'
import ProductDialogue from '@/components/products/ProductDialogue.vue'

export default {
  components: { ProductSearch, ProductFilter, ProductItems, ProductDialogue },
  data() {
    return {
      isDialogueOpen: false,
      selectedProduct: null,
    }
  },
  methods: {
    getProductImage(product) {
      const firstImage = product?.productImage?.[0]

      if (typeof firstImage === 'string') {
        return firstImage
      }

      if (typeof firstImage?.preview === 'string') {
        return firstImage.preview
      }

      return ''
    },
    openDialogue(product) {
      this.selectedProduct = product
      this.isDialogueOpen = true
    },
    closeDialogue() {
      this.isDialogueOpen = false
      this.selectedProduct = null
    },
  },
  computed: {
    products() {
      return this.$store.getters['products/products']
    },
  },
}
</script>

<style lang="scss" scoped>
.product__filter--action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

.product-item {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
