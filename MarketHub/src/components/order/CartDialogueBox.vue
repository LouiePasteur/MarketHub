<template>
  <div v-if="isOpen" class="cart-overlay" @click.self="$emit('close')">
    <div class="cart-dialogue">
      <div class="cart-dialogue__header">
        <div class="cart-dialogue__title">
          <i class="fa-solid fa-cart-shopping"></i>
          <h2 class="text-heading text-dark">Shopping Cart</h2>
          <span v-if="items.length" class="cart-dialogue__count text-caption">{{
            items.length
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

      <div v-if="items.length === 0" class="cart-dialogue__empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <h3 class="text-subheading text-dark">Your cart is empty</h3>
        <p class="text-body-sm text-muted">Add items to get started.</p>
      </div>

      <cart-items v-else :cartItems="items" compact />

      <div v-if="items.length" class="cart-dialogue__footer">
        <div class="cart-dialogue__total">
          <span class="text-body text-muted cart-dialogue__total-label">Total</span>
          <span class="text-subheading text-primary cart-dialogue__total-value">${{ total }}</span>
        </div>
        <base-button class="button button-primary cart-dialogue__checkout">Checkout</base-button>
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
      items: [
        {
          id: 1,
          name: 'Fresh Vegetables Pack',
          image: '/groceries.jpg',
          price: 50,
          quantity: 2,
        },
        {
          id: 2,
          name: 'Cosmetic Set',
          image: '/cosmetics.jpg',
          price: 100,
          quantity: 1,
        },
        {
          id: 3,
          name: 'Laptop Stand',
          image: '/computer.jpg',
          price: 250,
          quantity: 1,
        },
      ],
    }
  },
  computed: {
    total() {
      return this.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    },
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
