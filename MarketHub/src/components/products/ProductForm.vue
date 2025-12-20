<template>
  <base-form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="name">Product Name</label>
      <input type="text" id="name" required v-model="storename" />
    </div>
    <div class="form-group">
      <label for="image">Image</label>
      <input type="file" id="image" accept="image/*" @change="handleImageChange" />
    </div>
    <div class="form-group">
      <label for="address">Category</label>
      <select id="category" name="category" v-model="category">
        <option v-for="category in categories" :key="category.id" :value="category.name">
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" required v-model="description"></textarea>
    </div>
    <div class="form-group">
      <label for="stocks">Stocks</label>
      <input type="number" id="stocks" required v-model="stocks" />
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input type="number" id="price" required v-model="price" />
    </div>
    <div class="form-group form-group--button">
      <base-button class="button button-primary" type="submit">Add Product</base-button>
    </div>
  </base-form>
</template>

<script>
export default {
  emits: ['submit', 'image-selected'],
  data() {
    return {
      selectedImage: null,
      category: 'Fashion',
      categories: [
        {
          id: 1,
          name: 'Fashion',
        },
        {
          id: 2,
          name: 'Electronics & Gadgets',
        },
        {
          id: 3,
          name: 'Health & Beauty',
        },
        {
          id: 4,
          name: 'Food & Groceries',
        },
      ],
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

    select {
      width: 100%;
    }

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
