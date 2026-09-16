<template>
  <base-card class="container">
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
            <base-button class="button button-secondary follow-button">Follow</base-button>
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
        <button class="store-menu-arrow prev" type="button" @click="prevMenu">
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
        <button class="store-menu-arrow next" type="button" @click="nextMenu">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div class="store-panel" v-if="active === 'products'">
        <div class="store-panel__header">
          <div class="store-panel__heading">
            <h2 class="text-heading text-dark">Products</h2>
            <p class="text-body-sm text-muted">Browse items available from this store.</p>
          </div>
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
    </div>
    <product-dialogue
      :isOpen="isDialogueOpen"
      :product="selectedProduct"
      @close="closeDialogue"
      :storeId="store.id"
    />
    <div class="store-panel" v-if="active === 'reviews'">
      <div class="store-panel__header">
        <div class="store-panel__heading">
          <h2 class="text-heading text-dark">Reviews</h2>
          <p class="text-body-sm text-muted">See what customers are saying about this store.</p>
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
    <div class="store-panel" v-if="active === 'news'">
      <div class="store-panel__header">
        <div class="store-panel__heading">
          <h2 class="text-heading text-dark">News</h2>
          <p class="text-body-sm text-muted">Latest updates and announcements from this store.</p>
        </div>
      </div>
      <news />
    </div>
  </base-card>
</template>

<script>
import ProductItems from '@/components/products/ProductItems.vue'
import ProductDialogue from '@/components/products/ProductDialogue.vue'
import News from '@/components/news/News.vue'
import ReviewCards from '@/components/ui/index/ReviewCards.vue'
export default {
  components: {
    ProductItems,
    ProductDialogue,
    News,
    ReviewCards,
  },
  data() {
    return {
      isDialogueOpen: false,
      selectedProduct: null,
      active: 'products',
      menu: [
        { name: 'Products', identifier: 'products', icon: 'fa-solid fa-box' },
        { name: 'Reviews', identifier: 'reviews', icon: 'fa-solid fa-star' },
        { name: 'News', identifier: 'news', icon: 'fa-solid fa-newspaper' },
      ],
      menuOrder: ['products', 'reviews', 'news'],
      store: {
        id: '-OnY-Q_bym1SnxMPq8OO',
        name: 'Store 1',
        image: '/fashion.jpg',
        address: '123 Main St, Anytown, USA',
        description:
          'A curated store offering everyday essentials with trusted quality, friendly service, and products chosen for convenience and style.',
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
      reviews: this.$store.getters['comments/myStoreComments'],
    }
  },
  async created() {
    await this.$store.dispatch('comments/fetchStoreComments')
  },
  computed: {
    review() {
      return this.$store.getters['comments/storeComments']
    },
  },
  methods: {
    editReview(review) {
      this.$store.dispatch('comments/editStoreComment', {
        id: review.id,
        storeId: this.store.id,
        comment: review.reviewContent,
        commentDate: new Date().toISOString(),
        commenterId: review.reviewerId,
        commenterName: review.reviewerName,
        //commenterProfile: this.review.commenterProfile,
        rating: review.reviewRating,
        likeCount: this.review.likeCount,
        likers: this.review.likers,
      })
    },
    makeActive(menu) {
      this.active = menu
    },
    prevMenu() {
      const index = this.menuOrder.indexOf(this.active)
      const prevIndex = (index - 1 + this.menuOrder.length) % this.menuOrder.length
      this.active = this.menuOrder[prevIndex]
    },
    nextMenu() {
      const index = this.menuOrder.indexOf(this.active)
      const nextIndex = (index + 1) % this.menuOrder.length
      this.active = this.menuOrder[nextIndex]
    },
    openDialogue(product) {
      this.selectedProduct = product
      this.isDialogueOpen = true
    },
    closeDialogue() {
      this.isDialogueOpen = false
      this.selectedProduct = null
    },
    addReview(review) {
      this.$store.dispatch('comments/addStoreComment', review)
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  text-align: left;
}

.container {
  margin: 20px;
  max-width: 1400px;

  @media (max-width: 1024px) {
    margin: 0;
  }
}

.follow-button {
  padding: 0.65rem 1.25rem;
  height: fit-content;
  white-space: nowrap;
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
      display: none;
      border: none;
      background: transparent;
      padding: 0.5rem;
      cursor: pointer;
      color: var(--primary);

      i {
        font-size: var(--icon-md);
      }
    }

    @media (max-width: 1024px) {
      justify-content: center;
      gap: 0.25rem;

      &-arrow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      &-item {
        display: none;

        &.active {
          display: inline-flex;
          flex: 1;
        }
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
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
