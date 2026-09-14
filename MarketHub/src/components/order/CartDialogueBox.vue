<template>
  <div class="cart-dialogue_container" v-if="isOpen">
    <cart-items :cartItems="cartItems" />
    <div class="cart-dialogue_footer">
      <div class="total-price">
        <p>
          Total: <span class="price-value">${{ total }}</span>
        </p>
      </div>
      <div class="checkout-button">
        <base-button :classes="'button-primary'">Checkout</base-button>
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
      default: [],
    },
  },
  data() {
    return {
      cartItems: [
        {
          id: 1,
          name: 'Product 1',
          image: '/groceries.jpg',
          price: 100,
        },
        {
          id: 2,
          name: 'Product 2',
          image: '/groceries.jpg',
          price: 100,
        },
        {
          id: 3,
          name: 'Product 3',
          image: '/groceries.jpg',
          price: 100,
        },
        {
          id: 4,
          name: 'Product 4',
          image: '/groceries.jpg',
          price: 100,
        },
        {
          id: 5,
          name: 'Product 5',
          image: '/groceries.jpg',
          price: 100,
        },
      ],
      total: 0,
    }
  },
}
</script>

<style lang="scss" scoped>
.cart-dialogue_container {
  width: 450px;
  position: absolute;
  top: 69px;
  right: 0;
  height: 400px;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  padding: 10px;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
}

.cart-dialogue_footer {
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.price-value {
  color: var(--primary);
}
</style>
