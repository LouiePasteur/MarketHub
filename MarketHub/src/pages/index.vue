<template>
  <div class="application">
    <section class="hero">
      <div class="hero__inner">
        <div class="hero__copy">
          <h1 class="hero__brand text-display text-white">
            <span class="app_name">Market</span
            ><span class="app_name app_name--highlight">Hub</span>
          </h1>
          <p class="hero__tagline text-body-lg text-white">
            Your trusted marketplace for all your shopping needs
          </p>
          <base-button
            class="hero__cta"
            :classes="'button-hero'"
            :isLink="true"
            :endpoint="'/products'"
          >
            <i class="fa-solid fa-store"></i> Shop Now
          </base-button>
        </div>
        <div class="hero__visual">
          <img src="/get-started.png" alt="Shop on MarketHub" class="hero__image" />
        </div>
      </div>
    </section>

    <section class="about">
      <div class="about__inner">
        <div class="about__intro">
          <h2 class="text-title text-primary">What is Market Hub?</h2>
          <p class="text-body-lg text-muted">
            Market Hub is a modern marketplace built to make everyday shopping simple, secure, and
            enjoyable. Whether you are looking for fashion, gadgets, beauty essentials, or groceries,
            you can browse trusted stores and discover products in one place.
          </p>
          <p class="text-body text-muted">
            For sellers, Market Hub is a home to grow. Create your store, share updates, manage
            products, and reach buyers who are ready to shop. For buyers, it means clearer choices,
            smoother orders, and the confidence that every purchase is backed by a verified
            marketplace experience.
          </p>
        </div>

        <ul class="about__points">
          <li v-for="point in aboutPoints" :key="point.id" class="about__point">
            <span class="about__point-icon">
              <i :class="point.icon"></i>
            </span>
            <div class="about__point-copy">
              <h3 class="text-subheading text-dark">{{ point.title }}</h3>
              <p class="text-body-sm text-muted">{{ point.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="categories">
      <div class="categories__inner">
        <h2 class="text-title text-primary">Popular Categories</h2>
        <ul class="categories__list">
          <li v-for="category in categories" :key="category.id" class="categories__item">
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
      <div class="features__inner">
        <h2 class="text-title text-primary">Why shop with us</h2>
        <ul class="features__list">
          <li v-for="feature in features" :key="feature.id" class="features__item">
            <span class="features__icon">
              <i :class="feature.icon"></i>
            </span>
            <h3 class="text-subheading text-dark">{{ feature.title }}</h3>
            <p class="text-body-sm text-muted">{{ feature.description }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="cta">
      <div class="cta__inner">
        <h2 class="text-title text-white">Ready to start shopping?</h2>
        <div class="cta__actions">
          <base-button :isLink="true" :endpoint="'/signup'" :classes="'button-transparent-lg'">
            <i class="fa-solid fa-user-plus"></i> Create an Account
          </base-button>
          <base-button :isLink="true" :endpoint="'/products'" :classes="'button-transparent-lg'">
            <i class="fa-solid fa-magnifying-glass"></i> Browse Products
          </base-button>
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
      aboutPoints: [
        {
          id: 1,
          icon: 'fa-solid fa-bag-shopping',
          title: 'Shop with confidence',
          description:
            'Explore products from verified sellers and enjoy a smoother checkout from browse to delivery.',
        },
        {
          id: 2,
          icon: 'fa-solid fa-store',
          title: 'Sell and grow',
          description:
            'Build your store, list products, post news, and manage orders in one seller-friendly space.',
        },
        {
          id: 3,
          icon: 'fa-solid fa-users',
          title: 'Connected community',
          description:
            'Buyers and sellers meet in one marketplace designed for trust, convenience, and everyday discovery.',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Fashion',
          image: '/fashion.jpg',
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
      features: [
        {
          id: 1,
          icon: 'fa-solid fa-lock',
          title: 'Safe & Secure Purchases',
          description:
            'Shop with confidence knowing that every transaction on MarketHub is protected. Your privacy and payment security are our top priorities.',
        },
        {
          id: 2,
          icon: 'fa-solid fa-bolt',
          title: 'Fast Delivery',
          description:
            'We partner with reliable couriers to make sure your orders arrive quickly and in perfect condition—right at your doorstep.',
        },
        {
          id: 3,
          icon: 'fa-solid fa-handshake',
          title: 'Trusted Sellers',
          description:
            'Every seller on MarketHub is verified and reviewed to ensure quality products and a smooth shopping experience every time.',
        },
        {
          id: 4,
          icon: 'fa-solid fa-arrow-rotate-left',
          title: 'Easy Return Policy',
          description:
            'Changed your mind? No worries. Enjoy hassle-free returns and quick resolutions through our customer-friendly return process.',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.application {
  width: 100%;
  overflow-x: hidden;
}

.app_name {
  display: inline-block;
  font-family: var(--font-title);
  font-size: inherit;
  font-weight: 800;
  color: #fff;
  background-color: var(--primary);
  border-radius: var(--radius-lg);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.35em 0.5em;
  line-height: 1.15;

  &--highlight {
    color: var(--primary);
    background-color: #fff;
    border-radius: var(--radius-lg);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background:
    radial-gradient(circle at 18% 20%, rgba(255, 255, 255, 0.28), transparent 42%),
    radial-gradient(circle at 82% 75%, rgba(255, 255, 255, 0.18), transparent 40%),
    linear-gradient(135deg, #57d7e6 0%, #5fd98a 52%, #7ced61 100%);
  overflow: hidden;

  &__inner {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 2rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      padding: 5rem 1.5rem 3rem;
      text-align: center;
    }
  }

  &__copy {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1.25rem;
    animation: fade-up 0.7s ease-out both;
  }

  &__brand {
    margin: 0;
  }

  &__tagline {
    margin: 0 auto;
    max-width: 28rem;
    opacity: 0.95;
  }

  &__cta {
    margin-top: 0.5rem;
    width: fit-content;
    animation: fade-up 0.7s ease-out 0.15s both;
  }

  &__visual {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fade-in 0.9s ease-out 0.2s both;

    @media (max-width: 1024px) {
      order: -1;
      max-width: 320px;
      margin: 0 auto;
    }
  }

  &__image {
    width: 100%;
    max-width: 560px;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 18px 30px rgba(15, 23, 42, 0.18));
    animation: float 5s ease-in-out infinite;
  }
}

.about {
  background-color: #fff;
  padding: 6rem 1.5rem;

  &__inner {
    max-width: 980px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }

  &__intro {
    max-width: 720px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.75rem;

    h2 {
      margin: 0 0 0.75rem;
    }

    p {
      margin: 0;
      max-width: 40rem;
    }
  }

  &__points {
    list-style: none;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      max-width: 520px;
    }
  }

  &__point {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.85rem;
    padding: 0.5rem 0.75rem;

    &-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, #57d7e6, #7ced61);
      color: #fff;

      i {
        font-size: var(--icon-md);
      }
    }

    &-copy {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      h3,
      p {
        margin: 0;
      }
    }
  }
}

.categories {
  background:
    linear-gradient(180deg, #f1f5f9 0%, #e8eef5 100%);
  padding: 6rem 1.5rem;

  &__inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;

    h2 {
      margin: 0;
      text-align: center;
    }
  }

  &__list {
    list-style: none;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    min-height: 280px;
  }
}

.features {
  background-color: #fff;
  padding: 6rem 1.5rem;

  &__inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;

    h2 {
      margin: 0;
      text-align: center;
    }
  }

  &__list {
    list-style: none;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
    text-align: center;
    transition: transform 0.25s ease;

    &:hover {
      transform: translateY(-4px);
    }

    h3,
    p {
      margin: 0;
    }
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: var(--radius-md);
    background-color: var(--primary);
    color: #fff;

    i {
      font-size: var(--icon-md);
    }
  }
}

.cta {
  padding: 5rem 1.5rem;
  background:
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.22), transparent 45%),
    linear-gradient(135deg, #57d7e6 0%, #5fd98a 55%, #7ced61 100%);

  &__inner {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.75rem;
    text-align: center;

    h2 {
      margin: 0;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    width: 100%;

    a {
      min-width: 220px;

      @media (max-width: 768px) {
        width: 100%;
        min-width: 0;
      }
    }
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__copy,
  .hero__cta,
  .hero__visual,
  .hero__image,
  .features__item {
    animation: none;
    transition: none;
  }
}
</style>
