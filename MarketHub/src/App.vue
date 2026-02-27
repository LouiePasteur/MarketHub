<template>
  <div class="app">
    <the-header v-if="!$route.meta.hideHeader" />
    <div :class="!$route.meta.hideHeader ? 'container' : 'container-full-width'">
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('autoLogin')
  },
}
</script>

<style>
/* Additional CSS Variables (shadows, spacing, fonts, etc.) */
:root {
  /* Font Families */
  --font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  --font-secondary:
    'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

  /* Shadow Colors */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
}

/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

body {
  font-family: var(--font-main);
  background-color: #f8fafc;
  color: #1e293b;
  line-height: 1.6;
}

.app {
  background-image: linear-gradient(to bottom right, #57d7e6, #7ced61);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
}

h1 {
  font-family: var(--font-secondary);
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: var(--spacing-md);
}

p {
  font-size: 1.25rem;
  color: #64748b;
}

.container {
  width: 100%;
  padding: 20px;
  max-width: 1400px;

  @media (max-width: 1024px) {
    padding: 20px;
  }
}

.container-full-width {
  width: 100%;
  max-width: 100%;
  margin: none !important;
}
</style>
