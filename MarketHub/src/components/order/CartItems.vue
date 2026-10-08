<template>
  <div class="cart-container" :class="{ compact }">
    <div class="cart-item" v-for="item in normalizedItems" :key="item.id">
      <label v-if="!page" class="item-select" :for="`cart-item-${item.id}`">
        <input
          :id="`cart-item-${item.id}`"
          type="checkbox"
          :checked="isSelected(item.id)"
          @change="toggleItem(item.id)"
        />
        <span class="item-select__box"></span>
      </label>
      <div class="item-image">
        <img :src="item.image || '/groceries.jpg'" :alt="item.name" />
      </div>
      <div class="item-details">
        <div class="item-header">
          <div class="item-name">
            <h3 class="text-subheading">{{ item.name }}</h3>
            <div class="order-date" v-if="isCartPage">
              <p class="text-caption text-muted">{{ item.date }}</p>
            </div>
          </div>
          <div class="item-delete" v-if="!page">
            <button type="button" aria-label="Remove item" @click="openDeleteDialogue(item)">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>

        <div class="quantity-container" v-if="!page">
          <button
            class="quantity-button"
            type="button"
            aria-label="Decrease quantity"
            @click="changeQuantity(item, -1)"
          >
            -
          </button>
          <div class="item-quantity">
            <input
              class="text-body"
              type="number"
              :value="item.quantity || 1"
              min="1"
              :max="item.stocks ?? undefined"
              @change="onQuantityInput(item, $event)"
            />
          </div>
          <button
            class="quantity-button"
            type="button"
            aria-label="Increase quantity"
            :disabled="disableAddingQuantity(item)"
            @click="changeQuantity(item, 1)"
          >
            +
          </button>
        </div>
        <p v-if="!page && item.exceedsStock" class="quantity-warning text-caption">
          This product exceeds the remaining stocks ({{ item.stocks }} left).
        </p>

        <div class="sold-quantity" v-if="isCartPage">
          <p class="text-body-sm text-muted">
            Quantity: <span>{{ item.quantity || item.price }}</span>
          </p>
        </div>

        <div class="history-status" v-if="page === 'order-history'">
          <p class="text-body-sm text-muted">Status: {{ item.status }}</p>
        </div>

        <div class="item-status" v-if="page === 'my-store'">
          <label class="text-label" for="status">Status: </label>
          <select
            name="status"
            :id="`status-${item.id}`"
            v-model="item.status"
            :class="getStatusClass(item.status)"
          >
            <option value="preparing">Preparing</option>
            <option value="shipping">In Shipping</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div class="item-price">
          <p class="text-subheading text-primary">
            ${{ compact ? item.price * (item.quantity || 1) : item.price }}
          </p>
          <div class="item-description" v-if="page === 'my-store'">
            <base-button class="button button-primary">Update</base-button>
          </div>
        </div>
      </div>
    </div>

    <base-dialogue :isOpen="isDeleteDialogueOpen" @close="closeDeleteDialogue">
      <div class="delete-dialogue">
        <h3 class="text-heading delete-dialogue__title">Remove item</h3>
        <p class="text-body text-muted">
          Do you want to delete
          <span v-if="pendingDeleteItem">{{ pendingDeleteItem.name }}</span>
          from your cart?
        </p>
        <div class="delete-dialogue__actions">
          <base-button class="button button-secondary" @click="closeDeleteDialogue">No</base-button>
          <base-button class="button button-danger" @click="confirmDeleteItem">Yes</base-button>
        </div>
      </div>
    </base-dialogue>

    <base-toast
      :visible="toastVisible"
      :message="toastMessage"
      :type="toastType"
      @close="closeToast"
    />
  </div>
</template>

