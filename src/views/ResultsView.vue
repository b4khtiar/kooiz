<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const score = ref(route.params.score)
const category = ref(route.params.category)
const difficulty = ref(route.params.difficulty)
const greeting = computed(() => {
    if (score.value >= 70) {
        return 'Well Done !'
    } else if (score.value >= 40) {
        return 'Not Bad !'
    } else if (score.value >= 10) {
        return 'Try Harder !'
    } else {
        return 'You Can Always Retry !'
    }
})
const goHome = () => {
    router.push({ name: 'home' })
}
if (!route.params.category) {
    category.value = 'random'
}
if (!route.params.difficulty) {
    difficulty.value = 'any'
}
const handleShare = async () => {
    try {
        await navigator.share({
            title: 'Check out Kooiz - Fun Trivia Quiz Game',
            url: window.location.href
        });
        console.log("Data was shared successfully");
    } catch (err) {
        console.error("Share failed:", err.message);
    }
}
</script>
<template>
    <div class="flex flex-col items-center pt-32">
        <h1 class="text-4xl text-gray-600 font-bold">{{ greeting }}</h1>
        <h1 class="text-3xl">Your Score</h1>
        <figure class="w-[180px] h-[180px]">
            <img v-if="score >= 70" src="/assets/medal.png" alt="medal">
            <img v-else-if="score >= 40" src="/assets/flag.png" alt="flag">
            <img v-else-if="score >= 10" src="/assets/worker.png" alt="work">
            <img v-else src="/assets/retry.png" alt="retry">
        </figure>
        <h1 class="text-5xl text-gray-800 font-semibold">{{ score }}</h1>
        <h1 class="text-center font bold mt-4 px-6">You can answer {{ score }}% questions in {{ category }} category with
            {{ difficulty }} difficulty.</h1>

        <div class="px-4 my-4">
            <div @click="handleShare"
                class="w-fit flex gap-4 bg-tertiary text-light font-medium rounded-lg px-6 py-4 border border-b-4 border-r-4 border-rose-700 hover:cursor-pointer">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd"
                            d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
                <span class="text-lg font-semibold">Share the fun !</span>
            </div>
            <div class="mt-4  py-3 lg:mt-2 lg:py-2 text-center">
                <span>or </span>
                <span @click="goHome" class="underline hover:text-tertiary hover:cursor-pointer">take another quiz.</span>
            </div>
        </div>

        <div class="mt-10 px-4 py-6 text-center">
            🚀 novabyte.dev
        </div>
    </div>
</template>