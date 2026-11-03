<template>
  <div class="profile-menu" :class="{ 'profile-menu--up': dropup }" ref="root">
    <div
      class="profile-menu__trigger"
      :class="{ 'is-open': open }"
      role="button"
      tabindex="0"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="toggle"
    >
      <slot />
    </div>

    <div v-if="open" class="profile-menu__panel" role="menu">
      <router-link
        v-if="accountSettingsPath"
        :to="accountSettingsPath"
        class="profile-menu__item"
        role="menuitem"
        @click="open = false"
      >
        <i class="fa-solid fa-gear" aria-hidden="true"></i>
        Account settings
      </router-link>
      <button v-else type="button" class="profile-menu__item" role="menuitem" disabled>
        <i class="fa-solid fa-gear" aria-hidden="true"></i>
        Account settings
      </button>

      <div class="profile-menu__divider"></div>

      <button
        type="button"
        class="profile-menu__item profile-menu__item--danger"
        role="menuitem"
        @click="logout"
      >
        <i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dropup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    accountSettingsPath() {
      const user = this.$store.getters['user/currentUser']
      return user?.id ? `/user/${user.id}/edit` : null
    },
  },
  watch: {
    '$route.fullPath'() {
      this.open = false
    },
  },
  mounted() {
    document.addEventListener('click', this.onDocumentClick)
    document.addEventListener('keydown', this.onKeydown)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onDocumentClick)
    document.removeEventListener('keydown', this.onKeydown)
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    onDocumentClick(event) {
      if (this.$refs.root && !this.$refs.root.contains(event.target)) {
        this.open = false
      }
    },
    onKeydown(event) {
      if (event.key === 'Escape') {
        this.open = false
      }
    },
    async logout() {
      this.open = false
      await this.$store.dispatch('logout')
      this.$router.replace('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-menu {
  position: relative;
}

.profile-menu__trigger {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  border-radius: var(--radius-md);
  padding: 0.2rem 0.35rem;

  &.is-open {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.profile-menu--up .profile-menu__trigger.is-open {
  background-color: rgba(15, 23, 42, 0.06);
}

.profile-menu__panel {
  position: absolute;
  top: calc(100% + 0.55rem);
  right: 0;
  z-index: 40;
  min-width: 12.5rem;
  padding: 0.35rem;
  background: #fff;
  color: #0f172a;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  text-align: left;
}

.profile-menu--up .profile-menu__panel {
  top: auto;
  bottom: calc(100% + 0.55rem);
}

.profile-menu__divider {
  height: 1px;
  margin: 0.2rem 0.35rem;
  background: #e2e8f0;
}

.profile-menu__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  color: #0f172a;
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  text-align: left;

  i {
    width: 1rem;
    color: #64748b;
    font-size: var(--icon-md);
    text-align: center;
  }

  &:hover:not(:disabled) {
    background: #f1f5f9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
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
</style>
