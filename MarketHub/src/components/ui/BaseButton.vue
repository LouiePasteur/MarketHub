<template>
  <button :class="classes" v-if="!isLink" :disabled="disabled">
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
    disabled: {
      type: Boolean,
      default: false,
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

.button-google {
  position: relative;
  width: 100%;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: 4px;
  background-color: #ffffff;
  color: #3c4043;
  border: 1px solid #dadce0;
  font-weight: 500;
  font-size: 14px;
  box-shadow:
    0 1px 2px rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);

  &:hover {
    background-color: #f7f8f8;
  }
}

.button-facebook {
  width: 100%;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: 4px;
  background-color: #1877f2;
  color: #ffffff;
  border: 1px solid #1877f2;
  font-weight: 500;
  font-size: 14px;

  box-shadow: 0 1px 2px rgba(24, 119, 242, 0.4), 0 1px 3px 1px rgba(24, 119, 242, 0.3);

  &:hover {
    background-color: #166fe5;
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
    border: 2px solid #0fb9c6;
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
