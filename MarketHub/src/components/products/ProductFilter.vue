<template>
  <div>
    <label for="categories">Category </label>
    <select id="categories" name="categories" v-model="selectedCategoryId">
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategoryId: 1,
      categories: [
        {
          id: 1,
          name: 'All items',
        },
        {
          id: 2,
          name: 'Fashion',
        },
        {
          id: 3,
          name: 'Electronics & Gadgets',
        },
        {
          id: 4,
          name: 'Health & Beauty',
        },
        {
          id: 5,
          name: 'Toys',
        },
        {
          id: 6,
          name: 'Food and Groceries',
        },
      ],
    }
  },
}
</script>
