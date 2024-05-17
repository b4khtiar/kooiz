<script setup>
import { ref } from "vue";

const props = defineProps(["categories"]);
const emit = defineEmits(["selectCategory"]);
const selectCategory = (category) => {
	emit("selectCategory", category);
};
</script>

<template>
    <div class="fixed top-0 left-0 z-50 w-full h-screen p-6 bg-stone-900/85 backdrop:blur">
        <div class="flex justify-center h-full align-middle">
            <div class="w-full max-w-md px-4 py-8 overflow-y-scroll shadow-lg rounded-xl bg-light">
                <h4 class="mb-3 text-xl font-bold text-center">Select Category</h4>
                <div class="space-y-2">
                    <div v-for="category in categories" :key="category.id">
                        <div @click="selectCategory(category)"
                            class="flex items-center p-4 pr-6 mx-auto border border-b-4 border-r-4 rounded-lg bg-primary border-amber-700/60 hover:cursor-pointer">
                            <span>{{ category.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>