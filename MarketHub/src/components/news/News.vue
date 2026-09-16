<template>
  <div class="store-news">
    <div v-if="news.length === 0" class="news-empty">
      <i class="fa-regular fa-newspaper"></i>
      <h3>No news yet</h3>
      <p>Updates from this store will show up here.</p>
    </div>

    <div v-else class="news-list">
      <article v-for="item in news" :key="item.id" class="news-item">
        <div class="news-header">
          <h3 class="news-title">{{ item.title }}</h3>
          <time class="news-date" :datetime="item.date">
            <i class="fa-regular fa-calendar"></i>
            {{ item.date }}
          </time>
        </div>

        <p class="news-content">{{ item.content }}</p>

        <div class="news-footer">
          <router-link :to="item.link || '#'" class="read-more">
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
  name: 'News',
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

.news-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 3rem 1rem;
  text-align: center;
  color: #64748b;

  i {
    font-size: 2rem;
    color: var(--primary);
    margin-bottom: 0.25rem;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #0f172a;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
}

.news-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.news-item {
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

.news-header {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.news-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.news-date {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #64748b;

  i {
    font-size: 0.75rem;
  }
}

.news-content {
  margin: 0;
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.55;
  color: #475569;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding-top: 0.25rem;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--primary);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: gap 0.2s ease;

  i {
    font-size: 0.75rem;
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
