<template>
  <base-card>
    <router-link to="/store/{{ id }}" class="store-link">
      <li class="store-item">
        <img :src="'fashion.jpg'" alt="Store Image" />
        <div class="store-stars">
          <span v-for="star in 5" :key="star" class="star filled"> ★ </span>
          <span class="numeric-rating text-caption text-muted">(4.5)</span>
        </div>
        <div class="store-name text-subheading">
          {{ name }}
        </div>
        <div class="store-address text-caption text-muted"><i class="fa-solid fa-location-dot"></i> {{ address }}</div>
        <div class="store-action">
          <base-button class="button button-secondary"> + Follow </base-button>
          <base-button class="button button-primary" @click="openStore"> View Store </base-button>
        </div>
      </li>
    </router-link>
  </base-card>
</template>

<script>
export default {
  props: {
    id: { type: Number },
    name: { type: String },
    image: { type: String },
    address: { type: String },
    ownerId: { type: Number },
    description: { type: String },
    owner: { type: Object },
    ownerId: { type: Number },
  },
  methods: {
    openStore() {
      this.$router.push(`/store/${this.id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  margin-bottom: 10px;
}

.store {
  &-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }

  &-name {
    text-align: left;
  }

  &-address {
    text-align: left;
  }

  &-stars {
    text-align: left;
  }

  &-link {
    text-decoration: none;
    color: var(--primary);
  }
}

img {
  object-fit: cover;
  width: 100%;
  height: 200px;
  background-color: #f8fafc;
  border-radius: var(--radius-md);
}

.product-item-price {
  font-weight: 700;
  text-align: left;
  color: var(--primary);
}

.star {
  font-size: var(--icon-md);
  color: #cbd5f5;

  &.filled {
    color: #f59e0b;
  }
}
</style>
