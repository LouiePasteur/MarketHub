<template>
  <base-form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="name">Store Name</label>
      <input type="text" id="name" v-model="storename" />
    </div>
    <div class="form-group">
      <label for="address">Address</label>
      <input type="text" id="address" v-model="address" />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" v-model="description"></textarea>
    </div>
    <div class="form-group">
      <label for="contact">Contact Number</label>
      <input
        type="tel"
        id="contact"
        inputmode="numeric"
        maxlength="11"
        min-length="11"
        v-model="contact"
        @input="onContactInput"
      />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
    </div>
    <div class="form-group form-group--button">
      <base-button class="button button-primary" type="submit">Create Store</base-button>
    </div>
  </base-form>
</template>

<script>
import BaseForm from '@/components/ui/BaseForm.vue'
export default {
  emits: ['submit'],
  components: {
    BaseForm,
  },
  data() {
    return {
      selectedImage: null,
      storename: '',
      address: '',
      description: '',
      contact: '',
      email: '',
    }
  },
  computed: {
    validInputs() {
      return (
        !this.storename ||
        !this.address ||
        !this.description ||
        !this.contact ||
        this.contact.length !== 11 ||
        !this.email
      )
    },
  },
  methods: {
    onContactInput(event) {
      const digits = event.target.value.replace(/\D/g, '').slice(0, 11)
      this.contact = digits
    },
    submitForm() {
      if (this.validInputs) return
      this.$emit('submit', {
        storeName: this.storename,
        storeAddress: this.address,
        storeDescription: this.description,
        storeContact: this.contact,
        storeEmail: this.email,
        storeId: '',
        storeImage: null,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  display: flex;
  align-items: center;
  gap: 1rem;

  label {
    min-width: 120px;
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

    @media (max-width: 1024px) {
      text-align: left;
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    button {
      width: 80%;
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
    justify-content: flex-end;
    margin-top: 0.5rem;

    label {
      display: none;
    }
  }
}
</style>
