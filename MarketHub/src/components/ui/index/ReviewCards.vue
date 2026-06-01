<template>
  <div class="reviews-list">
    <div class="review-input">
      <div class="review-input-main">
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
      <button type="button" class="add-review-button" @click="addReview">Add Review</button>
    </div>

    <div v-if="reviews.length === 0" class="reviews-empty">
      <h3>No reviews yet</h3>
    </div>
    <div v-else>
      <div v-for="review in reviews" :key="review.id" class="review-container">
        <div class="basic-information">
          <div class="reviewer-header">
            <div class="reviewer-profile">
              <img :src="review.image" alt="Reviewer Profile" />
              <div class="reviewer-name">
                <h3>{{ review.name }}</h3>
              </div>
            </div>
            <button class="delete-button delete-button--mobile" type="button" title="Delete review">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
          <div class="rating-container">
            <div class="review-date">
              <p>{{ review.date }}</p>
            </div>
            <div class="rating-actions">
              <div class="review-rating">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{ filled: star <= review.rating }"
                >
                  ★
                </span>
                <span class="numeric-rating">{{ review.rating }}</span>
              </div>
              <button
                class="delete-button delete-button--desktop"
                type="button"
                title="Delete review"
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="review-content">
          <p>{{ review.content }}</p>
          <div v-if="review.images?.length" class="review-attached-images">
            <img
              v-for="(image, index) in review.images"
              :key="index"
              :src="image"
              :alt="`Review attachment ${index + 1}`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
  emits: ['add-review'],
  data() {
    return {
      hoverRating: null,
      maxImages: 4,
      reviewImages: [],
      reviewInfo: {
        reviewContent: '',
        reviewRating: 1,
        reviewDate: new Date().toISOString(),
        reviewerProfile: '',
        reviewerId: '',
        reviewerEmail: '',
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
  methods: {
    setRating(star) {
      this.reviewInfo.reviewRating = Math.max(1, star)
      this.hoverRating = null
    },
    addReview() {
      if (!this.reviewInfo.reviewContent.trim()) {
        return
      }

      this.$emit('add-review', {
        ...this.reviewInfo,
        reviewImages: this.reviewImages.map((image) => image.file),
      })
      this.resetForm()
    },
    resetForm() {
      this.reviewInfo.reviewContent = ''
      this.reviewInfo.reviewRating = 1
      this.hoverRating = null
      this.reviewImages.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview)
        }
      })
      this.reviewImages = []
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
        if (existing?.preview) {
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
      if (existing?.preview) {
        URL.revokeObjectURL(existing.preview)
      }
      this.reviewImages.splice(slotIndex, 1)
    },
  },
  beforeUnmount() {
    this.reviewImages.forEach((image) => {
      if (image.preview) {
        URL.revokeObjectURL(image.preview)
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reviews-empty h3 {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
}

.review-container {
  border-bottom: 1px solid #e2e8f0;
  padding: 0.75rem 0;
}

.basic-information {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.review-input {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 1rem;
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

.reviewer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reviewer-profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reviewer-profile img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.rating-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.rating-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.review-date {
  text-align: right;

  & p {
    font-size: 0.65rem;
  }

  @media (max-width: 1024px) {
    text-align: left;
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

.numeric-rating {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  margin-left: 0.25rem;
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

.review-attached-images {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;

  img {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: var(--radius-md);
    border: 1px solid #e2e8f0;
  }
}

.delete-button {
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background-color: #fee2e2;
    color: #b91c1c;
  }

  i {
    font-size: 0.9rem;
  }
}

.delete-button--mobile {
  display: none;
}

.delete-button--desktop {
  display: inline-flex;
}

.review-content p {
  font-size: 0.8rem;
  color: #0f172a;
}

@media (max-width: 1024px) {
  .review-input {
    flex-direction: column;
    align-items: stretch;
  }

  .add-review-button {
    width: 100%;
  }

  .basic-information {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .reviewer-header {
    width: 100%;
    justify-content: space-between;
  }

  .rating-container {
    align-items: flex-start;
  }

  .delete-button--desktop {
    display: none;
  }

  .delete-button--mobile {
    display: inline-flex;
  }
}
</style>
