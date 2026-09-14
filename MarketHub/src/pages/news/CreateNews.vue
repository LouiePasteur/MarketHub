<template>
  <base-card class="container">
    <h1>Create News</h1>
    <news-form class="news_form" @submit="handleSubmit"></news-form>
  </base-card>
</template>

<script>
import NewsForm from '@/components/news/NewsForm.vue'
export default {
  components: {
    NewsForm,
  },
  methods: {
    handleSubmit() {
      console.log('Create Store')
    },
  },
}
</script>

<style lang="scss" scoped>
.news_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

h1 {
  @media (max-width: 1024px) {
    font-size: 1.8em;
  }
}
</style>
