<template>
  <base-card>
    <router-link to="/store/{{ id }}" class="store-link">
      <li class="store-item">
        <img :src="image" alt="Store Image" />
        <div class="store-stars">
          <span v-for="star in 5" :key="star" class="star filled"> ★ </span>
          <span class="numeric-rating">(4.5)</span>
        </div>
        <div class="store-name">
          {{ name }}
        </div>
        <div class="store-address"><i class="fa-solid fa-location-dot"></i> {{ address }}</div>
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

.numeric-rating {
  font-size: 0.75rem;
}

.store-address {
  font-size: 0.75rem;
  color: #000;
  text-align: left;
}

.store-item {
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

.store-link {
  text-decoration: none;
  color: var(--primary);
}

img {
  object-fit: cover;
  width: 100%;
  height: 200px;
  background-color: #f8fafc;
  border-radius: var(--radius-md);
}

.store-name {
  font-weight: 700;
  text-align: left;
}

.product-item-price {
  font-weight: 700;
  text-align: left;
  color: var(--primary);
}

.star {
  font-size: 1rem;
  color: #cbd5f5;
}

.star.filled {
  color: #f59e0b;
}

.store-stars {
  text-align: left;
}
</style>
