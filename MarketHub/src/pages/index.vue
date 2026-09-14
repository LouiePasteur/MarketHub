<template>
  <div class="application">
    <section class="hero container container--primary">
      <div class="content">
        <img src="/get-started.png" alt="Get Started" class="image" />
        <div class="content-text">
          <h1>
            <span class="app_name">Market</span
            ><span class="app_name app_name--highlight">Hub</span>
          </h1>
          <p>Your trusted marketplace for all your shopping needs</p>
          <base-button
            class="button-sm"
            :classes="'button-transparent-lg'"
            :isLink="true"
            :endpoint="'/products'"
            ><i class="fa-solid fa-store"></i> Shop Now</base-button
          >
        </div>
      </div>
    </section>
    <section class="about_us">
      <div class="content">
        <h2>What is Market Hub?</h2>
        <p>
          Market Hub connects buyers with trusted sellers in one smart platform. Explore thousands
          of products with confidence and convenience.
        </p>
      </div>
    </section>
    <section class="popular_categories container--secondary">
      <div class="content categories-content">
        <h2>Popular Categories</h2>
        <ul>
          <li v-for="category in categories" :key="category.id">
            <categories-card
              :title="category.title"
              :image="category.image"
              :description="category.description"
            />
          </li>
        </ul>
      </div>
    </section>
    <section class="features">
      <div class="content features-content">
        <ul class="features-list">
          <base-card>
            <li>
              <i class="fa-solid fa-lock"></i>
              <h4>Safe & Secure Purchases</h4>
              <p>
                Shop with confidence knowing that every transaction on MarketHub is protected. Your
                privacy and payment security are our top priorities.
              </p>
            </li>
          </base-card>
          <base-card>
            <li>
              <i class="fa-solid fa-bolt"></i>
              <h4>Fast Delivery</h4>
              <p>
                We partner with reliable couriers to make sure your orders arrive quickly and in
                perfect condition—right at your doorstep.
              </p>
            </li>
          </base-card>
          <base-card>
            <li>
              <i class="fa-solid fa-handshake"></i>
              <h4>Trusted Sellers</h4>
              <p>
                Every seller on MarketHub is verified and reviewed to ensure quality products and a
                smooth shopping experience every time.
              </p>
            </li>
          </base-card>
          <base-card>
            <li>
              <i class="fa-solid fa-arrow-rotate-left"></i>
              <h4>Easy Return Policy</h4>
              <p>
                Changed your mind? No worries. Enjoy hassle-free returns and quick resolutions
                through our customer-friendly return process.
              </p>
            </li>
          </base-card>
        </ul>
      </div>
    </section>
    <section class="container container--primary action-section quarter-section">
      <div class="content">
        <h2>Ready to start shopping?</h2>
        <div class="action-container">
          <base-button class="button-sm" :isLink="true" :classes="'button-transparent-lg'">
            <i class="fa-solid fa-user-plus"></i> Create an Account</base-button
          >
          <base-button
            class="button-sm"
            :isLink="true"
            :endpoint="'/home'"
            :classes="'button-transparent-lg'"
            ><i class="fa-solid fa-magnifying-glass"></i> Browse Products</base-button
          >
        </div>
      </div>
    </section>
    <base-footer />
  </div>
</template>

<script>
import CategoriesCard from '../components/ui/index/CategoriesCard.vue'

export default {
  components: { CategoriesCard },
  data() {
    return {
      categories: [
        {
          id: 1,
          title: 'Fashion',
          image: 'fashion.jpg',
          description: 'Discover the latest trends in fashion',
        },
        {
          id: 2,
          title: 'Electronics & Gadgets',
          image: '/computer.jpg',
          description: 'Stay connected and powered up with the latest gadgets and smart devices.',
        },
        {
          id: 3,
          title: 'Health and Cosmetics',
          image: '/cosmetics.jpg',
          description:
            'Enhance your health and beauty with effective medicines, premium skincare and grooming essentials.',
        },
        {
          id: 4,
          title: 'Food & Groceries',
          image: '/groceries.jpg',
          description:
            'Stock up on fresh and daily essentials to fuel your lifestyle with quality ingredients.',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
h1,
p {
  color: #fff;
}

p {
  font-family: var(--font-secondary);
  font-size: 1.5rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

h1 {
  font-family: var(--font-primary);
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

h2 {
  font-family: var(--font-primary);
  color: var(--primary);
  font-size: 3rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

section {
  min-height: 100vh !important;

  &.quarter-section {
    min-height: 50vh !important;
  }
}

.app_name {
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  background-color: var(--primary);
  border-radius: var(--radius-lg);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0 1rem;

  &--highlight {
    color: var(--primary);
    background-color: #fff;
    border-radius: var(--radius-lg);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.flex-column {
  flex-direction: column;
}

.application {
  width: 100%;
  height: 100%;
}

.button-sm {
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.hero {
  width: 100%;
  height: 80vh;

  @media (max-width: 768px) {
    height: 50vh;
  }

  & .content {
    padding: 50px 50px;
  }

  & p {
    margin-bottom: var(--spacing-2xl);
  }
}

.container {
  &--primary {
    background-image: linear-gradient(to bottom right, #57d7e6, #7ced61);
    max-width: 100%;
  }
  &--secondary {
    background-color: #eff2f6;
  }
}

.content {
  width: 100%;
  max-width: 1400px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 0 100px;
  justify-self: center;

  & h2 {
    margin-bottom: 50px;
  }
}

.content-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image {
  width: 50%;
  height: auto;
  max-width: 100%;
  object-fit: contain;

  @media (max-width: 1023px) {
    display: none;
  }
}

.about_us {
  height: auto;
  background-color: #fff;
}

.about_us {
  padding: 100px 50px;

  & .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;

    @media (max-width: 1023px) {
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    & h1,
    p {
      color: var(--primary);
    }

    & h1 {
      font-family: var(--font-primary);
      margin-bottom: 50px;
    }

    & p {
      font-family: var(--font-secondary);
      font-weight: 500;
      color: #000;
    }
  }
}

.popular_categories {
  padding: 100px 50px;
}

.features {
  background-color: #fff;
  height: fit-content;
}

.features-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 50px;
  margin: 0 100px;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;

    & i,
    h4 {
      align-self: center;
    }
  }

  & ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 1023px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  & li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: var(--primary);
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  & i {
    padding: 10px;
    background-color: var(--primary);
    color: #fff;
    border-radius: var(--radius-md);
    margin-bottom: 20px;
  }

  & h4 {
    font-family: var(--font-primary);
    color: #000;
    margin-bottom: 20px;
  }

  & p {
    font-family: var(--font-secondary);
    color: #000;
    font-size: 0.8rem;
  }
}

.categories-content {
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & ul {
    width: 100%;
    list-style: none;
  }

  & li {
    margin-bottom: 20px;
  }
}

.action-section {
  & h2 {
    font-family: var(--font-primary);
    color: #fff;
  }

  & .content {
    padding: 100px 50px;
    margin: 0 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: left;

    @media (max-width: 768px) {
      text-align: center;
    }
  }

  & .action-container {
    width: 100%;
    text-align: center;

    @media (max-width: 1023px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  & a {
    width: 25%;

    @media (max-width: 1023px) {
      width: 50%;
    }

    @media (max-width: 768px) {
      width: 100%;
    }

    &:first-child {
      margin-right: 30px;

      @media (max-width: 1023px) {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
