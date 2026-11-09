<template>
  <section class="account-options">
    <div class="account-options__header">
      <p class="account-options__eyebrow">Settings</p>
      <h1>Account</h1>
    </div>

    <div class="account-options__group">
      <button type="button" class="account-options__item" @click="openHelp">
        <span class="account-options__item-main">
          <i class="fa-solid fa-circle-question" aria-hidden="true"></i>
          <span>Help</span>
        </span>
        <i class="fa-solid fa-chevron-right account-options__chevron" aria-hidden="true"></i>
      </button>
      <button type="button" class="account-options__item" @click="openAbout">
        <span class="account-options__item-main">
          <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
          <span>About</span>
        </span>
        <i class="fa-solid fa-chevron-right account-options__chevron" aria-hidden="true"></i>
      </button>
    </div>

    <div class="account-options__group">
      <button
        type="button"
        class="account-options__item account-options__item--danger"
        @click="openDeleteDialogue"
      >
        <span class="account-options__item-main">
          <i class="fa-solid fa-trash" aria-hidden="true"></i>
          <span>Delete Account</span>
        </span>
      </button>
      <button
        type="button"
        class="account-options__item account-options__item--danger"
        @click="logout"
      >
        <span class="account-options__item-main">
          <i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
          <span>Logout</span>
        </span>
      </button>
    </div>

    <base-dialogue :isOpen="isHelpOpen" @close="isHelpOpen = false">
      <div class="info-dialogue">
        <h3 class="text-heading">Help</h3>
        <p class="text-body text-muted">
          Need assistance with MarketHub? Check your orders, manage your store, or update your
          shipping addresses from your profile. For account issues, make sure your personal
          information and contact details are up to date.
        </p>
        <div class="info-dialogue__actions">
          <base-button class="button button-primary" @click="isHelpOpen = false">Close</base-button>
        </div>
      </div>
    </base-dialogue>

    <base-dialogue :isOpen="isAboutOpen" @close="isAboutOpen = false">
      <div class="info-dialogue">
        <h3 class="text-heading">About</h3>
        <p class="text-body text-muted">
          MarketHub is a marketplace platform where you can browse products, follow stores, and
          manage your shopping experience in one place.
        </p>
        <div class="info-dialogue__actions">
          <base-button class="button button-primary" @click="isAboutOpen = false"
            >Close</base-button
          >
        </div>
      </div>
    </base-dialogue>

    <base-dialogue :isOpen="isDeleteDialogueOpen" @close="closeDeleteDialogue">
      <div class="delete-dialogue">
        <h3 class="text-heading delete-dialogue__title">Delete account</h3>
        <p class="text-body text-muted">
          Do you want to delete
          <span>{{ name || 'this account' }}</span
          >?
        </p>
        <div class="delete-dialogue__actions">
          <base-button class="button button-secondary" @click="closeDeleteDialogue">No</base-button>
          <base-button class="button button-danger" @click="confirmDelete">Yes</base-button>
        </div>
      </div>
    </base-dialogue>
  </section>
</template>

<script>
export default {
  name: 'UserAccountOptions',
  data() {
    return {
      isHelpOpen: false,
      isAboutOpen: false,
      isDeleteDialogueOpen: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/currentUser']
    },
    name() {
      if (!this.user) return ''
      return [this.user.firstName, this.user.lastName].filter(Boolean).join(' ')
    },
  },
  methods: {
    openHelp() {
      this.isHelpOpen = true
    },
    openAbout() {
      this.isAboutOpen = true
    },
    openDeleteDialogue() {
      this.isDeleteDialogueOpen = true
    },
    closeDeleteDialogue() {
      this.isDeleteDialogueOpen = false
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.replace('/login')
    },
    async confirmDelete() {
      this.closeDeleteDialogue()
      await this.$store.dispatch('user/deleteUser')
      await this.$store.dispatch('logout')
      this.$router.replace('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.account-options {
  width: 100%;
  padding: 1.25rem 1.35rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  &__eyebrow {
    margin: 0;
    color: #64748b;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--primary);

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  &__group {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    border-radius: 0.85rem;
    background: #f8fafc;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    width: 100%;
    padding: 0.95rem 1rem;
    border: none;
    border-bottom: 1px solid #e2e8f0;
    background: transparent;
    color: #0f172a;
    font-weight: 600;
    text-align: left;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: #fff;
    }

    &--danger {
      color: #dc2626;

      i {
        color: #dc2626;
      }

      &:hover {
        background: #fef2f2;
      }
    }
  }

  &__item-main {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;

    i {
      width: 1rem;
      color: #64748b;
      text-align: center;
    }
  }

  &__chevron {
    color: #94a3b8;
    font-size: 0.75rem;
  }
}

.info-dialogue,
.delete-dialogue {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;

  h3,
  p {
    margin: 0;
  }
}

.info-dialogue__actions,
.delete-dialogue__actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.delete-dialogue {
  &__title {
    color: var(--error);
  }

  span {
    font-weight: 700;
    color: #0f172a;
    word-break: break-word;
  }
}
</style>
