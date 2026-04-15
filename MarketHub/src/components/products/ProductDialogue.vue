<template>
  <base-dialogue :isOpen="isOpen" @close="closeDialogue" class="product-dialogue">
    <div class="dialogue-body">
      <div class="product-image-container">
        <div class="product-image-main">
          <div class="image-action" v-if="imageLength > 1">
            <div class="previous-image" @click="previousImage">
              <i class="fa-solid fa-chevron-left"></i>
            </div>
            <div class="image-pointer">
              <span
                class="image-pointer-item"
                v-for="(image, index) in product?.productImage"
                :key="image"
                @click="setImageIndex(index)"
                :class="{ active: imageIndex === index }"
                >.</span
              >
            </div>
            <div class="next-image">
              <i class="fa-solid fa-chevron-right" @click="nextImage"></i>
            </div>
          </div>
          <img
            :src="product?.productImage?.[imageIndex]"
            :alt="product?.name"
            class="product-image product-image--main"
          />
        </div>
        <div class="product-image-container product-image-container--mini" v-if="imageLength > 1">
          <img
            v-for="(image, index) in product?.productImage"
            :key="image"
            :src="image"
            :alt="product?.name"
            class="product-image"
            :class="{ active: imageIndex === index }"
            @click="setImageIndex(index)"
          />
        </div>
      </div>
      <div class="product-details">
        <h2 class="product-name">{{ product?.productName }}</h2>
        <div>
          <div class="product-price">$ {{ product?.price }}</div>
          <small class="product-stocks">Stocks: {{ product?.stocks }}</small>
        </div>
        <div class="product-description">{{ product?.productDescription }}</div>

        <div class="product-actions">
          <base-button class="button button-secondary"> Add to Cart </base-button>
          <base-button class="button button-primary"> Buy Now </base-button>
        </div>
      </div>
    </div>
    <div class="dialogue-navigation">
      <div
        class="dialogue-navigation-item"
        :class="{ active: activeTab === 'product-details' }"
        @click="setActiveTab('product-details')"
      >
        Product Details
      </div>
      <div
        class="dialogue-navigation-item"
        :class="{ active: activeTab === 'reviews' }"
        @click="setActiveTab('reviews')"
      >
        Reviews
      </div>
    </div>
    <product-details
      :productDescription="product?.description"
      v-if="activeTab === 'product-details'"
    />
    <review-cards v-if="activeTab === 'reviews'" :reviews="reviews" />
  </base-dialogue>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue'
import ProductDetails from '@/components/products/ProductDetails.vue'

export default {
  components: {
    BaseButton,
    ProductDetails,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: null,
    },
  },
  emits: ['close', 'add-to-cart', 'buy-now'],
  data() {
    return {
      imageIndex: 0,
      activeTab: 'product-details',
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
  computed: {
    imageLength() {
      return this.product?.productImage?.length
    },
  },
  methods: {
    closeDialogue() {
      this.$emit('close')
    },
    setActiveTab(tab) {
      this.activeTab = tab
    },
    nextImage() {
      this.imageIndex++
      if (this.imageIndex >= this.product?.productImage?.length) {
        this.imageIndex = 0
      }
    },
    previousImage() {
      this.imageIndex--
      if (this.imageIndex < 0) {
        this.imageIndex = this.product?.productImage?.length - 1
      }
    },
    setImageIndex(index) {
      this.imageIndex = index
    },
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
        this.imageIndex = 0
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dialogue-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-md);
}

.dialogue-navigation {
  display: flex;
  flex-direction: row;
}

.dialogue-navigation-item {
  width: 50%;
  text-align: center;
  cursor: pointer;
  font-weight: 700;

  &.active {
    color: var(--primary);
  }

  &:hover {
    background-color: #f8fafc;
  }

  &:first-child {
    border-right: 3px solid var(--primary);
  }
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 2rem;
  color: #64748b;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    color: red;
  }
}

.image-action {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-md);
  position: absolute;
  inset: 0;
  justify-content: space-between;
  z-index: 2;
}

div :is(.previous-image, .next-image) {
  color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;

  &:is(:hover, :focus) {
    color: var(--primary);
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.image-pointer {
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  color: rgba(0, 0, 0, 0.25);
  align-self: flex-end;

  & span {
    cursor: pointer;

    &:is(:hover, :focus) {
      color: var(--primary);
    }
  }
  & span.active {
    color: var(--primary);
  }
}

.dialogue-body {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.product-image-main {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-sm);
  border: 3px solid var(--primary);
}

.product-image-container {
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius-md);
  background-color: #f8fafc;

  &--mini {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
    width: 100%;
    height: 50px;
    border-radius: var(--radius-md);
    overflow-x: auto;
    overflow-y: hidden;
    margin-top: var(--spacing-sm);

    img {
      width: 50px;
      flex: 0 0 50px;
      height: 100%;
      object-fit: cover;
      border-radius: var(--radius-md);
      cursor: pointer;
    }
    & img.active {
      border: 2px solid var(--primary);
    }
  }
}

.product-image {
  width: 100%;
  object-fit: cover;

  &--main {
    display: block;
    height: 300px;
  }
}

.product-details {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.product-name {
  font-family: var(--font-secondary);
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  text-align: left;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  text-align: left;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .dialogue-content {
    max-width: 95%;
  }

  .dialogue-body {
    flex-direction: column;
  }

  .product-dialogue {
    padding: var(--spacing-lg);
  }

  .product-image-container {
    width: 100%;
    height: auto;
  }

  .product-image--main {
    height: 250px;
  }

  .product-name {
    font-size: 1.5rem;
  }

  .product-actions {
    flex-direction: column;
  }

  .product-details {
    width: 100%;
  }
}
</style>
