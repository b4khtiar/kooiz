<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Header.vue'

</script>

<template>
  <Navbar />
  <div class="container max-w-screen-md mx-auto">
    <RouterView />
  </div>
</template>