<script>
export default {
  props: {
    cartItems: {
      type: Array,
      default: [],
    },
    page: {
      type: String,
      default: '',
    },
    compact: {
      type: Boolean,
      default: false,
    },
    selectedIds: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['toggle-item'],
  data() {
    return {
      isDeleteDialogueOpen: false,
      pendingDeleteItem: null,
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
  computed: {
    isCartPage() {
      return this.page === 'my-store' || this.page === 'order-history'
    },
    normalizedItems() {
      const products = this.$store.getters['products/products'] || []
      return this.cartItems.map((item, index) => {
        const image = item.image || item.productImage
        const product = products.find((entry) => String(entry.id) === String(item.productId))
        const stocks = product != null ? Number(product.stocks) : null
        const quantity = item.quantity ?? item.productQuantity ?? 1
        return {
          ...item,
          id: item.id || `cart-item-${index}`,
          name: item.name || item.productName || 'Product',
          image: Array.isArray(image) ? image[0] : image,
          price: item.price ?? item.productPrice ?? 0,
          quantity,
          stocks: Number.isNaN(stocks) ? null : stocks,
          exceedsStock: stocks != null && !Number.isNaN(stocks) && quantity > stocks,
        }
      })
    },
  },
  methods: {
    isSelected(id) {
      return this.selectedIds.includes(id)
    },
    toggleItem(id) {
      this.$emit('toggle-item', id)
    },
    disableAddingQuantity(item) {
      if (item.stocks == null) {
        return false
      }
      return (item.quantity || 1) >= item.stocks
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
    openDeleteDialogue(item) {
      this.pendingDeleteItem = item
      this.isDeleteDialogueOpen = true
    },
    closeDeleteDialogue() {
      this.isDeleteDialogueOpen = false
      this.pendingDeleteItem = null
    },
    confirmDeleteItem() {
      if (!this.pendingDeleteItem?.id) {
        this.closeDeleteDialogue()
        return
      }
      this.$store.dispatch('cart/deleteCartItem', { id: this.pendingDeleteItem.id })
      this.closeDeleteDialogue()
    },
    changeQuantity(item, counter) {
      const currentQuantity = item.quantity || 1
      if (counter < 0 && currentQuantity <= 1) {
        this.openDeleteDialogue(item)
        return
      }

      if (counter > 0 && this.disableAddingQuantity(item)) {
        this.showToast('This product exceeds the remaining stocks.', 'error')
        return
      }

      const nextQuantity = Math.max(1, currentQuantity + counter)
      if (nextQuantity === currentQuantity) {
        return
      }
      this.$store.dispatch('cart/updateCartItem', {
        id: item.id,
        productQuantity: nextQuantity,
      })
    },
    onQuantityInput(item, event) {
      let nextQuantity = Math.max(1, Number(event.target.value) || 1)

      if (item.stocks != null && nextQuantity > item.stocks) {
        nextQuantity = item.stocks
        event.target.value = nextQuantity
        this.showToast('This product exceeds the remaining stocks.', 'error')
      } else {
        event.target.value = nextQuantity
      }

      if (nextQuantity === (item.quantity || 1)) {
        return
      }
      this.$store.dispatch('cart/updateCartItem', {
        id: item.id,
        productQuantity: nextQuantity,
      })
    },

    getStatusClass(status) {
      if (!status) return ''

      switch (status.toLowerCase()) {
        case 'preparing':
          return 'status-preparing'
        case 'shipping':
          return 'status-shipping'
        case 'completed':
          return 'status-completed'
        case 'cancelled':
          return 'status-cancelled'
        default:
          return ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.cart {
  &-container {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    background-color: #fff;

    &.compact {
      padding: 0.5rem 0;
      max-height: 340px;

      .cart-item {
        gap: 0.75rem;
        padding: 0.85rem 1.25rem;
        border-bottom: 1px solid #f1f5f9;
        align-items: center;

        &:last-child {
          border-bottom: none;
        }
      }

      .item-image img {
        width: 72px;
        height: 72px;
        object-fit: cover;
      }

      .item-details {
        gap: 0.5rem;
      }

      .item-name h3 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .quantity-button {
        width: 1.75rem;
        height: 1.75rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-md);
      }

      .item-quantity input {
        width: 2.25rem;
        height: 1.75rem;
        border: 1px solid #e2e8f0;
        border-radius: var(--radius-md);
      }

      .item-delete button {
        width: 1.75rem;
        height: 1.75rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-md);
        background-color: #fef2f2;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: #fee2e2;
        }

        i {
          font-size: var(--icon-sm);
        }
      }
    }
  }

  &-item {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    & img {
      width: 200px;
      border-radius: var(--radius-lg);
      object-fit: cover;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      margin-bottom: 1rem;
    }
  }
}

.item {
  &-select {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    &__box {
      width: 1.15rem;
      height: 1.15rem;
      border: 2px solid #cbd5e1;
      border-radius: var(--radius-sm);
      background-color: #fff;
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease;
      position: relative;
    }

    input:checked + &__box {
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

    &:hover &__box {
      border-color: var(--primary);
    }
  }

  &-name {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
  }

  &-delete {
    flex-shrink: 0;

    & button {
      border: none;
      background: transparent;
      cursor: pointer;
    }

    & i {
      color: #ef4444;
      cursor: pointer;
    }
  }

  &-details {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 100%;

    @media (max-width: 768px) {
      gap: 1rem;
    }
  }

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    gap: 0.5rem;
  }

  &-price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &-quantity input {
    width: 30px;
    text-align: center;
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &-status {
    select {
      padding: 0.5rem;
      border-radius: var(--radius-lg);
      border: 1px solid #ddd;
      cursor: pointer;
      transition: all 0.3s ease;

      &.status-preparing {
        background-color: #fff3e0;
        color: #e65100;
        border-color: #ff9800;

        &:focus {
          outline: none;
          border-color: #ff9800;
          box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.2);
        }
      }

      &.status-shipping {
        background-color: #e3f2fd;
        color: #1565c0;
        border-color: #2196f3;

        &:focus {
          outline: none;
          border-color: #2196f3;
          box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.2);
        }
      }

      &.status-completed {
        background-color: #e8f5e9;
        color: #2e7d32;
        border-color: #4caf50;

        &:focus {
          outline: none;
          border-color: #4caf50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
        }
      }

      &.status-cancelled {
        background-color: #ffebee;
        color: #c62828;
        border-color: #ef5350;

        &:focus {
          outline: none;
          border-color: #ef5350;
          box-shadow: 0 0 0 3px rgba(239, 83, 80, 0.2);
        }
      }
    }
  }
}

.order-date {
  text-align: right;
}

.quantity {
  &-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  &-button {
    background-color: #fff;
    padding: 0 3px;
    border: 1px solid var(--primary);
    color: var(--primary);
    font-weight: 800;
    font-size: var(--text-body-lg);
    line-height: 1;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover:not(:disabled) {
      background-color: var(--primary);
      color: #fff;
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      border-color: #cbd5e1;
      color: #94a3b8;
    }
  }

  &-warning {
    margin: 0;
    color: var(--error);
  }
}

.delete-dialogue {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;

  h3,
  p {
    margin: 0;
  }

  &__title {
    color: var(--error);
  }

  span {
    font-weight: 700;
    color: #0f172a;
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.5rem;

    .button {
      min-width: 7rem;
    }
  }
}
</style>
