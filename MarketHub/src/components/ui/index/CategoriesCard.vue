<template>
  <div class="categories-card">
    <div class="categories-card__media" :style="{ backgroundImage: `url(${image})` }">
      <div class="categories-card__shade"></div>
      <div class="categories-card__content">
        <h3 class="text-heading text-white">{{ title }}</h3>
        <p class="text-body text-white">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.categories-card {
  width: 100%;
  height: 100%;
  min-height: 280px;

  &__media {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 280px;
    background-size: cover;
    background-position: center;
    border-radius: var(--radius-lg);
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    transition: transform 0.35s ease;

    &:hover {
      transform: scale(1.015);

      .categories-card__shade {
        opacity: 1;
      }
    }
  }

  &__shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(15, 23, 42, 0.88) 0%,
      rgba(15, 23, 42, 0.55) 42%,
      rgba(15, 23, 42, 0.2) 100%
    );
    opacity: 0.92;
    transition: opacity 0.35s ease;
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 1.5rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      margin: 0;
      text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
    }

    p {
      margin: 0;
      opacity: 0.95;
      text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
