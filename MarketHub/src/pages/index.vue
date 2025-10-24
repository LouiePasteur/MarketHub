<template>
  <div class="application">
    <div class="backdrop"></div>
    <div class="container">
      <img src="/get-started.png" alt="Get Started" class="image" />
      <div class="content">
        <h1>Market Hub</h1>
        <p>Your trusted marketplace for all your shopping needs</p>
        <base-button :classes="'button-primary'" :isLink="true" :endpoint="'/login'"
          >Get Started</base-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
h1,
p {
  color: #fff;
}
p {
  font-family: var(--font-secondary);
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: var(--spacing-2xl);
}
h1 {
  font-family: var(--font-primary);
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.application {
  width: 100%;
  position: relative;
}
.backdrop {
  background-color: var(--primary);
  min-height: 80vh;
}

.container {
  top: 30%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
}

.content {
  padding-top: 2rem;
}
</style>
