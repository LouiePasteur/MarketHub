<template>
  <div class="header">
    <div class="header-content">
      <div class="app_name">
        <span class="header-title text-subheading text-white">Market</span
        ><span class="header-title header-title--highlight text-subheading text-primary">Hub</span>
      </div>

      <div class="icons-container">
        <router-link to="/store" class="store-icon">
          <i class="fa-solid fa-store" />
        </router-link>
        <span class="cart-icon" :class="{ active: isCartDialogueOpen }" @click="openCartDialogue">
          <i class="fa-solid fa-cart-shopping" />
        </span>
        <span class="notification-icon">
          <i class="fa-solid fa-bell" />
        </span>
        <div class="profile-icon">
          <div class="profile-container">
            <img src="/groceries.jpg" alt="Profile" />
          </div>
          <span class="profile-name text-body-sm text-white">{{ $store.getters['user/currentUser']?.firstName }} </span>
          <span class="profile-name text-body-sm text-white">{{ $store.getters['user/currentUser']?.lastName }}</span>
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
    closeCartDialogue() {
      this.isCartDialogueOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
.header-title {
  color: #fff;
  background-color: var(--primary);
  border-radius: var(--radius-lg);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.55rem 1rem;

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
  padding: 0.35rem;
  border-radius: var(--radius-md);
  transition: background-color 0.2s ease;

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
  }
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
    font-size: var(--icon-lg);
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

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.store-icon {
  display: flex;
  align-items: center;
  color: #fff;
}

.profile-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  gap: 0.2rem;
}

@media (max-width: 1024px) {
  .store-icon,
  .notification-icon,
  .profile-icon {
    display: none !important;
  }
}
</style>
