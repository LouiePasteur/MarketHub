<template>
  <div class="store-page">
    <div class="store-navigation">
      <div
        v-for="item in tabs"
        :key="item.identifier"
        class="store-navigation__item text-label"
        :class="{ active: active === item.identifier }"
        @click="makeActive(item.identifier)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <base-card class="store-page__content">
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
      tabs: [
        {
          name: 'My Store',
          identifier: 'my-store',
          icon: 'fa-solid fa-store',
        },
        {
          name: 'Store List',
          identifier: 'store-list',
          icon: 'fa-solid fa-shop',
        },
      ],
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
.store-page {
  width: 100%;
  display: flex;
  flex-direction: column;

  :deep(.store-page__content) {
    margin-top: 0;
    border-top-left-radius: 0;
  }
}

.store-navigation {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.35rem;
  margin: 0;
  padding: 0;

  &__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.7rem 1.35rem;
    border-top-left-radius: var(--radius-md);
    border-top-right-radius: var(--radius-md);
    background-color: rgba(15, 23, 42, 0.18);
    color: #fff;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    i {
      font-size: var(--icon-sm);
    }

    &:hover {
      background-color: rgba(15, 23, 42, 0.28);
    }

    &.active {
      background-color: #fff;
      color: var(--primary);
    }
  }
}
</style>
