<template>
  <base-form @submit.prevent="submitForm">
    <div class="form-group">
      <label class="text-label" for="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        required
        v-model="firstname"
        :class="{ error: fieldError('firstname') }"
        @blur="touchField('firstname')"
      />
      <p v-if="fieldError('firstname')" class="form-error">{{ fieldError('firstname') }}</p>
    </div>
    <div class="form-group">
      <label class="text-label" for="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        required
        v-model="lastname"
        :class="{ error: fieldError('lastname') }"
        @blur="touchField('lastname')"
      />
      <p v-if="fieldError('lastname')" class="form-error">{{ fieldError('lastname') }}</p>
    </div>

    <address-fields ref="addressFields" v-model="addressForm" />

    <div class="form-group">
      <label class="text-label" for="contact">Phone Number</label>
      <input
        type="number"
        id="contact"
        required
        v-model="contact"
        :class="{ error: fieldError('contact') }"
        @blur="touchField('contact')"
      />
      <p v-if="fieldError('contact')" class="form-error">{{ fieldError('contact') }}</p>
    </div>

    <div class="form-group form-group--button">
      <base-button class="button button-primary" type="submit">Save</base-button>
    </div>
  </base-form>
</template>

<script>
import BaseForm from '@/components/ui/BaseForm.vue'
import AddressFields from '@/components/users/AddressFields.vue'
import { createEmptyAddressForm, formatAddress } from '@/services/phAddress'

export default {
  components: {
    BaseForm,
    AddressFields,
  },
  emits: ['submit'],
  data() {
    return {
      selectedImage: null,
      firstname: '',
      lastname: '',
      addressForm: createEmptyAddressForm(),
      contact: '',
      showErrors: false,
      touched: {
        firstname: false,
        lastname: false,
        contact: false,
      },
    }
  },
  computed: {
    errors() {
      return {
        firstname: this.firstname.trim() ? '' : 'First name is required',
        lastname: this.lastname.trim() ? '' : 'Last name is required',
        contact: this.contact ? '' : 'Phone number is required',
      }
    },
  },
  methods: {
    fieldError(field) {
      if (!this.showErrors && !this.touched[field]) return ''
      return this.errors[field]
    },
    touchField(field) {
      this.touched[field] = true
    },
    submitForm() {
      this.showErrors = true
      Object.keys(this.touched).forEach((field) => {
        this.touched[field] = true
      })

      const addressValid = this.$refs.addressFields?.validate()
      const userValid = Object.values(this.errors).every((error) => !error)

      if (!userValid || !addressValid) return

      this.$emit('submit', {
        firstName: this.firstname,
        lastName: this.lastname,
        address: formatAddress(this.addressForm),
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
    width: 100%;

    &:focus {
      outline: none;
      border-color: var(--primary, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &.error {
      border-color: var(--error, #ef4444);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  &--button {
    align-items: flex-end;
    margin-top: 0.5rem;

    label {
      display: none;
    }
  }
}

.form-error {
  margin: 0;
  color: var(--error, #ef4444);
  font-size: 0.875rem;
}

.button {
  width: 30%;
}
</style>
