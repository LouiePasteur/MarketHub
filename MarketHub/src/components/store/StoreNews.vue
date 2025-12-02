<template>
  <div class="store-news">
    <base-card v-for="item in news" :key="item.id" class="news-item">
      <div class="news-title">
        <h1>{{ item.title }}</h1>
        <p>{{ item.date }}</p>
      </div>
      <div class="news-content">
        <p>{{ item.content }}</p>
      </div>
      <div class="read-more">
        <router-link class="read-more--link"> Read More >> </router-link>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [
        {
          id: 1,
          title: 'News 1',
          content: 'Content of News 1',
          date: '2021-01-01',
        },
        {
          id: 2,
          title: 'News 2',
          content: 'Content of News 2',
          date: '2021-01-02',
        },
        {
          id: 3,
          title: 'News 3',
          content: 'Content of News 3',
          date: '2021-01-03',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.store-news {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.news {
  &-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;

    & > h1 {
      font-size: 2rem;
      margin-bottom: 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
      flex: 1;
      min-width: 0;
    }

    & > p {
      font-size: 0.8rem;
      color: #64748b;
    }
  }

  &-content p {
    font-size: 1.25rem;
  }

  &-date p {
    font-size: 0.8rem;
    color: #64748b;
  }
}

.read-more {
  text-align: right;

  &--link {
    background-color: #fff;
    color: var(--primary);
    padding: 0;

    &:hover {
      text-decoration: underline 1px solid var(--primary);
    }
  }
}
</style>
