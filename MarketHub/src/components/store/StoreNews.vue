<template>
  <div class="store-news">
    <div v-if="news.length === 0" class="news-empty">
      <i class="fa-regular fa-newspaper"></i>
      <h3 class="text-heading text-dark">No news yet</h3>
      <p class="text-body text-muted">Updates from this store will show up here.</p>
    </div>

    <div v-else class="news-list">
      <article v-for="item in news" :key="item.id" class="news-item">
        <div class="news-header">
          <h3 class="news-title text-heading text-dark">{{ item.title }}</h3>
          <time class="news-date text-caption text-muted" :datetime="item.date">
            <i class="fa-regular fa-calendar"></i>
            {{ item.date }}
          </time>
        </div>

        <p class="news-content text-body text-muted">{{ item.content }}</p>

        <div class="news-footer">
          <router-link :to="item.link || '#'" class="read-more text-body-sm text-primary">
            Read more
            <i class="fa-solid fa-arrow-right"></i>
          </router-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreNews',
  data() {
    return {
      news: [
        {
          id: 1,
          title: 'Spring Collection Just Dropped',
          content:
            'Explore our newest arrivals for the season — fresh styles, limited stock, and exclusive member-only deals available this week only.',
          date: '2026-03-10',
          link: '#',
        },
        {
          id: 2,
          title: 'Free Shipping This Weekend',
          content:
            'Enjoy free shipping on all orders over $50 from Friday to Sunday. No promo code needed — the discount applies automatically at checkout.',
          date: '2026-03-12',
          link: '#',
        },
        {
          id: 3,
          title: 'Store Renovation Complete',
          content:
            'Our space has a fresh new look. Visit us in-store for a smoother shopping experience and a special welcome gift for the first 100 visitors.',
          date: '2026-03-14',
          link: '#',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.store-news {
  width: 100%;
}

.news {
  &-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 3rem 1rem;
    text-align: center;

    i {
      font-size: var(--icon-xl);
      color: var(--primary);
      margin-bottom: 0.25rem;
    }

    h3,
    p {
      margin: 0;
    }
  }

  &-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &-item {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: 1.25rem;
    background-color: #fff;
    border: 1px solid #e2e8f0;
    border-left: 4px solid var(--primary);
    border-radius: var(--radius-md);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      border-color: #cbd5e1;
      box-shadow: var(--shadow-md);
    }
  }

  &-header {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  &-title {
    margin: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  &-date {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  &-content {
    margin: 0;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    padding-top: 0.25rem;
  }
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  text-decoration: none;
  transition: gap 0.2s ease;

  i {
    font-size: var(--icon-sm);
    transition: transform 0.2s ease;
  }

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;

    i {
      transform: translateX(3px);
    }
  }
}
</style>
