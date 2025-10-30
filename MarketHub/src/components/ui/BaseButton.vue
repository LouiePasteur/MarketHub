<template>
  <button :class="classes" v-if="!isLink">
    <slot></slot>
  </button>
  <router-link :class="classes" :to="endpoint" v-else>
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      required: false,
      default: null,
    },
    isLink: {
      type: Boolean,
      required: false,
      default: false,
    },
    endpoint: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.button-primary {
  background-color: #fff;
  color: var(--primary);
  border: 2px solid var(--primary);
  box-shadow: none;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-family: var(--font-secondary);
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  transform-origin: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: var(--spacing-sm);
  }

  &:hover {
    background-color: var(--primary-light);
    color: #fff;
    transform: scale(1.1);
    text-decoration: none;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.3);
  }
}

.cart-icon {
  margin-right: 8px;
  font-size: 1.2em;
  vertical-align: middle;
}
</style>
