<template>
  <div v-if="isOpen" class="cart-overlay" @click.self="$emit('close')">
    <div class="cart-dialogue">
      <div class="cart-dialogue__header">
        <div class="cart-dialogue__title">
          <i class="fa-solid fa-cart-shopping"></i>
          <h2 class="text-heading text-dark">Shopping Cart</h2>
          <span v-if="cartItems.length" class="cart-dialogue__count text-caption">{{
            cartItems.length
          }}</span>
        </div>
        <button
          class="cart-dialogue__close"
          type="button"
          aria-label="Close cart"
          @click="$emit('close')"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div v-if="cartItems.length === 0" class="cart-dialogue__empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <h3 class="text-subheading text-dark">Your cart is empty</h3>
        <p class="text-body-sm text-muted">Add items to get started.</p>
      </div>

      <template v-else>
        <div class="cart-dialogue__select-all">
          <label class="cart-dialogue__checkbox" for="cart-select-all">
            <input
              id="cart-select-all"
              ref="selectAllCheckbox"
              type="checkbox"
              :checked="allSelected"
              @change="toggleSelectAll"
            />
            <span class="cart-dialogue__checkbox-box"></span>
            <span class="text-body-sm text-muted">Select all</span>
          </label>
          <span class="text-caption text-muted">{{ selectedCount }} selected</span>
        </div>

        <cart-items
          :cartItems="cartItems"
          :selectedIds="selectedIds"
          compact
          @toggle-item="toggleItem"
        />
      </template>

      <div v-if="items.length" class="cart-dialogue__footer">
        <div class="cart-dialogue__total">
          <span class="text-body text-muted cart-dialogue__total-label">Total</span>
          <span class="text-subheading text-primary cart-dialogue__total-value">${{ total }}</span>
        </div>
        <base-button
          class="button button-primary cart-dialogue__checkout"
          :disabled="isCheckoutDisabled"
        >
          Checkout
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import CartItems from '@/components/order/CartItems.vue'

export default {
  components: {
    CartItems,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    cartItems: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['close'],
  data() {
    return {
      selectedIds: [],
    }
  },
  computed: {
    items() {
      const products = this.$store.getters['products/products'] || []
      return this.cartItems.map((item, index) => {
        const image = item.image || item.productImage
        const product = products.find((entry) => String(entry.id) === String(item.productId))
        const stocks = product != null ? Number(product.stocks) : null
        const quantity = Number(item.quantity ?? item.productQuantity ?? 1)
        return {
          ...item,
          id: item.id || `cart-item-${index}`,
          name: item.name || item.productName || 'Product',
          image: Array.isArray(image) ? image[0] : image,
          price: Number(item.price ?? item.productPrice ?? 0),
          quantity,
          stocks: Number.isNaN(stocks) ? null : stocks,
          exceedsStock: stocks != null && !Number.isNaN(stocks) && quantity > stocks,
        }
      })
    },
    selectedItems() {
      return this.items.filter((item) => this.selectedIds.includes(item.id))
    },
    selectedCount() {
      return this.selectedItems.length
    },
    hasSelectedExceedingStock() {
      return this.selectedItems.some((item) => item.exceedsStock)
    },
    isCheckoutDisabled() {
      return this.selectedCount === 0 || this.hasSelectedExceedingStock
    },
    allSelected() {
      return this.items.length > 0 && this.selectedCount === this.items.length
    },
    someSelected() {
      return this.selectedCount > 0
    },
    total() {
      return this.selectedItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    },
  },
  watch: {
    cartItems: {
      immediate: true,
      handler(items) {
        const validIds = items.map((item, index) => item.id || `cart-item-${index}`)
        this.selectedIds = this.selectedIds.filter((id) => validIds.includes(id))
      },
    },
  },
  methods: {
    toggleItem(id) {
      if (this.selectedIds.includes(id)) {
        this.selectedIds = this.selectedIds.filter((itemId) => itemId !== id)
      } else {
        this.selectedIds = [...this.selectedIds, id]
      }
      this.$nextTick(this.updateSelectAllState)
    },
    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedIds = []
      } else {
        this.selectedIds = this.items.map((item) => item.id)
      }
      this.$nextTick(this.updateSelectAllState)
    },
    updateSelectAllState() {
      const checkbox = this.$refs.selectAllCheckbox
      if (checkbox) {
        checkbox.indeterminate = this.someSelected && !this.allSelected
      }
    },
  },
  updated() {
    this.updateSelectAllState()
  },
}
</script>

<style lang="scss" scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgba(15, 23, 42, 0.25);
}

.cart-dialogue {
  position: absolute;
  top: 70px;
  right: 1.5rem;
  width: 420px;
  max-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;

  @media (max-width: 768px) {
    top: 60px;
    right: 0.75rem;
    left: 0.75rem;
    width: auto;
    max-height: calc(100vh - 80px);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #e2e8f0;
    background-color: #f8fafc;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    i {
      color: var(--primary);
      font-size: var(--icon-md);
    }

    h2 {
      margin: 0;
    }
  }

  &__count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.35rem;
    height: 1.35rem;
    padding: 0 0.35rem;
    border-radius: 999px;
    background-color: var(--primary);
    color: #fff;
    font-weight: 700;
  }

  &__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: var(--radius-md);
    background-color: transparent;
    color: #64748b;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    i {
      font-size: var(--icon-md);
    }

    &:hover {
      background-color: #e2e8f0;
      color: #0f172a;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 3rem 1.5rem;
    text-align: center;

    i {
      font-size: var(--icon-xl);
      color: var(--primary);
      margin-bottom: 0.25rem;
    }

    h3,
    p {
      margin: 0;
    }
  }

  &__select-all {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
  }

  &__checkbox {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    &-box {
      width: 1.15rem;
      height: 1.15rem;
      border: 2px solid #cbd5e1;
      border-radius: var(--radius-sm);
      background-color: #fff;
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease;
      position: relative;
      flex-shrink: 0;
    }

    input:checked + &-box {
      background-color: var(--primary);
      border-color: var(--primary);

      &::after {
        content: '';
        position: absolute;
        left: 0.28rem;
        top: 0.05rem;
        width: 0.28rem;
        height: 0.55rem;
        border: solid #fff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    input:indeterminate + &-box {
      background-color: var(--primary);
      border-color: var(--primary);

      &::after {
        content: '';
        position: absolute;
        left: 0.2rem;
        top: 0.4rem;
        width: 0.55rem;
        height: 0.12rem;
        background-color: #fff;
        border-radius: 1px;
      }
    }

    &:hover &-box {
      border-color: var(--primary);
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: 1rem 1.25rem;
    border-top: 1px solid #e2e8f0;
    background-color: #f8fafc;
  }

  &__total {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-label,
    &-value {
      font-weight: 800;
    }
  }

  &__checkout {
    width: 100%;
  }
}
</style>
