<template>
  <div :class="variant === 'inline' ? 'review-inline-edit' : 'review-input'">
    <button
      v-if="variant === 'standalone' && isEditing"
      type="button"
      class="cancel-edit-button"
      @click="handleCancel"
    >
      Cancel
    </button>
    <div v-if="variant === 'standalone'" class="review-input-main">
      <div class="review-rating-input" @mouseleave="hoverRating = null">
        <span
          v-for="star in 5"
          :key="star"
          class="star star--interactive"
          :class="{ filled: star <= displayRating }"
          role="button"
          tabindex="0"
          :aria-label="`Rate ${star} out of 5`"
          @mouseenter="hoverRating = star"
          @click="setRating(star)"
          @keydown.enter.prevent="setRating(star)"
        >
          ★
        </span>
      </div>
      <textarea v-model="reviewInfo.reviewContent" placeholder="Write a review"></textarea>
      <div class="review-images" v-if="page != 'store'">
        <div class="image-upload-grid">
          <div v-for="slotIndex in visibleUploadSlots" :key="slotIndex" class="image-upload-slot">
            <input
              type="file"
              :id="`review-image-${slotIndex}`"
              class="visually-hidden-file-input"
              accept="image/*"
              multiple
              @change="handleImageChange($event, slotIndex)"
            />
            <label :for="`review-image-${slotIndex}`" class="image-upload-square">
              <img
                v-if="reviewImages[slotIndex]"
                :src="reviewImages[slotIndex].preview"
                :alt="`Review image ${slotIndex + 1}`"
              />
              <span v-if="reviewImages[slotIndex]" class="image-upload-overlay">Change</span>
              <span v-else class="image-upload-placeholder">
                <i class="fa-solid fa-image"></i>
              </span>
            </label>
            <button
              v-if="reviewImages[slotIndex]"
              type="button"
              class="image-remove-button"
              title="Remove image"
              @click="removeImage(slotIndex)"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <small class="input-help">
          {{ reviewImages.length }}/{{ maxImages }} images (optional)
        </small>
      </div>
    </div>
    <template v-else>
      <div class="review-rating-input" @mouseleave="hoverRating = null">
        <span
          v-for="star in 5"
          :key="`edit-${star}`"
          class="star star--interactive"
          :class="{ filled: star <= displayRating }"
          role="button"
          tabindex="0"
          :aria-label="`Rate ${star} out of 5`"
          @mouseenter="hoverRating = star"
          @click="setRating(star)"
          @keydown.enter.prevent="setRating(star)"
        >
          ★
        </span>
      </div>
      <textarea
        v-model="reviewInfo.reviewContent"
        class="review-inline-textarea"
        placeholder="Edit your review"
      ></textarea>
      <div class="review-inline-actions">
        <button type="button" class="cancel-edit-button" @click="handleCancel">Cancel</button>
        <button type="button" class="add-review-button" @click="submitReview">Update Review</button>
      </div>
    </template>
    <button
      v-if="variant === 'standalone'"
      type="button"
      class="add-review-button"
      @click="submitReview"
    >
      {{ isEditing ? 'Update Review' : 'Add Review' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    editingReview: {
      type: Object,
      default: null,
    },
    variant: {
      type: String,
      default: 'standalone',
      validator: (value) => ['standalone', 'inline'].includes(value),
    },
  },
  emits: ['submit', 'cancel'],
  data() {
    const user = this.$store.getters['user/currentUser']
    return {
      hoverRating: null,
      maxImages: 4,
      reviewImages: [],
      reviewInfo: {
        reviewContent: '',
        reviewRating: 1,
        reviewDate: new Date().toISOString(),
        reviewerId: user?.id ?? user?.userId ?? this.$store.getters.userId ?? null,
        reviewerEmail: user?.email ?? '',
        reviewerName: user ? `${user.firstName} ${user.lastName}` : '',
      },
    }
  },
  computed: {
    displayRating() {
      return this.hoverRating ?? this.reviewInfo.reviewRating
    },
    visibleUploadSlots() {
      const totalSlots = Math.min(this.reviewImages.length + 1, this.maxImages)
      return Array.from({ length: totalSlots }, (_, index) => index)
    },
  },
  watch: {
    isEditing(value) {
      if (value && this.editingReview) {
        this.populateFormFromReview(this.editingReview)
      } else if (!value) {
        this.resetForm()
      }
    },
    editingReview: {
      immediate: true,
      handler(review) {
        if (this.isEditing && review) {
          this.populateFormFromReview(review)
        }
      },
    },
  },
  methods: {
    setRating(star) {
      this.reviewInfo.reviewRating = Math.max(1, star)
      this.hoverRating = null
    },
    submitReview() {
      if (!this.reviewInfo.reviewContent.trim()) {
        return
      }

      this.$emit('submit', {
        ...this.reviewInfo,
        reviewImages: this.reviewImages.map((image) => image.file).filter(Boolean),
        existingImages: this.reviewImages
          .filter((image) => image.isExisting)
          .map((image) => image.preview),
      })
      this.resetForm()
    },
    clearReviewImages() {
      this.reviewImages.forEach((image) => {
        if (image.preview && !image.isExisting) {
          URL.revokeObjectURL(image.preview)
        }
      })
      this.reviewImages = []
    },
    resetForm() {
      this.reviewInfo.reviewContent = ''
      this.reviewInfo.reviewRating = 1
      this.hoverRating = null
      this.clearReviewImages()
    },
    populateFormFromReview(review) {
      this.reviewInfo.reviewContent = review.reviewContent
      this.reviewInfo.reviewRating = Math.max(1, review.reviewRating || 1)
      this.clearReviewImages()
      ;(review.images ?? []).forEach((url) => {
        if (url) {
          this.reviewImages.push({
            file: null,
            preview: url,
            isExisting: true,
          })
        }
      })
    },
    handleCancel() {
      this.resetForm()
      this.$emit('cancel')
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

      const availableSlots = this.maxImages - this.reviewImages.length
      const filesToUse = acceptedFiles.slice(0, availableSlots || 1)

      if (acceptedFiles.length > filesToUse.length) {
        alert(`Only ${this.maxImages} images are allowed.`)
      }

      if (slotIndex < this.reviewImages.length) {
        const existing = this.reviewImages[slotIndex]
        if (existing?.preview && !existing.isExisting) {
          URL.revokeObjectURL(existing.preview)
        }

        const replacementFile = filesToUse[0]
        this.reviewImages.splice(slotIndex, 1, {
          file: replacementFile,
          preview: URL.createObjectURL(replacementFile),
        })

        const remainingFiles = filesToUse.slice(1)
        for (const file of remainingFiles) {
          if (this.reviewImages.length >= this.maxImages) break
          this.reviewImages.push({
            file,
            preview: URL.createObjectURL(file),
          })
        }
      } else {
        for (const file of filesToUse) {
          if (this.reviewImages.length >= this.maxImages) break
          this.reviewImages.push({
            file,
            preview: URL.createObjectURL(file),
          })
        }
      }

      event.target.value = ''
    },
    removeImage(slotIndex) {
      const existing = this.reviewImages[slotIndex]
      if (existing?.preview && !existing.isExisting) {
        URL.revokeObjectURL(existing.preview)
      }
      this.reviewImages.splice(slotIndex, 1)
    },
  },
  beforeUnmount() {
    this.clearReviewImages()
  },
}
</script>

