<template>
  <base-card>
    <li class="product-item" @click="openDialogue">
      <img :src="image" alt="Product Image" />
      <div class="product-item-name text-subheading">
        {{ name }}
      </div>
      <div class="products-stars">
        <span v-for="star in 5" :key="star" class="star filled"> ★ </span>
        <span class="numeric-rating text-caption text-muted">(4.5)</span>z
      </div>
      <div class="product-item-price text-subheading text-primary">$ {{ price }}</div>
    </li>
    <base-button class="button" :class="'button-secondary'" @click="addToCart">
      Add to Cart
    </base-button>
    <base-button class="button" :class="'button-primary'"> Buy Now </base-button>
    <base-toast
      :visible="toastVisible"
      :message="toastMessage"
      :type="toastType"
      @close="closeToast"
    />
  </base-card>
</template>

<script>
export default {
  props: {
    name: { type: String },
    image: { type: String },
    price: { type: [Number, String] },
    product: { type: Object },
  },
  emits: ['open-dialogue', 'add-to-cart', 'buy-now'],
  data() {
    return {
      toastVisible: false,
      toastMessage: '',
      toastType: 'info',
      toastTimer: null,
    }
  },
  beforeUnmount() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer)
    }
  },
  methods: {
    openDialogue() {
      this.$emit(
        'open-dialogue',
        this.product || {
          name: this.name,
          image: this.image,
          price: this.price,
        },
      )
    },
    showToast(message, type = 'info') {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer)
      }
      this.toastMessage = message
      this.toastType = type
      this.toastVisible = true
      this.toastTimer = setTimeout(() => {
        this.toastVisible = false
      }, 3000)
    },
    closeToast() {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer)
        this.toastTimer = null
      }
      this.toastVisible = false
    },
    addToCart() {
      const storeId = this.product.storeId
      const store = this.$store.getters['stores/stores'].find(
        (item) => String(item.id) === String(storeId) || String(item.storeId) === String(storeId),
      )

      this.$store
        .dispatch('cart/addCartItem', {
          productId: this.product.id,
          productName: this.product.productName || this.name,
          productPrice: this.product.price ?? this.price,
          productQuantity: 1,
          productImage: this.image || this.product.productImage,
          productStoreId: storeId,
          productStoreName: store?.storeName || '',
        })
        .then(() => {
          this.showToast('Item added to cart', 'success')
        })
        .catch((error) => {
          this.showToast(error.message || 'Failed to add item to cart', 'error')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.product-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  &-name {
    text-align: left;
  }

  &-price {
    text-align: left;
  }
}

.button {
  width: 100%;
  margin-top: 0.5rem;
}

img {
  object-fit: cover;
  width: 100%;
  height: 200px;
  background-color: #f8fafc;
  border-radius: var(--radius-md);
}

.star {
  font-size: var(--icon-md);
  color: #cbd5f5;

  &.filled {
    color: #f59e0b;
  }
}

.products-stars {
  text-align: left;
}
</style>
