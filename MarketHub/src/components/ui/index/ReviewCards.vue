<template>
  <div class="reviews-list">
    <ReviewInput
      v-if="showReviewInput"
      :page="page"
      :is-editing="isEditing"
      :editing-review="editingReview"
      @submit="handleReviewSubmit"
      @cancel="cancelEdit"
    />

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
            <div class="review-actions" v-if="currentUserIds.includes(review.reviewerId)">
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
          <ReviewInput
            v-else-if="page === 'store'"
            variant="inline"
            :page="page"
            :is-editing="true"
            :editing-review="review"
            @submit="handleReviewSubmit"
            @cancel="cancelEdit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewInput from './ReviewInput.vue'

export default {
  components: {
    ReviewInput,
  },
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
    }
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

      console.log('reviews', reviews)
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
    editingReview() {
      if (!this.isEditing || !this.editingReviewId) {
        return null
      }
      return this.normalizedReviews.find((item) => item.id === this.editingReviewId) ?? null
    },
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
      return this.isEditing && this.editingReviewId === reviewId
    },
    handleReviewSubmit(payload) {
      if (this.isEditing) {
        this.$emit('edit-review', { ...payload, id: this.editingReviewId })
      } else {
        this.$emit('add-review', { ...payload, storeId: this.storeId })
      }
      this.cancelEdit()
    },
    cancelEdit() {
      this.isEditing = false
      this.editingReviewId = null
    },
    editReview(reviewId) {
      const review = this.normalizedReviews.find((item) => item.id === reviewId)
      if (!review) {
        return
      }
      this.isEditing = true
      this.editingReviewId = reviewId
    },
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

.numeric-rating {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  margin-left: 0.25rem;
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

@media (max-width: 1024px) {
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
