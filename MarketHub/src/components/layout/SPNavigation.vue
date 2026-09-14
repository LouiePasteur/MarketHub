<template>
  <div class="sp-navigation">
    <span
      class="products-icon"
      :class="{ active: active === 'products' }"
      @click="makeActive('products')"
    >
      <i class="fa-solid fa-box" />
    </span>
    <span class="store-icon" :class="{ active: active === 'store' }" @click="makeActive('store')">
      <i class="fa-solid fa-store" />
    </span>

    <span
      class="notification-icon"
      :class="{ active: active === 'notification' }"
      @click="makeActive('notification')"
    >
      <i class="fa-solid fa-bell" />
    </span>
    <div
      class="profile-icon"
      :class="{ active: active === 'profile' }"
      @click="makeActive('profile')"
    >
      <div class="profile-container">
        <img src="/groceries.jpg" alt="Profile" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'products',
    }
  },
  methods: {
    makeActive(icon) {
      this.active = icon
    },
  },
}
</script>

<style lang="scss" scoped>
.sp-navigation {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 10px;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
  }

  i {
    font-size: 1.5rem;
    cursor: pointer;
  }

  .active {
    color: var(--primary);
  }

  .profile-container {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }
}
</style>
