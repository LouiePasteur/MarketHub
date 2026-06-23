<template>
  <base-card>
    <li class="product-item" @click="openDialogue">
      <img :src="image" alt="Product Image" />
      <div class="product-item-name">
        {{ name }}
      </div>
      <div class="products-stars">
        <span v-for="star in 5" :key="star" class="star filled"> ★ </span>
        <span class="numeric-rating">(4.5)</span>
      </div>
      <div class="product-item-price">$ {{ price }}</div>
      <base-button class="button" :class="'button-secondary'"> Add to Cart </base-button>
      <base-button class="button" :class="'button-primary'"> Buy Now </base-button>
    </li>
  </base-card>
</template>

<script>
export default {
  props: {
    name: { type: String },
    image: { type: String },
    price: { type: [Number, String] },
    product: { type: Object },
  },
  emits: ['open-dialogue', 'add-to-cart', 'buy-now'],
  methods: {
    openDialogue() {
      this.$emit(
        'open-dialogue',
        this.product || {
          name: this.name,
          image: this.image,
          price: this.price,
        },
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.numeric-rating {
  font-size: 0.75rem;
}

.product-item {
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

img {
  object-fit: cover;
  width: 100%;
  height: 200px;
  background-color: #f8fafc;
  border-radius: var(--radius-md);
}

.product-item-name {
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

.products-stars {
  text-align: left;
}
</style>
