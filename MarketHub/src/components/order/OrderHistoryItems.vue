<template>
  <div>
    <p>Order History Items</p>
    <div v-for="order in orders" :key="order.id">
      <p>{{ order.id }}</p>
      <p>{{ order.date }}</p>
      <p>{{ order.total }}</p>
      <p>{{ order.status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderHistoryItems',
}
</script>
