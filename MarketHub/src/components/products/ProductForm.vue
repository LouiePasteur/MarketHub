<template>
  <base-form @submit.prevent="submitForm">
    <base-card>
      <h1>Add Product</h1>
      <div class="form-group">
        <label for="name">Product Name</label>
        <input type="text" id="name" required v-model="productName" />
      </div>
      <div class="form-group">
        <label for="image">Product Image</label>
        <div class="image-upload-grid">
          <div class="image-upload-slot" v-for="slotIndex in visibleUploadSlots" :key="slotIndex">
            <input
              type="file"
              :id="`image-${slotIndex}`"
              class="visually-hidden-file-input"
              accept="image/*"
              multiple
              @change="handleImageChange($event, slotIndex)"
            />
            <label :for="`image-${slotIndex}`" class="image-upload-square">
              <img
                v-if="selectedImages[slotIndex]"
                :src="selectedImages[slotIndex].preview"
                :alt="`Selected Product Image ${slotIndex + 1}`"
                required
              />
              <span v-if="selectedImages[slotIndex]" class="image-upload-overlay">Change</span>
              <span v-else class="image-upload-placeholder">+ Upload Image</span>
            </label>
          </div>
        </div>
        <small class="input-help">
          {{ selectedImages.length }}/{{ maxUploads }} images uploaded (you can select multiple at
          once)
        </small>
      </div>
      <div class="form-group">
        <label for="address">Category</label>
        <select id="category" name="category" v-model="category" required>
          <option disabled value="">Select a category</option>
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
        <div class="currency-input-wrapper">
          <span class="currency-prefix" aria-hidden="true">$</span>
          <input
            type="number"
            id="price"
            required
            v-model="price"
            min="0"
            max="10000"
            placeholder="0.00"
            inputmode="decimal"
          />
        </div>
      </div>
      <div class="form-group form-group--button">
        <base-button class="button button-primary" :disabled="validInputs" type="submit"
          >Add Product</base-button
        >
      </div>
    </base-card>
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
      selectedImages: [],
      maxUploads: 4,
      category: '',
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
          name: 'Tpy',
        },
        {
          id: 5,
          name: 'Food & Groceries',
        },
      ],
    }
  },
  computed: {
    visibleUploadSlots() {
      const totalSlots = Math.min(this.selectedImages.length + 1, this.maxUploads)
      return Array.from({ length: totalSlots }, (_, index) => index)
    },
    validInputs() {
      return (
        !this.productName ||
        !this.selectedImages.length ||
        !this.category ||
        !this.description ||
        !this.stocks ||
        !this.price
      )
    },
  },
  methods: {
    submitForm() {
      this.$emit('submit', {
        productName: this.productName,
        productImage: this.selectedImages,
        productCategory: this.category,
        productDescription: this.description,
        stocks: this.stocks,
        price: this.price,
        sold: 0,
        storeId: this.storeId,
        productRating: 0,
      })
    },
    handleImageChange(event, slotIndex) {
      const files = Array.from(event.target.files || [])
      if (!files.length) {
        return
      }

      const acceptedFiles = []
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      const maxSize = 5 * 1024 * 1024

      for (const file of files) {
        if (!validImageTypes.includes(file.type)) {
          alert(`"${file.name}" is not a valid image file (JPEG, PNG, GIF, or WebP)`)
          continue
        }

        if (file.size > maxSize) {
          alert(`"${file.name}" is larger than 5MB`)
          continue
        }

        acceptedFiles.push(file)
      }

      if (!acceptedFiles.length) {
        event.target.value = ''
        return
      }

      const currentCount = this.selectedImages.length
      const availableSlots = this.maxUploads - Math.min(currentCount, this.maxUploads)
      const filesToUse = acceptedFiles.slice(0, availableSlots || 1)

      if (acceptedFiles.length > filesToUse.length) {
        alert(`Only ${this.maxUploads} images are allowed.`)
      }

      if (slotIndex < this.selectedImages.length) {
        const existing = this.selectedImages[slotIndex]
        if (existing?.preview) {
          URL.revokeObjectURL(existing.preview)
        }

        const replacementFile = filesToUse[0]
        this.selectedImages.splice(slotIndex, 1, {
          file: replacementFile,
          preview: URL.createObjectURL(replacementFile),
        })

        const remainingFiles = filesToUse.slice(1)
        for (const file of remainingFiles) {
          if (this.selectedImages.length >= this.maxUploads) break
          this.selectedImages.push({
            file,
            preview: URL.createObjectURL(file),
          })
        }
      } else {
        for (const file of filesToUse) {
          if (this.selectedImages.length >= this.maxUploads) break
          this.selectedImages.push({
            file,
            preview: URL.createObjectURL(file),
          })
        }
      }

      this.$emit(
        'image-selected',
        this.selectedImages.map((image) => image.file),
      )
      event.target.value = ''
    },
  },
  beforeUnmount() {
    this.selectedImages.forEach((image) => URL.revokeObjectURL(image.preview))
  },
}
</script>

<style lang="scss" scoped>
h1 {
  @media (max-width: 1024px) {
    font-size: 1.8em;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 1rem;

  label {
    min-width: 120px;
    font-weight: 500;
    flex-shrink: 0;

    &:has(+ input[required]),
    &:has(+ textarea[required]),
    &:has(+ select[required]),
    &:has(+ .currency-input-wrapper input[required]) {
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

    select {
      width: 100%;
    }

    button {
      width: 80%;
      align-self: center;
    }
  }

  input,
  select,
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

  button[disabled] {
    background-color: #6b7280;
    cursor: not-allowed;
  }

  .visually-hidden-file-input {
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  select {
    background-color: #fff;
    cursor: pointer;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  .input-help {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #475569;
  }

  .currency-input-wrapper {
    position: relative;
    width: 100%;
  }

  .currency-prefix {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    color: #475569;
    font-weight: 500;
    pointer-events: none;
  }

  .currency-input-wrapper input {
    padding-left: 1.75rem;
  }

  .image-upload-grid {
    display: flex;
    gap: 0.75rem;
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;

    @media (max-width: 1024px) {
      display: flex;
      justify-content: center;
    }
  }

  .image-upload-slot {
    position: relative;
  }

  .image-upload-square {
    position: relative;
    width: 180px;
    height: 180px;
    border: 2px dashed #cbd5e1;
    border-radius: var(--radius-md, 0.375rem);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    cursor: pointer;
    overflow: hidden;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      border-color: var(--primary, #3b82f6);
      background-color: #eff6ff;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .image-upload-overlay {
    position: absolute;
    inset: auto 0 0 0;
    background: rgba(15, 23, 42, 0.65);
    color: #fff;
    font-size: 0.85rem;
    text-align: center;
    padding: 0.35rem 0.25rem;
  }

  .image-upload-placeholder {
    font-size: 0.95rem;
    color: #475569;
    text-align: center;
    padding: 0 0.5rem;
  }

  &--button {
    margin-top: 0.5rem;
    align-items: flex-end;

    @media (max-width: 1024px) {
      align-items: center;
      width: 100%;
    }

    label {
      display: none;
    }
  }
}
</style>
