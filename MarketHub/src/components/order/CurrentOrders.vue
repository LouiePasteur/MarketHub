<template>
  <div class="current-orders">
    <div v-if="orders.length === 0" class="no-orders">
      <h3 class="text-heading text-muted">No current orders yet.</h3>
    </div>
    <div v-else class="orders-list">
      <div class="order-card" v-for="order in orders" :key="order.id">
        <div class="order-header">
          <div class="order-customer">
            <h3 class="text-subheading">{{ order.customerName }}</h3>
            <p class="order-date text-caption text-muted">{{ order.date }}</p>
          </div>
          <div class="order-status">
            <label class="text-label" :for="`status-${order.id}`">Status:</label>
            <select
              :id="`status-${order.id}`"
              v-model="order.status"
              :class="getStatusClass(order.status)"
            >
              <option value="preparing">Preparing</option>
              <option value="shipping">In Shipping</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div class="order-items" :class="{ scrollable: order.items.length >= 2 }">
          <div class="order-item" v-for="item in order.items" :key="item.id">
            <div class="item-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="item-details">
              <div class="item-name-row">
                <h4 class="item-name text-subheading">{{ item.name }}</h4>
                <span class="item-quantity text-caption text-muted">x({{ item.quantity }})</span>
              </div>
              <p class="item-price text-body-sm text-primary">
                <span>${{ item.price * item.quantity }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="order-footer">
          <p class="order-total text-body">
            Total: <span class="text-subheading text-primary">${{ getOrderTotal(order) }}</span>
          </p>
          <base-button class="button button-primary"> Update </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentOrders',
  data() {
    return {
      orders: [
        {
          id: 1,
          customerName: 'John Smith',
          date: '2026-03-10',
          status: 'preparing',
          items: [
            {
              id: 1,
              name: 'Fresh Vegetables Pack',
              image: '/groceries.jpg',
              quantity: 2,
              price: 50,
            },
            {
              id: 2,
              name: 'Cosmetic Set',
              image: '/cosmetics.jpg',
              quantity: 1,
              price: 100,
            },
          ],
        },
        {
          id: 2,
          customerName: 'Maria Garcia',
          date: '2026-03-12',
          status: 'preparing',
          items: [
            {
              id: 3,
              name: 'Laptop Stand',
              image: '/computer.jpg',
              quantity: 1,
              price: 250,
            },
          ],
        },
        {
          id: 3,
          customerName: 'Alex Chen',
          date: '2026-03-14',
          status: 'shipping',
          items: [
            {
              id: 4,
              name: 'Summer Jacket',
              image: '/fashion.jpg',
              quantity: 1,
              price: 180,
            },
            {
              id: 5,
              name: 'Grocery Bundle',
              image: '/groceries.jpg',
              quantity: 3,
              price: 40,
            },
          ],
        },
      ],
    }
  },
  methods: {
    getOrderTotal(order) {
      return order.items.reduce((total, item) => total + item.price * item.quantity, 0)
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
.current-orders {
  width: 100%;
  margin: 0;
}

.no-orders {
  text-align: center;
  padding: 2rem;
}

.orders-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.order {
  &-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: var(--radius-md);
    background-color: #fff;
    height: 100%;
  }

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;

    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }

  &-customer {
    h3 {
      margin: 0;
    }
  }

  &-date {
    margin: 0.25rem 0 0;
  }

  &-status {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

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

  &-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.scrollable {
      max-height: 220px;
      overflow-y: auto;
      padding-right: 0.5rem;
    }
  }

  &-item {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }

  &-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px solid #e2e8f0;
    gap: 1rem;

    @media (max-width: 1024px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  &-total {
    margin: 0;
    font-weight: 500;
  }
}

.item {
  &-image {
    flex-shrink: 0;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: var(--radius-lg);

      @media (max-width: 768px) {
        width: 120px;
        height: 120px;
      }
    }
  }

  &-details {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  &-name-row {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 0.5rem;
  }

  &-name {
    margin: 0;
  }

  &-quantity {
    white-space: nowrap;
  }

  &-price {
    margin: 0;

    span {
      font-weight: 500;
      color: var(--primary);
    }
  }
}
</style>
