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
  background-color: var(--primary);
  color: #fff;
  border: none;
  box-shadow: none;
  padding: var(--spacing-md);
  font-weight: 700;
  cursor: pointer;
  border-radius: var(--radius-md);

  &:hover {
    color: #fff;
    background-color: var(--primary-dark);
    transition: all 0.3s ease;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    padding: var(--spacing-sm);
  }
}

.button-secondary {
  background-color: #fff;
  color: var(--secondary);
  border: 2px solid var(--secondary);
  box-shadow: none;
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: var(--secondary);
    transition: all 0.3s ease;
    text-decoration: none;
  }
}

.button-transparent-lg {
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  box-shadow: none;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-family: var(--font-secondary);
  font-size: 1.25rem;
  font-weight: 700;
  transition: all 0.3s ease;
  transform-origin: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: var(--spacing-sm);
  }

  &:hover {
    border: 2px solid #0FB9C6;
    transform: scale(1.1);
    text-decoration: none;
    box-shadow: 0 0 10px 0 rgba(15, 185, 198, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.3);
  }
}

.button-primary-lg {
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
  cursor: pointer;
}
</style>
