<template>
  <base-form @submit.prevent="submitForm">
    <base-card>
      <h1 class="text-title text-primary">{{ isEditMode ? 'Edit Product' : 'Add Product' }}</h1>
      <div class="form-group">
        <label class="text-label" for="name">Product Name</label>
        <input type="text" id="name" required v-model="productName" />
      </div>
      <div class="form-group">
        <label class="text-label" for="image">Product Image</label>
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
            <div class="image-upload-square">
              <label :for="`image-${slotIndex}`" class="image-upload-hitarea">
                <img
                  v-if="selectedImages[slotIndex]"
                  :src="selectedImages[slotIndex].preview"
                  :alt="`Selected Product Image ${slotIndex + 1}`"
                  required
                />
                <span v-if="selectedImages[slotIndex]" class="image-upload-overlay">Change</span>
                <span v-else class="image-upload-placeholder">+ Upload Image</span>
              </label>
              <button
                v-if="selectedImages[slotIndex]"
                type="button"
                class="image-upload-delete"
                aria-label="Remove image"
                @click.stop.prevent="removeImage(slotIndex)"
              >
                ×
              </button>
            </div>
          </div>
        </div>
        <small class="input-help text-caption text-muted">
          {{ selectedImages.length }}/{{ maxUploads }} images uploaded (you can select multiple at
          once)
        </small>
      </div>
      <div class="form-group">
        <label class="text-label" for="address">Category</label>
        <select id="category" name="category" v-model="category" required>
          <option disabled value="">Select a category</option>
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label class="text-label" for="description">Description</label>
        <textarea id="description" required v-model="description"></textarea>
      </div>
      <div class="form-group">
        <label class="text-label" for="stocks">Stocks</label>
        <input type="number" id="stocks" required v-model="stocks" />
      </div>
      <div class="form-group">
        <label class="text-label" for="price">Price</label>
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
        <base-button class="button button-primary" :disabled="validInputs" type="submit">
          {{ isEditMode ? 'Update Product' : 'Add Product' }}
        </base-button>
      </div>
    </base-card>
  </base-form>
</template>

<script>
import BaseForm from '@/components/ui/BaseForm.vue'

function mapProductImages(productImage) {
  if (!productImage) {
    return []
  }
  const images = Array.isArray(productImage) ? productImage : [productImage]
  return images
    .filter((image) => typeof image === 'string' && image.length > 0)
    .map((image) => ({
      file: null,
      preview: image,
    }))
}

export default {
  components: {
    BaseForm,
  },
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  emits: ['submit', 'image-selected'],
  data() {
    return {
      selectedImages: mapProductImages(this.product?.productImage),
      maxUploads: 4,
      productName: this.product?.productName || this.product?.name || '',
      category: this.product?.productCategory || '',
      description: this.product?.productDescription || '',
      stocks: this.product?.stocks ?? '',
      price: this.product?.price ?? '',
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
  watch: {
    product: {
      handler(newProduct) {
        if (!newProduct) return
        this.productName = newProduct.productName || newProduct.name || ''
        this.category = newProduct.productCategory || ''
        this.description = newProduct.productDescription || ''
        this.stocks = newProduct.stocks ?? ''
        this.price = newProduct.price ?? ''
        this.selectedImages.forEach((image) => {
          if (image?.preview?.startsWith('blob:')) {
            URL.revokeObjectURL(image.preview)
          }
        })
        this.selectedImages = mapProductImages(newProduct.productImage)
      },
    },
  },
  computed: {
    isEditMode() {
      return !!this.product?.id
    },
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
        ...this.product,
        id: this.product?.id,
        productName: this.productName,
        productImage: this.selectedImages,
        productCategory: this.category,
        productDescription: this.description,
        stocks: this.stocks,
        price: this.price,
        sold: this.product?.sold ?? 0,
        storeId: this.product?.storeId || '',
        productRating: this.product?.productRating ?? 0,
      })
    },
    removeImage(slotIndex) {
      const existing = this.selectedImages[slotIndex]
      if (existing?.preview?.startsWith('blob:')) {
        URL.revokeObjectURL(existing.preview)
      }
      this.selectedImages.splice(slotIndex, 1)
      this.$emit(
        'image-selected',
        this.selectedImages.map((image) => image.file).filter(Boolean),
      )
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
    this.selectedImages.forEach((image) => {
      if (image?.preview?.startsWith('blob:')) {
        URL.revokeObjectURL(image.preview)
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 1rem;

  label {
    min-width: 120px;
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
    background: #f8fafc;
    overflow: hidden;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      border-color: var(--primary, #3b82f6);
      background-color: #eff6ff;
    }
  }

  .image-upload-hitarea {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    margin: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .image-upload-delete {
    position: absolute;
    top: 0.25rem;
    right: 0.35rem;
    z-index: 3;
    width: 1.5rem !important;
    height: 1.5rem;
    min-width: 1.5rem;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: auto;
    border: none;
    border-radius: 0;
    background: transparent;
    color: #ef4444;
    font-size: var(--icon-lg, 1.25rem);
    line-height: 1;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #b91c1c;
      background: transparent;
    }
  }

  .image-upload-overlay {
    position: absolute;
    inset: auto 0 0 0;
    background: rgba(15, 23, 42, 0.65);
    color: #fff;
    font-size: var(--text-body-sm);
    text-align: center;
    padding: 0.35rem 0.25rem;
  }

  .image-upload-placeholder {
    font-size: var(--text-body-sm);
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
