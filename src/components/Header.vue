<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
    <nav class="absolute top-4 z-10 left-[50%] -translate-x-[50%] bg-tertiary rounded-full">
        <h1 @click="router.push({ name: 'home' })" class="px-16 py-4 text-5xl text-center text-white">KOOiZ</h1>
    </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');

h1 {
    font-family: 'Poiret One', sans-serif;
}
</style> 
