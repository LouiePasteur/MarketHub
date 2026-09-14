<template>
  <div class="categories-card">
    <div class="card-content" :style="{ backgroundImage: `url(${image})` }">
      <div class="overlay-white"></div>
      <div class="overlay-black"></div>
      <div class="card-content-text">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
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
  height: 250px;
  list-style: none;

  p {
    font-family: var(--font-secondary);
    font-size: 1.25rem;
    font-weight: 500;
    color: #000;
    display: none;
  }

  h3 {
    font-family: var(--font-primary);
    font-size: 2.75rem;
    color: var(--primary);

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .card-content {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 20px;

    .overlay-white {
      background-color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.7;
      transition: transform 0.3s ease-in-out;
      transform: translateX(0);
      z-index: 1;
      border-radius: 20px;
    }

    .overlay-black {
      background-color: #000;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      transform: translateX(-100%);
      z-index: 1;
      border-radius: 20px;
    }

    .card-content-text {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 20px;
      z-index: 2;
    }

    &:hover {
      .overlay-white {
        transform: translateX(100%);
        display: none;
      }

      .overlay-black {
        opacity: 0.7;
        transform: translateX(0);
      }

      h3 {
        color: var(--primary-light);
        transition: color 0.3s ease-in-out;
      }

      p {
        display: block;
        color: #fff;
        transition: all 0.3s ease-in-out;
      }
    }
  }
}
</style>
