<template>
  <div class="container">
    <div v-if="myStore">
      <div class="store-detail">
        <div class="store-detail-header">
          <div class="store-image">
            <img :src="store.image" :alt="store.name" />
          </div>
          <div class="store-information">
            <div class="store-header">
              <div class="store-header__title">
                <h1 class="store-name text-title text-primary">{{ store.name }}</h1>
                <p class="store-owner text-body-sm text-muted">
                  Owned by <span class="text-dark">{{ store.owner }}</span>
                </p>
              </div>
              <div class="store-edit" data-tooltip="Edit Store">
                <i class="fa-solid fa-pen"></i>
              </div>
            </div>

            <p class="store-description text-body text-muted">{{ store.description }}</p>

            <ul class="store-meta">
              <li class="store-meta__item">
                <span class="store-meta__icon"><i class="fa-solid fa-location-dot"></i></span>
                <div class="store-meta__copy">
                  <span class="text-caption text-muted">Address</span>
                  <span class="text-body-sm text-dark">{{ store.address }}</span>
                </div>
              </li>
              <li class="store-meta__item">
                <span class="store-meta__icon"><i class="fa-solid fa-phone"></i></span>
                <div class="store-meta__copy">
                  <span class="text-caption text-muted">Contact</span>
                  <span class="text-body-sm text-dark">{{ store.contact }}</span>
                </div>
              </li>
              <li class="store-meta__item">
                <span class="store-meta__icon"><i class="fa-solid fa-envelope"></i></span>
                <div class="store-meta__copy">
                  <span class="text-caption text-muted">Email</span>
                  <span class="text-body-sm text-dark">{{ store.email }}</span>
                </div>
              </li>
              <li class="store-meta__item">
                <span class="store-meta__icon"><i class="fa-regular fa-calendar"></i></span>
                <div class="store-meta__copy">
                  <span class="text-caption text-muted">Since</span>
                  <span class="text-body-sm text-dark">{{ store.createdDate }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="store-menu">
          <button class="store-menu-arrow store-menu-arrow--left" type="button" @click="prevMenu">
            <i class="fa-solid fa-chevron-left"></i>
          </button>

          <div
            v-for="item in menu"
            :key="item.identifier"
            class="store-menu-item text-label"
            :class="{ active: active === item.identifier }"
            @click="makeActive(item.identifier)"
          >
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </div>

          <button class="store-menu-arrow store-menu-arrow--right" type="button" @click="nextMenu">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div v-if="active === 'products'" class="store-panel">
          <div class="store-panel__header">
            <div class="store-panel__heading">
              <h2 class="text-heading text-dark">Products</h2>
              <p class="text-body-sm text-muted">Manage the items listed in your store.</p>
            </div>
            <base-button class="button button-primary add-button">Add Product</base-button>
          </div>
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

        <div v-if="active === 'current-orders'" class="store-panel">
          <div class="store-panel__header">
            <div class="store-panel__heading">
              <h2 class="text-heading text-dark">Current Orders</h2>
              <p class="text-body-sm text-muted">Track and update orders that are still in progress.</p>
            </div>
          </div>
          <current-orders />
        </div>

        <div v-if="active === 'reviews'" class="store-panel">
          <div class="store-panel__header">
            <div class="store-panel__heading">
              <h2 class="text-heading text-dark">Reviews</h2>
              <p class="text-body-sm text-muted">See what customers are saying about your store.</p>
            </div>
          </div>
          <review-cards
            :reviews="review"
            :page="'store'"
            :store-id="store.id"
            @add-review="addReview"
            @edit-review="editReview"
          />
        </div>

        <div v-if="active === 'news'" class="store-panel">
          <div class="store-panel__header">
            <div class="store-panel__heading">
              <h2 class="text-heading text-dark">News</h2>
              <p class="text-body-sm text-muted">Share updates and announcements with your buyers.</p>
            </div>
            <base-button class="button button-primary add-button">Add News</base-button>
          </div>
          <news />
        </div>

        <div v-if="active === 'history'" class="store-panel">
          <div class="store-panel__header">
            <div class="store-panel__heading">
              <h2 class="text-heading text-dark">Order History</h2>
              <p class="text-body-sm text-muted">Review completed and past store orders.</p>
            </div>
          </div>
          <cart-items :cartItems="cartItems" page="order-history" />
        </div>
      </div>
      <product-dialogue
        :isOpen="isDialogueOpen"
        :product="selectedProduct"
        :store-id="store.id"
        @close="closeDialogue"
      />
    </div>
    <div class="no-store" v-else>
      <h3 class="text-heading text-muted">You don't have any store yet. Please create a store first.</h3>
      <base-button class="button button-primary">Create Store</base-button>
    </div>
  </div>
</template>

<script>
import ProductItems from '@/components/products/ProductItems.vue'
import ProductDialogue from '@/components/products/ProductDialogue.vue'
import News from '@/components/news/News.vue'
import CartItems from '@/components/order/CartItems.vue'
import CurrentOrders from '@/components/order/CurrentOrders.vue'
import ReviewCards from '@/components/ui/index/ReviewCards.vue'

export default {
  components: {
    ProductItems,
    ProductDialogue,
    News,
    CartItems,
    CurrentOrders,
    ReviewCards,
  },
  data() {
    return {
      isDialogueOpen: false,
      selectedProduct: null,
      active: 'products',
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
          icon: 'fa-solid fa-box',
        },
        {
          name: 'Current Orders',
          identifier: 'current-orders',
          icon: 'fa-solid fa-clipboard-list',
        },
        {
          name: 'Reviews',
          identifier: 'reviews',
          icon: 'fa-solid fa-star',
        },
        {
          name: 'News',
          identifier: 'news',
          icon: 'fa-solid fa-newspaper',
        },
        {
          name: 'Order History',
          identifier: 'history',
          icon: 'fa-solid fa-clock-rotate-left',
        },
      ],
      cartItems: [
        {
          id: 1,
          name: 'Product 1',
          image: '/groceries.jpg',
          price: 100,
          date: '2021-01-01',
          status: 'completed',
          quantity: 2,
        },
        {
          id: 2,
          name: 'Product 2',
          image: '/cosmetics.jpg',
          price: 100,
          date: '2021-01-02',
          status: 'completed',
          quantity: 1,
        },
        {
          id: 3,
          name: 'Product 3',
          image: '/computer.jpg',
          price: 100,
          date: '2021-01-03',
          status: 'cancelled',
          quantity: 1,
        },
        {
          id: 4,
          name: 'Product 4',
          image: '/fashion.jpg',
          price: 100,
          date: '2021-01-04',
          status: 'completed',
          quantity: 3,
        },
        {
          id: 5,
          name: 'Product 5',
          image: '/groceries.jpg',
          price: 100,
          date: '2021-01-05',
          status: 'completed',
          quantity: 2,
        },
      ],
    }
  },
  computed: {
    store() {
      const myStore = this.$store.getters['stores/myStore']

      if (!myStore) {
        // still loading or user has no store
        return {
          id: null,
          name: '',
          image: '',
          address: '',
          description: '',
          owner: '',
          ownerId: '',
          contact: '',
          email: '',
          createdDate: '',
        }
      }

      return {
        id: myStore.id ?? myStore.storeId ?? 1,
        name: myStore.storeName || '',
        image: myStore.storeImage || '/fashion.jpg',
        address: myStore.storeAddress || '',
        description: myStore.storeDescription || '',
        owner: myStore.storeOwner || '',
        ownerId: myStore.storeOwnerId || '',
        contact: myStore.storeContact || '',
        email: myStore.storeEmail || '',
        createdDate: myStore.createdDate || '2021-01-01',
      }
    },
    myStore() {
      return !!this.$store.getters['stores/myStore']
    },
    review() {
      return this.$store.getters['comments/myStoreComments']
    },
  },
  async created() {
    await this.$store.dispatch('comments/fetchStoreComments')
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
    async addReview(review) {
      try {
        await this.$store.dispatch('comments/addStoreComment', {
          ...review,
          storeId: this.store.id,
        })
      } catch (error) {
        console.error(error)
      }
    },
    async editReview(review) {
      try {
        await this.$store.dispatch('comments/editStoreComment', review)
      } catch (error) {
        console.error(error)
      }
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

.store-detail {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &-header {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 2rem;
    align-items: stretch;
    padding: 0.25rem 0 0.5rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }
  }
}

.store {
  &-edit {
    position: relative;
    cursor: pointer;
    color: var(--secondary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--radius-md);
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    flex-shrink: 0;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      background-color: #eef2f7;
      color: var(--primary);
    }

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      left: 50%;
      bottom: 125%;
      transform: translateX(-50%);
      background: #0f172a;
      color: #fff;
      padding: 4px 8px;
      font-size: var(--text-caption);
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

  &-image {
    img {
      width: 100%;
      height: 320px;
      object-fit: cover;
      border-radius: var(--radius-lg);
      display: block;

      @media (max-width: 1024px) {
        height: 240px;
      }
    }
  }

  &-information {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25rem;
    text-align: left;
    min-width: 0;
  }

  &-header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;

    &__title {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      min-width: 0;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  &-name {
    margin: 0;
  }

  &-owner {
    margin: 0;
  }

  &-description {
    margin: 0;
    max-width: 40rem;
    line-height: 1.65;
  }

  &-meta {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    &__item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.85rem 1rem;
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: var(--radius-md);
    }

    &__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      flex-shrink: 0;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, #57d7e6, #7ced61);
      color: #fff;

      i {
        font-size: var(--icon-sm);
      }
    }

    &__copy {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      min-width: 0;

      span {
        word-break: break-word;
      }
    }
  }

  &-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.35rem;
    padding: 0.4rem;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: var(--radius-lg);

    &-item {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      padding: 0.7rem 0.6rem;
      border-radius: var(--radius-md);
      color: #64748b;
      cursor: pointer;
      transition:
        background-color 0.2s ease,
        color 0.2s ease,
        box-shadow 0.2s ease;

      i {
        font-size: var(--icon-sm);
      }

      &:hover {
        background-color: #fff;
        color: var(--primary);
      }

      &.active {
        background-color: #fff;
        color: var(--primary);
        box-shadow: var(--shadow-sm);
      }
    }

    &-arrow {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      display: none;
      color: var(--primary);

      i {
        font-size: var(--icon-md);
      }
    }

    @media (max-width: 1024px) {
      justify-content: center;
      gap: 0.25rem;

      &-item {
        display: none;

        &.active {
          display: inline-flex;
          flex: 1;
        }
      }

      &-arrow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.store-panel {
  margin-top: 0.5rem;
  padding: 1.25rem;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  &__heading {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    text-align: left;

    h2,
    p {
      margin: 0;
    }
  }

  .add-button {
    width: fit-content;
    white-space: nowrap;
  }
}

.product-item {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  list-style: none;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.no {
  &-store {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