<style lang="scss" scoped>
.review-input {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.cancel-edit-button {
  flex-shrink: 0;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  background-color: #fff;
  color: #64748b;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #f8fafc;
    color: #0f172a;
  }
}

.review-input-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.review-rating-input {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.review-input textarea {
  width: 100%;
  height: 100px;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 0.5rem;
  resize: none;
  font-size: 1rem;
  font-weight: 500;
  color: #0f172a;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
}

.add-review-button {
  flex-shrink: 0;
  width: 100px;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  background-color: var(--primary);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-dark);
  }
}

.star {
  font-size: 1.25rem;
  color: #cbd5e1;
  line-height: 1;
}

.star.filled {
  color: #f59e0b;
}

.star--interactive {
  cursor: pointer;
  transition: color 0.15s ease;
}

.review-images {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
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

.image-upload-grid {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.image-upload-slot {
  position: relative;
}

.image-upload-square {
  position: relative;
  width: 72px;
  height: 72px;
  border: 2px dashed #cbd5e1;
  border-radius: var(--radius-md);
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
    border-color: var(--primary);
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
  font-size: 0.65rem;
  text-align: center;
  padding: 0.2rem;
}

.image-upload-placeholder {
  font-size: 1.1rem;
  color: #94a3b8;
}

.image-remove-button {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: #ef4444;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 0.65rem;
  line-height: 1;

  &:hover {
    background: #b91c1c;
  }
}

.input-help {
  font-size: 0.75rem;
  color: #64748b;
}

.review-inline-edit {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.review-inline-textarea {
  width: 100%;
  min-height: 80px;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 0.5rem;
  resize: vertical;
  font-size: 0.8rem;
  font-weight: 500;
  color: #0f172a;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
}

.review-inline-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  .add-review-button {
    width: auto;
    min-width: 100px;
  }
}

@media (max-width: 1024px) {
  .review-input {
    flex-direction: column;
    align-items: stretch;
  }

  .add-review-button {
    width: 100%;
  }
}
</style>
