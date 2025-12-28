<template>
  <div class="container">
    <div class="store-detail">
      <div class="store-detail-header">
        <div class="store-image">
          <img :src="store.image" :alt="store.name" />
        </div>
        <div class="store-information">
          <div class="store-header">
            <h1 class="store-name">{{ store.name }}</h1>
            <div class="store-edit" data-tooltip="Edit Store">
              <i class="fa-solid fa-pen"></i>
            </div>
          </div>
          <div class="store-contact--container">
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
      </div>
      <div class="store-menu">
        <button class="store-menu-arrow store-menu-arrow--left" @click="prevMenu">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div
          v-for="item in menu"
          :key="item.identifier"
          class="store-menu-item"
          :class="{ active: active === item.identifier }"
          @click="makeActive(item.identifier)"
        >
          {{ item.name }}
        </div>

        <button class="store-menu-arrow store-menu-arrow--right" @click="nextMenu">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div v-if="active === 'products'">
        <base-card class="store-products">
          <base-button class="button button-primary add-button"> Add Product </base-button>
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
        </base-card>
      </div>
      <div v-if="active === 'current-orders'">
        <cart-items :cartItems="cartItems" page="my-store" />
      </div>
      <div v-if="active === 'history'">
        <cart-items :cartItems="cartItems" page="order-history" />
      </div>
    </div>
    <product-dialogue :isOpen="isDialogueOpen" :product="selectedProduct" @close="closeDialogue" />
    <review-cards v-if="active === 'reviews'" :reviews="reviews" />
    <div v-if="active === 'news'">
      <base-card class="store-news">
        <base-button class="button button-primary add-button">Add News</base-button>
        <store-news v-if="active === 'news'" />
      </base-card>
    </div>
  </div>
</template>

<script>
import ProductItems from '@/components/products/ProductItems.vue'
import ProductDialogue from '@/components/products/ProductDialogue.vue'
import StoreNews from '@/components/store/StoreNews.vue'
import CartItems from '@/components/order/CartItems.vue'

export default {
  components: {
    ProductItems,
    ProductDialogue,
    StoreNews,
    CartItems,
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
      menu: [
        {
          name: 'Products',
          identifier: 'products',
        },
        {
          name: 'Current Orders',
          identifier: 'current-orders',
        },
        {
          name: 'Reviews',
          identifier: 'reviews',
        },
        {
          name: 'News',
          identifier: 'news',
        },
        {
          name: 'Order History',
          identifier: 'history',
        },
      ],
      reviews: [
        {
          id: 1,
          name: 'Review 1',
          image: '/groceries.jpg',
          content: 'Content of Review 1',
          date: '2021-01-01',
          rating: 5,
        },
        {
          id: 2,
          name: 'Review 2',
          image: '/groceries.jpg',
          content: 'Content of Review 2',
          date: '2021-01-02',
          rating: 4,
        },
        {
          id: 3,
          name: 'Review 3',
          image: '/groceries.jpg',
          content: 'Content of Review 3',
          date: '2021-01-03',
          rating: 3,
        },
      ],
      cartItems: [
        {
          id: 1,
          name: 'Product 1',
          image: '/groceries.jpg',
          price: 100,
          date: '2021-01-01',
        },
        {
          id: 2,
          name: 'Product 2',
          image: '/groceries.jpg',
          price: 100,
          date: '2021-01-02',
        },
        {
          id: 3,
          name: 'Product 3',
          image: '/groceries.jpg',
          price: 100,
          date: '2021-01-03',
        },
        {
          id: 4,
          name: 'Product 4',
          image: '/groceries.jpg',
          price: 100,
          date: '2021-01-04',
        },
        {
          id: 5,
          name: 'Product 5',
          image: '/groceries.jpg',
          price: 100,
          date: '2021-01-05',
        },
      ],
    }
  },
  methods: {
    makeActive(menu) {
      this.active = menu
    },
    nextMenu() {
      const currentIndex = this.menu.findIndex((item) => item.identifier === this.active)
      const nextIndex = (currentIndex + 1) % this.menu.length
      this.active = this.menu[nextIndex].identifier
    },
    prevMenu() {
      const currentIndex = this.menu.findIndex((item) => item.identifier === this.active)
      const prevIndex = (currentIndex - 1 + this.menu.length) % this.menu.length
      this.active = this.menu[prevIndex].identifier
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
  max-width: 1400px;
}

.store-edit {
  position: relative;
  cursor: pointer;
  color: var(--secondary);

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 50%;
    bottom: 125%;
    transform: translateX(-50%);
    background: #0f172a;
    color: #fff;
    padding: 4px 8px;
    font-size: 0.75rem;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease;
  }

  &:hover::after {
    opacity: 1;
  }
}
.store-contact {
  &--container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (max-width: 1024px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 1rem;
    }
  }
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

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 20px;
  }
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

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 724px) {
    justify-content: space-between;
  }
}

.store-image img {
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: var(--radius-md);

  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
  }
}

.store-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  .store-menu-item {
    flex: 1;
    text-align: center;
    font-weight: 700;

    &:first-of-type,
    &:nth-of-type(2),
    &:nth-of-type(3) {
      border-right: 3px solid var(--primary);
    }

    &.active {
      color: var(--primary);
    }

    &:hover {
      cursor: pointer;
      background-color: #f8fafc;
    }

    @media (max-width: 1024px) {
      font-size: 1.5rem;
    }
  }

  .store-menu-arrow {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: none;

    i {
      font-size: 1rem;
    }
  }

  @media (max-width: 1024px) {
    justify-content: center;
    gap: 0;

    .store-menu-item {
      display: none;

      &.active {
        display: block;
        border-right: none;
      }
    }

    .store-menu-arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.store-name {
  font-size: 2rem;
  margin-bottom: 0;
}

.store-products,
.store-news {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 20px 0;

  & .add-button {
    width: fit-content;
    align-self: flex-end;
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
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
