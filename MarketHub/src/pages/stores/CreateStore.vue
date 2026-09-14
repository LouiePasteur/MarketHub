<template>
  <div class="container">
    <store-form class="store_form" @submit="handleSubmit"></store-form>
    <img src="/store-market.png" alt="Auth Background" />
  </div>
</template>

<script>
import StoreForm from '@/components/store/StoreForm.vue'
export default {
  components: {
    StoreForm,
  },
  methods: {
    handleSubmit(payload) {
      this.$store.dispatch('stores/addStore', payload)
    },
  },
}
</script>

<style lang="scss" scoped>
.store_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 50%;

  @media (max-width: 1024px) {
    width: 100%;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

img {
  width: 50%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 1024px) {
    display: none;
  }
}
</style>
