<script setup>
const props = defineProps(["category"]);
</script>

<template>
    <div class="p-2 text-center">
        <img :src="category.img" alt="category image" class="w-24 h-24 mx-auto rounded-full bg-gray-50">
        <p class="mt-2 font-bold">{{ category.name }}</p>
    </div>
</template>