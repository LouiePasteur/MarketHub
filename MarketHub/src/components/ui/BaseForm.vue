<template>
  <base-card>
    <form @submit.prevent="onSubmit">
      <slot></slot>
    </form>
  </base-card>
</template>

<script>
export default {
  emits: ['submit'],
  methods: {
    onSubmit(event) {
      this.$emit('submit', event)
    },
  },
}
</script>

