<template>
  <div>
    <div class="store-navigation">
      <div
        class="navigation-item"
        :class="{ active: active === 'my-store' }"
        @click="makeActive('my-store')"
      >
        My Store
      </div>
      <div
        class="navigation-item"
        :class="{ active: active === 'store-list' }"
        @click="makeActive('store-list')"
      >
        Store List
      </div>
    </div>
    <base-card class="container">
      <store-list v-if="active === 'store-list'"></store-list>
      <my-store v-else></my-store>
    </base-card>
    <sp-navigation />
  </div>
</template>

<script>
import StoreList from '@/components/store/StoreList.vue'
import MyStore from '@/components/store/MyStore.vue'

export default {
  components: { StoreList, MyStore },
  data() {
    return {
      active: 'my-store',
    }
  },
  methods: {
    makeActive(item) {
      this.active = item
    },
  },
}
</script>

<style lang="scss" scoped>
.store-navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;

  & div {
    padding: 5px 10px;
    border-top-left-radius: var(--radius-md);
    border-top-right-radius: var(--radius-md);

    &:hover {
      cursor: pointer;
      background-color: var(--primary-dark);
    }

    &.active {
      background-color: var(--primary);
    }
  }
}
</style>
