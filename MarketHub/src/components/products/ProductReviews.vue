<template>
  <div class="reviews-list">
    <div v-for="review in reviews" :key="review.id" class="review-container">
      <div class="basic-information">
        <div class="reviewer-profile">
          <img :src="review.reviewerProfile" alt="Reviewer Profile" />
          <div class="reviewer-name">
            <h3 class="text-subheading">{{ review.reviewerName }}</h3>
          </div>
        </div>
        <div class="rating-container">
          <div class="review-date">
            <p class="text-caption text-muted">{{ review.reviewDate }}</p>
          </div>
          <div class="review-rating">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{ filled: star <= review.reviewRating }"
            >
              ★
            </span>
            <span class="numeric-rating text-caption text-muted">{{ review.reviewRating }}</span>
          </div>
        </div>
      </div>
      <div class="review-content">
        <p class="text-body-sm text-muted">{{ review.reviewContent }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reviews: [
        {
          id: 1,
          reviewerProfile: '/groceries.jpg',
          reviewerName: 'John Doe',
          reviewDate: '2021-01-01',
          reviewRating: 5,
          reviewContent: 'This is a review',
        },
        {
          id: 2,
          reviewerProfile: '/groceries.jpg',
          reviewerName: 'Jane Smith',
          reviewDate: '2021-02-10',
          reviewRating: 3,
          reviewContent: 'Pretty good overall, could be better.',
        },
        {
          id: 3,
          reviewerProfile: '/groceries.jpg',
          reviewerName: 'Alex Johnson',
          reviewDate: '2021-03-05',
          reviewRating: 4,
          reviewContent: 'Satisfied with the purchase.',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.basic-information {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

.review {
  &-container {
    border-bottom: 1px solid #e2e8f0;
    padding: 0.75rem 0;
  }

  &-rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &-date {
    text-align: right;

    @media (max-width: 1024px) {
      text-align: left;
    }
  }
}

.reviewer {
  &-profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}

.star {
  font-size: var(--icon-md);
  color: #cbd5f5;

  &.filled {
    color: #f59e0b;
  }
}

.numeric-rating {
  font-weight: 600;
  margin-left: 0.25rem;
}
</style>
