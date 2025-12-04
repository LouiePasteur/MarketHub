<template>
  <div class="reviews-list">
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
  },
}
</script>

<style lang="scss" scoped>
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  font-size: 1rem;
  color: #cbd5f5;
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
