<template>
  <div>
    <div class="store__filter--action">
      <store-search></store-search>
      <base-button
        class="button"
        :class="'button-secondary'"
        :isLink="true"
        :endpoint="'store/create'"
      >
        Create my Store
      </base-button>
    </div>
    <div class="store-list-container">
      <ul class="store-list">
        <store-item
          v-for="store in stores"
          :key="store.id"
          :id="store.id"
          :name="store.name"
          :image="store.image"
          :address="store.address"
          :ownerId="store.ownerId"
          :description="store.description"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import StoreItem from '@/components/store/StoreItem.vue'
import StoreSearch from '@/components/store/StoreSearch.vue'

export default {
  components: { StoreItem, StoreSearch },
  data() {
    return {
      stores: [
        {
          id: 1,
          name: 'Store 1',
          image: '/fashion.jpg',
          address: '123 Main St, Anytown, USA',
          owner: 'John Doe',
          ownerId: 1,
          description: 'Description of Store 1',
        },
        {
          id: 2,
          name: 'Store 2',
          image: '/fashion.jpg',
          address: '123 Main St, Anytown, USA',
          owner: 'Jane Doe',
          ownerId: 2,
          description: 'Description of Store 2',
        },
        {
          id: 3,
          name: 'Store 3',
          image: '/fashion.jpg',
          address: '123 Main St, Anytown, USA',
          owner: 'Jim Doe',
          ownerId: 3,
          description: 'Description of Store 3',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.store__filter--action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

.store-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
