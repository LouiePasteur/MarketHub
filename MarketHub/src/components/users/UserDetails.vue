<template>
  <div class="user-details">
    <UserInformation />
    <UserShippingAddress />
  </div>
</template>

<script>
import UserInformation from './UserInformation.vue'
import UserShippingAddress from './UserShippingAddress.vue'
export default {
  components: {
    UserInformation,
    UserShippingAddress,
  },
}
</script>

<style lang="scss" scoped></style>
