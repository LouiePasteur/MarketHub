<template>
  <div class="cart-container">
    <div class="cart-item" v-for="item in cartItems" :key="item.id">
      <div class="item-image">
        <img src="/groceries.jpg" alt="Cart Item Image" />
      </div>
      <div class="item-details">
        <div class="item-header">
          <div class="item-name">
            <h3>{{ item.name }}</h3>
            <div class="order-date" v-if="isCartPage">
              <p>{{ item.date }}</p>
            </div>
          </div>
          <div class="item-delete" v-if="!page">
            <button><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
        <div class="quantity-container" v-if="!page">
          <div class="subtract-quantity">
            <button class="quantity-button">-</button>
          </div>
          <div class="item-quantity">
            <input type="number" value="1" />
          </div>
          <div class="add-quantity">
            <button class="quantity-button">+</button>
          </div>
        </div>
        <div class="sold-quantity" v-if="isCartPage">
          <p>
            Quantity: <span>{{ item.price }}</span>
          </p>
        </div>
        <div class="history-status" v-if="page === 'order-history'">
          <p>Status: {{ item.status }}</p>
        </div>
        <div class="item-status" v-if="page === 'my-store'">
          <label for="status">Status: </label>
          <select
            name="status"
            :id="`status-${item.id}`"
            v-model="item.status"
            :class="getStatusClass(item.status)"
          >
            <option value="preparing">Preparing</option>
            <option value="shipping">In Shipping</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div class="item-price">
          <p>${{ item.price }}</p>
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
  },
  computed: {
    isCartPage() {
      return this.page === 'my-store' || this.page === 'order-history'
    },
  },
  methods: {
    getStatusClass(status) {
      if (!status) return '' // default - no color

      switch (status.toLowerCase()) {
        case 'preparing':
          return 'status-preparing'
        case 'shipping':
          return 'status-shipping'
        case 'completed':
          return 'status-completed'
        default:
          return '' // default - no color
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.cart-container {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  background-color: #fff;
}

.cart-item {
  display: flex;
  flex-direction: row;
  gap: 1rem;

  & img {
    width: 200px;
    border-radius: var(--radius-lg);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 1rem;
  }
}

.item-name {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.item-delete {
  & button {
    border: none;
  }
  & i {
    color: red;
    cursor: pointer;
  }
}

.item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    gap: 1rem;
  }
}

.item-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.item-price {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  & p {
    color: var(--primary);
    font-weight: 500;
  }
}

.item-quantity input {
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

.order-date {
  text-align: right;

  & p {
    font-size: 0.65rem;
  }
}

.quantity-container {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.quantity-button {
  background-color: #fff;
  padding: 0 3px;
  border: 1px solid var(--primary);
  color: var(--primary);
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
}

.item-status {
  select {
    padding: 0.5rem;
    border-radius: var(--radius-lg);
    border: 1px solid #ddd;
    font-size: 1rem;
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
  }
}
</style>
