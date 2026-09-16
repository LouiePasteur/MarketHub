<template>
  <div>
    <p class="text-title text-primary">Order History Items</p>
    <div v-for="order in orders" :key="order.id">
      <p class="text-body text-muted">{{ order.id }}</p>
      <p class="text-caption text-muted">{{ order.date }}</p>
      <p class="text-subheading text-primary">{{ order.total }}</p>
      <p class="text-body-sm text-muted">{{ order.status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderHistoryItems',
}
</script>
