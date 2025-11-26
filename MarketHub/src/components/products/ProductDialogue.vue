<template>
  <base-dialogue :isOpen="isOpen" @close="closeDialogue">
    <div class="dialogue-body">
      <div class="product-image-container">
        <img :src="product?.image" :alt="product?.name" class="product-image" />
      </div>
      <div class="product-details">
        <h2 class="product-name">{{ product?.name }}</h2>
        <div class="product-price">$ {{ product?.price }}</div>
        <div class="product-actions">
          <base-button class="button button-secondary"> Add to Cart </base-button>
          <base-button class="button button-primary"> Buy Now </base-button>
        </div>
      </div>
    </div>
  </base-dialogue>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue'

export default {
  components: {
    BaseButton,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: null,
    },
  },
  emits: ['close', 'add-to-cart', 'buy-now'],
  methods: {
    closeDialogue() {
      this.$emit('close')
    },
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dialogue-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-md);
}

.dialogue-content {
  background-color: #fff;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 2rem;
  color: #64748b;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    color: red;
  }
}

.dialogue-body {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.product-image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: var(--radius-md);
  background-color: #f8fafc;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.product-name {
  font-family: var(--font-secondary);
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  text-align: left;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  text-align: left;
}

.product-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .dialogue-content {
    max-width: 95%;
  }

  .dialogue-body {
    padding: var(--spacing-lg);
  }

  .product-image-container {
    height: 250px;
  }

  .product-name {
    font-size: 1.5rem;
  }

  .product-actions {
    flex-direction: column;
  }
}
</style>
