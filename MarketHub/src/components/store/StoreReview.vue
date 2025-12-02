<template>
  <div class="reviews-list">
    <div v-for="review in reviews" :key="review.id" class="review-container">
      <div class="basic-information">
        <div class="reviewer-profile">
          <img :src="review.reviewerProfile" alt="Reviewer Profile" />
          <div class="reviewer-name">
            <h3>{{ review.reviewerName }}</h3>
          </div>
        </div>
        <div class="rating-container">
          <div class="review-date">
            <p>{{ review.reviewDate }}</p>
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
            <span class="numeric-rating">{{ review.reviewRating }}</span>
          </div>
        </div>
      </div>
      <div class="review-content">
        <p>{{ review.reviewContent }}</p>
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

.review-container {
  border-bottom: 1px solid #e2e8f0;
  padding: 0.75rem 0;
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

.review-content p {
  font-size: 0.8rem;
  color: #0f172a;
}
</style>
