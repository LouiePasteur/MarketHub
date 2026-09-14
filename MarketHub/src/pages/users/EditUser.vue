<template>
  <div>
    <h1>Personal Information</h1>
    <div class="user_form-container">
      <user-form class="user_form" @submit="handleSubmit"></user-form>
      <img src="/edituser.png" alt="Auth Background" />
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/users/UserForm.vue'
export default {
  components: {
    UserForm,
  },
  methods: {
    handleSubmit(payload) {
      this.$store.dispatch('user/updateUser', {
        id: this.$route.params.id,
        userId: this.$store.getters.userId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        cart: [],
        addresses: payload.address,
        paymentMethods: [],
        followers: [],
        followedStores: [],
        settings: [],
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.user_form {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 1024px) {
    width: 100%;
  }
}

img {
  @media (max-width: 1024px) {
    display: none;
  }
}

h1 {
  font-weight: 700;
  color: #fff;
  margin-bottom: 0;

  @media (max-width: 1024px) {
    font-size: 1.8em;
  }
}

.user_form-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
</style>
