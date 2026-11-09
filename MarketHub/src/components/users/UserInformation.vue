<template>
  <section class="user-profile">
    <h3 class="button button-secondary button--back" @click="goBack">
      <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
      Back to Products List
    </h3>
    <div class="user-profile__header">
      <p class="user-profile__eyebrow">Profile</p>
      <h1>User Information</h1>
    </div>

    <div v-if="user" class="user-profile__body">
      <div class="user-profile__picture">
        <img :src="picture" alt="User Picture" />
      </div>
      <div class="user-profile__information">
        <div class="user-profile__title">
          <h2>{{ name || 'Unnamed user' }}</h2>
          <div class="user-profile__edit" data-tooltip="Edit Profile">
            <i class="fa-solid fa-pen" aria-hidden="true" @click="goToEdit"></i>
          </div>
        </div>
        <div class="user-profile__meta">
          <div class="user-profile__meta-item">
            <i class="fa-solid fa-envelope" aria-hidden="true"></i>
            <p>{{ user.email }}</p>
          </div>
          <div class="user-profile__meta-item">
            <i class="fa-solid fa-phone" aria-hidden="true"></i>
            <p>{{ user.phone || 'No phone number' }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="user-profile__empty">
      <p>No user information available.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserInformation',
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
  methods: {
    goToEdit() {
      if (!this.user?.id) return
      this.$router.push(`/user/${this.user.id}/edit`)
    },
    goBack() {
      this.$router.push('/products')
    },
  },
}
</script>

<style lang="scss" scoped>
.button--back {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 0.5rem;
  margin: 0;
  cursor: pointer;
  color: var(--primary);
  width: auto;

  &:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }
}

.user-profile {
  width: 100%;
  padding: 1.25rem 1.35rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
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

  &__body {
    display: flex;
    align-items: center;
    gap: 1.25rem;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  &__picture {
    width: 96px;
    height: 96px;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #f1f5f9;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 768px) {
      width: 88px;
      height: 88px;
    }
  }

  &__information {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
    flex: 1;

    @media (max-width: 768px) {
      align-items: center;
      width: 100%;
    }
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    width: 100%;

    h2 {
      margin: 0;
      font-size: 1.35rem;
      color: #0f172a;
      word-break: break-word;
    }

    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  &__edit {
    position: relative;
    cursor: pointer;
    color: var(--secondary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--radius-md);
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    flex-shrink: 0;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      background-color: #eef2f7;
      color: var(--primary);
    }

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      left: 50%;
      bottom: 125%;
      transform: translateX(-50%);
      background: #0f172a;
      color: #fff;
      padding: 4px 8px;
      font-size: var(--text-caption);
      border-radius: 4px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s ease;
    }

    &:hover::after {
      opacity: 1;
    }
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  &__meta-item {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.7rem 0.85rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    max-width: 100%;

    i {
      color: #64748b;
      width: 1rem;
      text-align: center;
      flex-shrink: 0;
    }

    p {
      margin: 0;
      color: #334155;
      word-break: break-word;
      overflow-wrap: anywhere;
    }

    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  &__empty {
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.75rem;
    color: #64748b;
    text-align: center;

    p {
      margin: 0;
    }
  }
}
</style>
