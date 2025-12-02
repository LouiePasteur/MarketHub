<template>
  <base-card class="container">
    <div class="store-detail">
      <div class="store-detail-header">
        <div class="store-image">
          <img :src="store.image" :alt="store.name" />
        </div>
        <div class="store-information">
          <div class="store-header">
            <h1 class="store-name">{{ store.name }}</h1>
            <base-button class="button button-secondary follow-button"> Follow </base-button>
          </div>
          <div class="store-contact"><i class="fa-solid fa-phone"></i> {{ store.contact }}</div>
          <div class="store-email"><i class="fa-solid fa-envelope"></i> {{ store.email }}</div>
          <div class="store-address">
            <i class="fa-solid fa-location-dot"></i> {{ store.address }}
          </div>
          <div class="store-description"><b>About us: </b>{{ store.description }}</div>
          <div class="store-owner"><b>Owner: </b>{{ store.owner }}</div>
          <div class="store-created-date"><b>Store Date Created: </b>{{ store.createdDate }}</div>
        </div>
      </div>
      <div class="store-menu">
        <div
          class="store-products"
          :class="{ active: active === 'products' }"
          @click="makeActive('products')"
        >
          Products
        </div>
        <div
          class="store-reviews"
          :class="{ active: active === 'reviews' }"
          @click="makeActive('reviews')"
        >
          Reviews
        </div>
        <div class="store-about" :class="{ active: active === 'news' }" @click="makeActive('news')">
          News
        </div>
      </div>
      <div class="store-products" v-if="active === 'products'">
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
    </div>
    <product-dialogue :isOpen="isDialogueOpen" :product="selectedProduct" @close="closeDialogue" />
    <store-review v-if="active === 'reviews'" />
    <store-news v-if="active === 'news'" />
  </base-card>
</template>

<script>
import ProductItems from '@/components/products/ProductItems.vue'
import ProductDialogue from '@/components/products/ProductDialogue.vue'
import StoreReview from '@/components/store/StoreReview.vue'
import StoreNews from '@/components/store/StoreNews.vue'

export default {
  components: {
    ProductItems,
    ProductDialogue,
    StoreReview,
    StoreNews,
  },
  data() {
    return {
      isDialogueOpen: false,
      selectedProduct: null,
      active: 'products',
      store: {
        id: 1,
        name: 'Store 1',
        image: '/fashion.jpg',
        address: '123 Main St, Anytown, USA',
        description: 'Description of Store 1',
        owner: 'John Doe',
        ownerId: 1,
        contact: '1234567890',
        email: 'john.doe@example.com',
        createdDate: '2021-01-01',
      },
      products: [
        {
          id: 1,
          name: 'Product 1',
          image: '/cosmetics.jpg',
          price: 100,
          description: 'Description of Product 1',
        },
        {
          id: 2,
          name: 'Product 2',
          image: '/groceries.jpg',
          price: 100,
          description: 'Description of Product 2',
        },
        {
          id: 3,
          name: 'Product 3',
          image: '/computer.jpg',
          price: 100,
          description: 'Description of Product 3',
        },
      ],
    }
  },
  methods: {
    makeActive(menu) {
      this.active = menu
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
}
</script>

<style lang="scss" scoped>
div {
  text-align: left;
}

.container {
  margin: 40px;
  max-width: 1400px;
}

.follow-button {
  padding: 10px 20px;
  height: fit-content;
}

.store-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.store-detail-header {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.store-information {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.store-header {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  height: fit-content;
  align-items: center;
}

.store-image img {
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.store-menu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  & div {
    width: 100%;
    text-align: center;
    font-weight: 700;

    &:first-child,
    &:nth-child(2) {
      border-right: 3px solid var(--primary);
    }

    &.active {
      color: var(--primary);
    }

    &:hover {
      cursor: pointer;
      background-color: #f8fafc;
    }
  }
}

.store-name {
  font-size: 2rem;
  margin-bottom: 0;
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
