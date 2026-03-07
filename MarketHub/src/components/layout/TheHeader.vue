<template>
  <div class="header">
    <div class="header-content">
      <div class="app_name">
        <span class="header-title">Market</span
        ><span class="header-title header-title--highlight">Hub</span>
      </div>

      <div class="icons-container">
        <router-link to="/store" class="store-icon">
          <i class="fa-solid fa-store" />
        </router-link>
        <span class="cart-icon" @click="openCartDialogue">
          <i class="fa-solid fa-cart-shopping" />
        </span>
        <span class="notification-icon">
          <i class="fa-solid fa-bell" />
        </span>
        <div class="profile-icon">
          <div class="profile-container">
            <img src="/groceries.jpg" alt="Profile" />
          </div>
          <span class="profile-name">{{ $store.getters['user/currentUser']?.firstName }} </span>
          <span class="profile-name">{{ $store.getters['user/currentUser']?.lastName }}</span>
        </div>
      </div>
    </div>
    <cart-dialogue-box :isOpen="isCartDialogueOpen" @close="closeCartDialogue" />
  </div>
</template>

<script>
import CartDialogueBox from '@/components/order/CartDialogueBox.vue'
export default {
  components: {
    CartDialogueBox,
  },
  data() {
    return {
      isCartDialogueOpen: false,
    }
  },
  methods: {
    openCartDialogue() {
      this.isCartDialogueOpen = !this.isCartDialogueOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.header-title {
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  background-color: var(--primary);
  border-radius: var(--radius-lg);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.25rem 1rem;

  &--highlight {
    color: var(--primary);
    background-color: #fff;
    border-radius: var(--radius-lg);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:hover {
    cursor: pointer;
  }
}

.cart-icon {
  position: relative;
}

.header {
  width: 100%;
  padding: 5px 30px;

  &-content {
    color: #fff;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
}

.icons-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
  gap: 20px;

  & i {
    font-size: 1.4rem;
    cursor: pointer;
  }

  & span {
    display: flex;
  }
}

i {
  cursor: pointer;
}

.profile-container {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.store-icon {
  display: flex;
  align-items: center;
  color: #fff;
}

@media (max-width: 1024px) {
  .store-icon,
  .notification-icon,
  .profile-icon {
    display: none !important;
  }
}
</style>
