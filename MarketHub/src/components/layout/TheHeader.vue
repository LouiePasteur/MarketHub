<template>
  <div class="header">
    <div class="header-content">
      <span class="header-title">MarketHub</span>
      <div class="icons-container">
        <router-link to="/store" class="store-icon">
          <i class="fa-solid fa-store" />
        </router-link>
        <span class="cart-icon">
          <i class="fa-solid fa-cart-shopping" />
        </span>
        <span class="notification-icon">
          <i class="fa-solid fa-bell" />
        </span>
        <div class="profile-icon">
          <div class="profile-container">
            <img src="/groceries.jpg" alt="Profile" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: var(--primary);
  padding: 5px 30px;

  &-title {
    font-size: 1.5rem;
    font-weight: 500;

    &:hover {
      cursor: pointer;
    }
  }

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
