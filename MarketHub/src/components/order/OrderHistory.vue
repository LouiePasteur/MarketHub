<template>
  <div>
    <p>Order History</p>
    <order-history-items />
  </div>
</template>

<script>
import CartItems from '@/components/order/CartItems.vue'

export default {
  components: {
    CartItems,
  },
}
</script>
