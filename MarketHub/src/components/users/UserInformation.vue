<template>
  <div class="user-details">
    <div class="user-profile__container">
      <h1 class="user-profile__header">User Information</h1>
      <div v-if="user" class="user-profile__body">
        <div class="user-profile__picture">
          <img :src="picture" alt="User Picture" />
        </div>
        <div class="user-profile__information">
          <div class="user-profile__name">
            <h2>{{ name }}</h2>
          </div>
          <div class="user-profile__email">
            <i class="fa-solid fa-envelope" aria-hidden="true"></i>
            <p>{{ user.email }}</p>
          </div>
          <div class="user-profile__phone">
            <i class="fa-solid fa-phone" aria-hidden="true"></i>
            <p>{{ user.phone || 'No phone number' }}</p>
          </div>
        </div>
      </div>
      <div v-else class="user-profile__body">
        <p>No user information available.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetails',
  computed: {
    user() {
      return this.$store.getters['user/currentUser']
    },
    name() {
      if (!this.user) return ''
      return [this.user.firstName, this.user.lastName].filter(Boolean).join(' ')
    },
    picture() {
      return this.user?.profilePicture || '/groceries.jpg'
    },
  },
}
</script>

<style lang="scss" scoped>
.user-profile {
  &__container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem;
    background-color: #f0f0f0;
  }

  &__header {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
  }

  &__body {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  &__information {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  &__email,
  &__phone {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: #64748b;
      font-size: var(--icon-md);
      width: 1rem;
      text-align: center;
    }

    p {
      margin: 0;
    }
  }

  &__picture {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>
