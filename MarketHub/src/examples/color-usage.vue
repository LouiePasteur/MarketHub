<template>
  <div class="color-examples">
    <h2>MarketHub Color Usage Examples</h2>

    <!-- Primary Colors -->
    <div class="color-section">
      <h3>Primary Colors</h3>
      <div class="color-grid">
        <div class="color-card primary">Primary</div>
        <div class="color-card primary-light">Primary Light</div>
        <div class="color-card primary-dark">Primary Dark</div>
        <div class="color-card primary-lighter">Primary Lighter</div>
        <div class="color-card primary-darker">Primary Darker</div>
      </div>
    </div>

    <!-- Secondary Colors -->
    <div class="color-section">
      <h3>Secondary Colors</h3>
      <div class="color-grid">
        <div class="color-card secondary">Secondary</div>
        <div class="color-card secondary-light">Secondary Light</div>
        <div class="color-card secondary-dark">Secondary Dark</div>
        <div class="color-card secondary-lighter">Secondary Lighter</div>
        <div class="color-card secondary-darker">Secondary Darker</div>
      </div>
    </div>

    <!-- Accent Colors -->
    <div class="color-section">
      <h3>Accent Colors</h3>
      <div class="color-grid">
        <div class="color-card accent">Accent</div>
        <div class="color-card accent-light">Accent Light</div>
        <div class="color-card accent-dark">Accent Dark</div>
        <div class="color-card accent-lighter">Accent Lighter</div>
        <div class="color-card accent-darker">Accent Darker</div>
      </div>
    </div>

    <!-- Status Colors -->
    <div class="color-section">
      <h3>Status Colors</h3>
      <div class="color-grid">
        <div class="color-card success">Success</div>
        <div class="color-card warning">Warning</div>
        <div class="color-card error">Error</div>
        <div class="color-card info">Info</div>
      </div>
    </div>

    <!-- Button Examples -->
    <div class="color-section">
      <h3>Button Examples</h3>
      <div class="button-examples">
        <button class="btn btn-primary">Primary Button</button>
        <button class="btn btn-secondary">Secondary Button</button>
        <button class="btn btn-accent">Accent Button</button>
        <button class="btn btn-success">Success Button</button>
        <button class="btn btn-warning">Warning Button</button>
        <button class="btn btn-error">Error Button</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-examples {
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.color-section {
  margin-bottom: var(--spacing-2xl);
}

.color-section h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: 1.5rem;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.color-card {
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  color: var(--text-inverse);
  font-weight: 600;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease;
}

.color-card:hover {
  transform: translateY(-2px);
}

/* Color Card Backgrounds */
.color-card.primary {
  background-color: var(--primary);
}
.color-card.primary-light {
  background-color: var(--primary-light);
}
.color-card.primary-dark {
  background-color: var(--primary-dark);
}
.color-card.primary-lighter {
  background-color: var(--primary-lighter);
  color: var(--text-primary);
}
.color-card.primary-darker {
  background-color: var(--primary-darker);
}

.color-card.secondary {
  background-color: var(--secondary);
}
.color-card.secondary-light {
  background-color: var(--secondary-light);
}
.color-card.secondary-dark {
  background-color: var(--secondary-dark);
}
.color-card.secondary-lighter {
  background-color: var(--secondary-lighter);
  color: var(--text-primary);
}
.color-card.secondary-darker {
  background-color: var(--secondary-darker);
}

.color-card.accent {
  background-color: var(--accent);
}
.color-card.accent-light {
  background-color: var(--accent-light);
}
.color-card.accent-dark {
  background-color: var(--accent-dark);
}
.color-card.accent-lighter {
  background-color: var(--accent-lighter);
  color: var(--text-primary);
}
.color-card.accent-darker {
  background-color: var(--accent-darker);
}

.color-card.success {
  background-color: var(--success);
}
.color-card.warning {
  background-color: var(--warning);
}
.color-card.error {
  background-color: var(--error);
}
.color-card.info {
  background-color: var(--info);
}

/* Button Examples */
.button-examples {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn:active {
  transform: translateY(0);
}

.btn-primary {
  background-color: var(--primary);
  color: var(--text-inverse);
}

.btn-primary:hover {
  background-color: var(--primary-light);
}

.btn-secondary {
  background-color: var(--secondary);
  color: var(--text-inverse);
}

.btn-secondary:hover {
  background-color: var(--secondary-light);
}

.btn-accent {
  background-color: var(--accent);
  color: var(--text-inverse);
}

.btn-accent:hover {
  background-color: var(--accent-light);
}

.btn-success {
  background-color: var(--success);
  color: var(--text-inverse);
}

.btn-success:hover {
  background-color: var(--success-light);
  color: var(--text-primary);
}

.btn-warning {
  background-color: var(--warning);
  color: var(--text-inverse);
}

.btn-warning:hover {
  background-color: var(--warning-light);
  color: var(--text-primary);
}

.btn-error {
  background-color: var(--error);
  color: var(--text-inverse);
}

.btn-error:hover {
  background-color: var(--error-light);
  color: var(--text-primary);
}
</style>
