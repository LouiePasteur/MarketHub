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
            :name="product.name"
            :image="product.image"
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
      products: [
        {
          id: 1,
          name: 'Product 1',
          image: '/cosmetics.jpg',
          price: 100,
          total_sold: 100,
          description: 'Description of Product 1',
        },
        {
          id: 2,
          name: 'Product 2',
          image: '/groceries.jpg',
          price: 100,
          total_sold: 100,
          description: 'Description of Product 2',
        },
        {
          id: 3,
          name: 'Product 3',
          image: '/computer.jpg',
          price: 100,
          total_sold: 100,
          description: 'Description of Product 3',
        },
      ],
    }
  },
  methods: {
    openDialogue(product) {
      this.selectedProduct = product
      this.isDialogueOpen = true
    },
    closeDialogue() {
      this.isDialogueOpen = false
      this.selectedProduct = null
    },
  },
  mounted() {
    console.log('currentUser', this.$store.getters['user/currentUser'])
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
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
