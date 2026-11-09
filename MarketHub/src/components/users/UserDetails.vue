<template>
  <div class="user-details">
    <UserInformation />
    <UserShippingAddress />
    <UserAccountOptions />
  </div>
</template>

<script>
import UserInformation from './UserInformation.vue'
import UserShippingAddress from './UserShippingAddress.vue'
import UserAccountOptions from './UserAccountOptions.vue'
export default {
  components: {
    UserInformation,
    UserShippingAddress,
    UserAccountOptions,
  },
}
</script>

<style lang="scss" scoped>
.user-details {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: 1.5rem 1rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem 2rem;
    gap: 0.85rem;
  }
}
</style>
