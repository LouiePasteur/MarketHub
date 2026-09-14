<template>
  <div>
    <div class="store__filter--action">
      <store-search></store-search>
      <base-button
        class="button"
        :class="'button-secondary'"
        :isLink="true"
        :endpoint="'store/create'"
        v-if="!myStore"
      >
        Create my Store
      </base-button>
    </div>
    <div class="store-list-container" v-if="stores.length > 0">
      <ul class="store-list">
        <store-item
          v-for="store in stores"
          :key="store.storeId"
          :id="store.storeId"
          :name="store.storeName"
          :image="store.storeImage"
          :address="store.storeAddress"
          :ownerId="store.ownerId"
          :description="store.storeDescription"
          :rate="store.storeRate"
        />
      </ul>
    </div>
    <div class="no-store" v-else>
      <h3>There is no available store yet.</h3>
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
      storesItems: [],
    }
  },
  computed: {
    stores() {
      return this.$store.getters['stores/stores']
    },
    myStore() {
      return !!this.$store.getters['stores/myStore']
    },
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
