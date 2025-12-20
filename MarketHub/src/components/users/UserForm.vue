<template>
  <base-form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="name">First Name</label>
      <input type="text" id="name" required v-model="firstname" />
    </div>
    <div class="form-group">
      <label for="name">Last Name</label>
      <input type="text" id="name" required v-model="lastname" />
    </div>
    <div class="form-group">
      <label for="image">Profile Image</label>
      <input type="file" id="image" accept="image/*" @change="handleImageChange" />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" required v-model="email" />
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
      <base-button class="button button-primary" type="submit">Create Account</base-button>
    </div>
  </base-form>
</template>

<script>
export default {
  emits: ['submit', 'image-selected'],
  data() {
    return {
      selectedImage: null,
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit')
    },
    handleImageChange(event) {
      const file = event.target.files[0]

      if (!file) {
        return
      }

      // Validate file type
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!validImageTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)')
        event.target.value = ''
        this.selectedImage = null
        return
      }

      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        alert('Image size should be less than 5MB')
        event.target.value = ''
        this.selectedImage = null
        return
      }

      this.$emit('image-selected', file)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: row;

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
