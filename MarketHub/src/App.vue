<script setup>
// Colors are now available globally via CSS custom properties
// No need to import or apply them manually
</script>

<template>
  <div class="app">
    <h1>MarketHub</h1>
    <p>Your trusted marketplace for all your shopping needs</p>
    <div class="color-preview">
      <div class="color-swatch primary">Primary</div>
      <div class="color-swatch primary-light">Primary Light</div>
      <div class="color-swatch primary-dark">Primary Dark</div>
      <div class="color-swatch secondary">Secondary</div>
      <div class="color-swatch secondary-light">Secondary Light</div>
      <div class="color-swatch secondary-dark">Secondary Dark</div>
    </div>
  </div>
</template>

<style>
/* Additional CSS Variables (shadows, spacing, etc.) */
:root {
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
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f8fafc;
  color: #1e293b;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
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

/* Color preview swatches */
.color-preview {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.color-swatch {
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-lg);
  color: #ffffff;
  font-weight: 600;
  box-shadow: var(--shadow-md);
}

.color-swatch.primary {
  background-color: var(--primary);
}

.color-swatch.primary-light {
  background-color: var(--primary-light);
}

.color-swatch.primary-dark {
  background-color: var(--primary-dark);
}

.color-swatch.secondary {
  background-color: var(--secondary);
}

.color-swatch.secondary-light {
  background-color: var(--secondary-light);
}

.color-swatch.secondary-dark {
  background-color: var(--secondary-dark);
}
</style>
