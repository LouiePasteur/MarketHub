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
        <button class="store-menu-arrow prev" @click="prevMenu">&lt;</button>
        <div
          class="store-products menu-item"
          :class="{ active: active === 'products' }"
          @click="makeActive('products')"
        >
          Products
        </div>
        <div
          class="store-reviews menu-item"
          :class="{ active: active === 'reviews' }"
          @click="makeActive('reviews')"
        >
          Reviews
        </div>
        <div
          class="store-about menu-item"
          :class="{ active: active === 'news' }"
          @click="makeActive('news')"
        >
          News
        </div>
        <button class="store-menu-arrow next" @click="nextMenu">&gt;</button>
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
    <review-cards
      v-if="active === 'reviews'"
      :reviews="review"
      :page="'store'"
      :store-id="store.id"
      @add-review="addReview"
      @edit-review="editReview"
    />
    <store-news v-if="active === 'news'" />
  </base-card>
</template>

<script>
import ProductItems from '@/components/products/ProductItems.vue'
import ProductDialogue from '@/components/products/ProductDialogue.vue'
import StoreNews from '@/components/store/StoreNews.vue'

export default {
  components: {
    ProductItems,
    ProductDialogue,
    StoreNews,
  },
  data() {
    return {
      review: [],
      isDialogueOpen: false,
      selectedProduct: null,
      active: 'products',
      menuOrder: ['products', 'reviews', 'news'],
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
      reviews: [
        {
          id: 1,
          image: '/groceries.jpg',
          name: 'John Doe',
          date: '2021-01-01',
          rating: 5,
          content: 'This is a review',
        },
        {
          id: 2,
          image: '/groceries.jpg',
          name: 'Jane Smith',
          date: '2021-02-10',
          rating: 3,
          content: 'Pretty good overall, could be better.',
        },
        {
          id: 3,
          image: '/groceries.jpg',
          name: 'Alex Johnson',
          date: '2021-03-05',
          rating: 4,
          content: 'Satisfied with the purchase.',
        },
      ],
    }
  },
  async created() {
    await this.$store.dispatch('comments/fetchStoreComments')
    this.review = this.$store.getters['comments/storeComments']
    console.log('review', this.review)
  },
  watch: {
    review(newVal) {
      this.reviews = newVal
    },
  },
  methods: {
    editReview(reviewId) {
      console.log('edit review', reviewId)
      /*this.$store.dispatch('comments/editStoreComment', {
        id: reviewId,
        storeId: this.store.id,
        comment: this.review.comment,
        commentDate: this.review.commentDate,
        commenterId: this.review.commenterId,
        commenterName: this.review.commenterName,
        //commenterProfile: this.review.commenterProfile,
        rating: this.review.rating,
        likeCount: this.review.likeCount,
        likers: this.review.likers,
      })*/
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

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
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

  @media (max-width: 768px) {
    justify-content: space-between;
    gap: 1rem;
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
  justify-content: space-around;
  align-items: center;

  & .menu-item {
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

.store-menu-arrow {
  display: none;
  border: none;
  background: transparent;
  font-size: 1.25rem;
  padding: 0 0.75rem;
  cursor: pointer;
  color: var(--primary);
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

@media (max-width: 1024px) {
  .store-menu {
    justify-content: space-between;
    gap: 0.5rem;
  }

  .store-menu-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .store-menu .menu-item {
    width: auto;
    border-right: none;
  }

  .store-menu .menu-item:not(.active) {
    display: none;
  }
}
</style>
