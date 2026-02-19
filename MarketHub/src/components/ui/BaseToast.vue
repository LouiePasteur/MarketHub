<template>
  <transition name="toast-fade">
    <div
      v-if="visible"
      class="toast"
      :class="[`toast--${type}`]"
      role="status"
      aria-live="polite"
    >
      <span class="toast__message">{{ message }}</span>
      <button class="toast__close" type="button" @click="$emit('close')">
        ✕
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseToast',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info', // info | success | error
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
}
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  max-width: 320px;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
  color: #0f172a;
  background-color: #e5e7eb;
  z-index: 50;
}

.toast--success {
  background-color: #dcfce7;
  color: #166534;
}

.toast--error {
  background-color: #fee2e2;
  color: #b91c1c;
}

.toast--info {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.toast__message {
  flex: 1;
  text-align: left;
}

.toast__close {
  border: none;
  background: transparent;
  cursor: pointer;
  color: inherit;
  font-size: 1rem;
  padding: 0;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.2s ease-out;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
















