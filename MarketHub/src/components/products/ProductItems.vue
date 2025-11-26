<template>
  <base-card>
    <li class="product-item" @click="openDialogue">
      <img :src="image" alt="Product Image" />
      <div class="product-item-name">
        {{ name }}
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
.product-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
</style>
