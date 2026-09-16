<template>
  <base-card class="error_card">
    <p class="form_subtitle text-body-sm">{{ errorMessage }}</p>
  </base-card>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.form_subtitle {
  color: var(--error);
}

.error_card {
  background-color: var(--error-light) !important;
  border: 1px solid var(--error);
  border-radius: var(--radius-md);
  padding: 0.5rem !important;
  margin: 0.5rem 0;
}
</style>
