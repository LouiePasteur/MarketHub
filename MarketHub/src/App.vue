<script setup>
// Colors are now available globally via CSS custom properties
// No need to import or apply them manually
</script>

<template>
  <div class="app">
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

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
  margin-bottom: var(--spacing-xl);
}
</style>
