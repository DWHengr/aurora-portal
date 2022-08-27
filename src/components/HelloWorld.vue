<template>
  <h1 class="text-purple-500 text-4xl my-5">{{ msg }}</h1>


  <button class="my-5 py-2 px-4 font-semibold rounded-lg shadow-md bg-purple-500 hover:bg-purple-700 text-white"
    @click="state.count++">
    count is: {{ state.count }}
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style scoped>
</style>
