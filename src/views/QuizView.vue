<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(true);
const page = ref(1);
const currentSelected = ref('');
const questions = ref([]);
const answers = ref([])

const nextQuestion = () => {
    if (page.value < questions.value.length) {
        answers.value[page.value - 1] = currentSelected.value;
        page.value++;
        currentSelected.value = '';
        console.log(answers.value)
    }
    if (page.value === questions.value.length) {
        console.log(answers.value)
    }
    page.value++;
}
onMounted(() => {
    fetch(`https://opentdb.com/api.php?amount=10&category=27&difficulty=${route.params.difficulty}&type=boolean`)
        .then(res => res.json())
        .then(data => {
            questions.value = data.results;
            loading.value = false;
        })
})
</script>
<template>
    <div v-for="(q, index) in questions" key="index" v-show="!loading && page === index + 1"
        class="absolute top-0 left-0 z-2 w-full min-h-[58vh] pt-24 rounded-b-[72px] bg-primary">
        <div class="absolute bottom-8 w-full px-12 py-8 md:px-16 ml-[50%] -translate-x-[50%] max-w-screen-md">
            <h1 class="text-5xl text-center">Q{{ page }}.</h1>
            <p class="text-xl text-center font-medium mt-4 ">
                {{ q.question }}
            </p>
        </div>
    </div>
    <div class="relative h-screen w-full">
        <div class="w-full h-[60vh] flex justify-center">
            <div v-if="loading" class="my-auto animate-spin">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </div>
        </div>
        <div class="flex gap-4 justify-center w-full px-8">
            <div @click="currentSelected = 'true'"
                class="flex gap-2 px-6 py-3 rounded-2xl border border-gray-600 text-2xl group bg-secondary text-white">
                <span>TRUE</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
            </div>
            <div @click="currentSelected = 'false'"
                class="flex gap-2 px-6 py-3 rounded-2xl border border-gray-600 text-2xl group">
                <span>FALSE</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
            </div>
        </div>

        <div class="absolute bottom-24 w-full">
            <div class="flex justify-between px-8 ">
                <div class="text-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </div>
                <div @click="nextQuestion" class="text-dark text-2xl flex gap-2">
                    Next
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
