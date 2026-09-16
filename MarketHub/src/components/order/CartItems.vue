<template>
  <div class="cart-container" :class="{ compact }">
    <div class="cart-item" v-for="item in cartItems" :key="item.id">
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
            <button type="button" aria-label="Remove item">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>

        <div class="quantity-container" v-if="!page">
          <button class="quantity-button" type="button" aria-label="Decrease quantity">-</button>
          <div class="item-quantity">
            <input class="text-body" type="number" :value="item.quantity || 1" min="1" />
          </div>
          <button class="quantity-button" type="button" aria-label="Increase quantity">+</button>
        </div>

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
  },
  computed: {
    isCartPage() {
      return this.page === 'my-store' || this.page === 'order-history'
    },
  },
  methods: {
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
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: var(--primary);
      color: #fff;
    }
  }
}
</style>
