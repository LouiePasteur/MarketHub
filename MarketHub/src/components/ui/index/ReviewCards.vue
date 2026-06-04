<template>
  <div class="reviews-list">
    <div class="review-input" v-if="showReviewInput">
      <button v-if="isEditing" type="button" class="cancel-edit-button" @click="cancelEdit">
        Cancel
      </button>
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
      <button type="button" class="add-review-button" @click="submitReview">
        {{ isEditing ? 'Update Review' : 'Add Review' }}
      </button>
    </div>

    <div v-if="normalizedReviews.length === 0" class="reviews-empty">
      <h3>No reviews yet</h3>
    </div>
    <div v-else>
      <div v-for="review in normalizedReviews" :key="review.id" class="review-container">
        <div class="basic-information">
          <div class="reviewer-header">
            <div class="reviewer-profile">
              <img :src="review.image" alt="Reviewer Profile" />
              <div class="reviewer-name">
                <h3>{{ review.reviewerName }}</h3>
              </div>
            </div>
            <div class="review-actions" v-if="currentUserIds.includes(String(review.reviewerId))">
              <button
                class="delete-button delete-button--mobile"
                type="button"
                title="Delete review"
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
              <button
                class="edit-button edit-button--mobile"
                type="button"
                title="Edit review"
                @click="editReview(review.id)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          </div>
          <div class="rating-container">
            <div class="review-date">
              <p>{{ review.reviewDate }}</p>
            </div>
            <div class="rating-actions">
              <div v-if="!(page === 'store' && isEditingReview(review.id))" class="review-rating">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{ filled: star <= review.reviewRating }"
                >
                  ★
                </span>
                <span class="numeric-rating">{{ review.rating }}</span>
              </div>
              <div
                class="review-actions-desktop"
                v-if="currentUserIds.includes(String(review.reviewerId))"
              >
                <button
                  class="delete-button delete-button--desktop"
                  type="button"
                  title="Delete review"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <button
                  class="edit-button edit-button--desktop"
                  type="button"
                  title="Edit review"
                  @click="editReview(review.id)"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="review-content">
          <template v-if="!isEditingReview(review.id)">
            <p>{{ review.reviewContent }}</p>
            <div v-if="review.images?.length && page != 'store'" class="review-attached-images">
              <img
                v-for="(image, index) in review.images"
                :key="index"
                :src="image"
                :alt="`Review attachment ${index + 1}`"
              />
            </div>
          </template>
          <div v-else-if="page === 'store'" class="review-inline-edit">
            <div class="review-rating-input" @mouseleave="hoverRating = null">
              <span
                v-for="star in 5"
                :key="`edit-${review.id}-${star}`"
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
              <button type="button" class="cancel-edit-button" @click="cancelEdit">Cancel</button>
              <button type="button" class="add-review-button" @click="submitReview">
                Update Review
              </button>
            </div>
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
    storeId: {
      type: [String],
      default: null,
    },
    productId: {
      type: [String],
      default: null,
    },
  },
  emits: ['add-review', 'edit-review'],
  data() {
    return {
      isEditing: false,
      editingReviewId: null,
      hoverRating: null,
      maxImages: 4,
      reviewImages: [],
      reviewInfo: {
        reviewContent: '',
        reviewRating: 1,
        reviewDate: new Date().toISOString(),
        // reviewerProfile: this.$store.getters['user/currentUser'].profilePicture,
        reviewerId:
          this.$store.getters['user/currentUser']?.id ??
          this.$store.getters['user/currentUser']?.userId ??
          this.$store.getters.userId,
        reviewerEmail: this.$store.getters['user/currentUser'].email,
        reviewerName:
          this.$store.getters['user/currentUser'].firstName +
          ' ' +
          this.$store.getters['user/currentUser'].lastName,
      },
    }
  },
  created() {
    console.log('check if reviews', this.reviews.reviewerId)
  },
  computed: {
    currentUserId() {
      const user = this.$store.getters['user/currentUser']
      return user?.id ?? user?.userId ?? this.$store.getters.userId ?? null
    },
    currentUserIds() {
      const user = this.$store.getters['user/currentUser']
      const authUserId = this.$store.getters.userId
      return [...new Set([user?.id, user?.userId, authUserId].filter(Boolean).map(String))]
    },
    normalizedReviews() {
      let reviews = []
      if (Array.isArray(this.reviews)) {
        reviews = this.reviews
      } else if (this.reviews && typeof this.reviews === 'object') {
        reviews = Object.values(this.reviews)
      }
      return reviews.map((review) => this.normalizeReview(review))
    },
    reviewsForContext() {
      if (this.page === 'store' && this.storeId != null) {
        const reviewsWithStoreId = this.normalizedReviews.filter((review) => review.storeId != null)
        if (reviewsWithStoreId.length > 0) {
          return reviewsWithStoreId.filter(
            (review) => String(review.storeId) === String(this.storeId),
          )
        }
      }
      if (this.page === 'product' && this.productId != null) {
        const reviewsWithProductId = this.normalizedReviews.filter(
          (review) => review.productId != null,
        )
        if (reviewsWithProductId.length > 0) {
          return reviewsWithProductId.filter(
            (review) => String(review.productId) === String(this.productId),
          )
        }
      }
      return this.normalizedReviews
    },
    myStore() {
      return this.$store.getters['stores/myStore']
    },
    myStoreId() {
      const store = this.myStore
      if (!store) {
        return null
      }
      return store.id ?? store.storeId ?? null
    },
    isViewingOwnStore() {
      if (this.page !== 'store' || this.storeId == null || this.myStoreId == null) {
        return false
      }
      return String(this.storeId) === String(this.myStoreId)
    },
    hasUserReviewed() {
      if (!this.currentUserIds.length) {
        return false
      }
      return this.reviewsForContext.some((review) => {
        const reviewUserId = review.reviewerId ?? review.commenterId
        return reviewUserId != null && this.currentUserIds.includes(String(reviewUserId))
      })
    },
    showReviewInput() {
      if (this.isViewingOwnStore) {
        return false
      }
      if (this.isEditing && this.page === 'store') {
        return false
      }
      if (this.isEditing) {
        return true
      }
      return this.currentUserIds.length > 0 && !this.hasUserReviewed
    },
    displayRating() {
      return this.hoverRating ?? this.reviewInfo.reviewRating
    },
    visibleUploadSlots() {
      const totalSlots = Math.min(this.reviewImages.length + 1, this.maxImages)
      return Array.from({ length: totalSlots }, (_, index) => index)
    },
  },
  mounted() {
    console.log(this.currentUserIds.length > 0 && !this.hasUserReviewed)
  },
  methods: {
    normalizeReview(review) {
      const rawImages = review.images ?? review.reviewImages ?? review.imageUrls ?? []
      const imageList = Array.isArray(rawImages) ? rawImages : []
      return {
        ...review,
        image: review.image ?? review.commenterProfile ?? review.reviewerProfile,
        reviewerName: review.reviewerName ?? review.commenterName ?? review.name ?? 'Anonymous',
        reviewerId: review.reviewerId ?? review.commenterId,
        reviewDate: review.reviewDate ?? review.commentDate ?? review.date ?? '',
        reviewRating: Number(review.reviewRating ?? review.rating ?? 0),
        rating: review.rating ?? review.reviewRating ?? 0,
        reviewContent: review.reviewContent ?? review.comment ?? review.content ?? '',
        images: imageList.map((img) =>
          typeof img === 'string' ? img : (img?.url ?? img?.preview ?? img),
        ),
      }
    },
    isEditingReview(reviewId) {
      return this.isEditing && String(this.editingReviewId) === String(reviewId)
    },
    setRating(star) {
      this.reviewInfo.reviewRating = Math.max(1, star)
      this.hoverRating = null
    },
    submitReview() {
      if (!this.reviewInfo.reviewContent.trim()) {
        return
      }

      const payload = {
        ...this.reviewInfo,
        id: this.editingReviewId,
        reviewImages: this.reviewImages.map((image) => image.file).filter(Boolean),
        existingImages: this.reviewImages
          .filter((image) => image.isExisting)
          .map((image) => image.preview),
      }

      if (this.isEditing) {
        this.$emit('edit-review', payload)
        console.log('payload', payload)
      } else {
        this.$emit('add-review', { ...payload, storeId: this.storeId })
      }
      this.cancelEdit()
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
      const normalized = this.normalizeReview(review)
      this.reviewInfo.reviewContent = normalized.reviewContent
      this.reviewInfo.reviewRating = Math.max(1, normalized.reviewRating || 1)
      this.clearReviewImages()
      normalized.images.forEach((url) => {
        if (url) {
          this.reviewImages.push({
            file: null,
            preview: url,
            isExisting: true,
          })
        }
      })
    },
    cancelEdit() {
      this.isEditing = false
      this.editingReviewId = null
      this.resetForm()
    },
    editReview(reviewId) {
      const review = this.normalizedReviews.find((item) => String(item.id) === String(reviewId))
      if (!review) {
        return
      }
      this.isEditing = true
      this.editingReviewId = reviewId
      this.populateFormFromReview(review)
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

.edit-button {
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
    background-color: #dff3f7;
    color: var(--secondary);
  }

  i {
    font-size: 0.9rem;
  }
}

.delete-button--mobile,
.edit-button--mobile {
  display: none;
}

.delete-button--desktop,
.edit-button--desktop {
  display: inline-flex;
}

.review-content p {
  font-size: 0.8rem;
  color: #0f172a;
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

  .basic-information {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .reviewer-header {
    width: 100%;
    justify-content: space-between;
  }

  .rating-container {
    align-items: flex-start;
  }

  .delete-button--desktop,
  .edit-button--desktop {
    display: none;
  }

  .delete-button--mobile,
  .edit-button--mobile {
    display: inline-flex;
  }
}
</style>
