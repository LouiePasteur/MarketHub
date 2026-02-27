<template>
  <base-form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="firstname">First Name</label>
      <input type="text" id="firstname" required v-model="firstname" />
    </div>
    <div class="form-group">
      <label for="lastname">Last Name</label>
      <input type="text" id="lastname" required v-model="lastname" />
    </div>
    <div class="form-group">
      <label for="address">Address</label>
      <input type="text" id="address" required v-model="address" />
    </div>
    <div class="form-group">
      <label for="contact">Phone Number</label>
      <input type="number" id="contact" required v-model="contact" />
    </div>

    <div class="form-group form-group--button">
      <base-button class="button button-primary" type="submit">Save</base-button>
    </div>
  </base-form>
</template>

<script>
import BaseForm from '@/components/ui/BaseForm.vue'

export default {
  components: {
    BaseForm,
  },
  emits: ['submit', 'image-selected'],
  data() {
    return {
      selectedImage: null,
      firstname: '',
      lastname: '',
      address: '',
      contact: '',
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', {
        firstName: this.firstname,
        lastName: this.lastname,
        address: this.address,
        phone: this.contact,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 0.5rem;

  label {
    text-align: right;
    font-weight: 500;
    flex-shrink: 0;

    &:has(+ input[required]),
    &:has(+ textarea[required]) {
      &::after {
        content: ' *';
        color: #ef4444;
        font-weight: bold;
      }
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;

    button {
      width: 100%;
      align-self: center;
    }
  }

  input,
  textarea {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--border, #e2e8f0);
    border-radius: var(--radius-md, 0.375rem);
    font-size: 1rem;
    width: 100%;

    &:focus {
      outline: none;
      border-color: var(--primary, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  // For the button group, center it
  &--button {
    align-items: flex-end;
    margin-top: 0.5rem;

    label {
      display: none;
    }
  }
}

.button {
  width: 30%;
}
</style>
