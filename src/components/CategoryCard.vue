<script setup>
const props = defineProps(["category"]);
</script>

<template>
    <div class="p-2 text-center group">
        <img :src="category.img" alt="category image" class="w-24 h-24 mx-auto rounded-full bg-gray-50">
        <p class="relative mx-auto mt-2 font-bold w-fit hover:cursor-pointer category-text">{{ category.name }}</p>
    </div>
</template>

<style scoped>
.category-text::after {
    content: "";
    @apply absolute bottom-0 -left-1/2 translate-x-1/2 w-0 h-[2px] bg-dark transition-all duration-300 ease-in-out group-hover:w-full;
}
</style>