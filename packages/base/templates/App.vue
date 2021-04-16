<template>
  <h1>Hello, World!</h1>
  <h2>Count: {{ count }}</h2>
  <button @click="onClick">Click me!</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)

    const onClick = () => {
      count.value++
    }

    return {
      count,
      onClick,
    }
  },
})
</script>
