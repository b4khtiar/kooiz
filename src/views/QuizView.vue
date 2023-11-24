<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const page = ref(1);
const currentSelected = ref('');
const questions = ref([]);
const answers = ref([])
const score = ref(0);

const nextQuestion = () => {
    if (page.value < questions.value.length) {
        answers.value[page.value - 1] = currentSelected.value;
        page.value++;
        currentSelected.value = '';
        console.log(answers.value)
    }
    if (page.value === questions.value.length) {
        answers.value[page.value - 1] = currentSelected.value;
        scoring()
    }
}
const scoring = () => {
    score.value = 0
    for (let i = 0; i < answers.value.length; i++) {
        if (answers.value[i] === questions.value[i].correct_answer) {
            score.value += 10
        }
    }
    console.log(score.value)
    // router.push({ name: 'result', params: { score: score.value } })
    return

}
const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

onMounted(() => {
    if (!route.params.difficulty && !route.params.category) {
        fetch(`https://opentdb.com/api.php?amount=10&type=boolean`)
            .then(res => res.json())
            .then(data => {
                questions.value = data.results;
                loading.value = false;
            })
    }
    if (route.params.category && !route.params.difficulty) {
        fetch(`https://opentdb.com/api.php?amount=10&category=${route.params.category}&type=boolean`)
            .then(res => res.json())
            .then(data => {
                questions.value = data.results;
                loading.value = false;
            })
        console.log('difficulty kosong')
    }
    if (route.params.difficulty && !route.params.category) {
        fetch(`https://opentdb.com/api.php?amount=10&difficulty=${route.params.difficulty}&type=boolean`)
            .then(res => res.json())
            .then(data => {
                questions.value = data.results;
                loading.value = false;
            })
        console.log('category kosong')
    }
    if (route.params.difficulty && route.params.category) {
        fetch(`https://opentdb.com/api.php?amount=10&category=${route.params.category}&difficulty=${route.params.difficulty}&type=boolean`)
            .then(res => res.json())
            .then(data => {
                questions.value = data.results;
                loading.value = false;
            })
    }
})
</script>
<template>
    <div v-for="(q, index) in questions" key="index" v-show="!loading && page === index + 1"
        class="w-full pt-24 px-2 md:px-0">
        <div class="w-full max-w-xl mx-auto my-12 md:my-6 rounded-lg border border-b-4 border-r-4 border-gray-400">
            <div class="flex justify-between text-stone-500 px-4 pt-2">
                <div class="text-sm"><span class="hidden md:inline">Question</span> {{ page }}</div>
                <div class="text-sm">{{ q.category }}</div>
            </div>
            <div class="h-72 md:h-52 flex justify-center align-middle">
                <p class="text-xl text-center font-medium px-4 my-auto tracking-wide leading-relaxed">
                    {{ decodeHtml(q.question) }}
                </p>
            </div>
        </div>

        <div v-if="q.type === 'boolean'" class="flex gap-4 justify-center w-full px-8 text-gray-600">
            <div @click="currentSelected = 'true'"
                class="flex gap-2 px-6 py-3 rounded-lg border border-b-4 border-r-4 border-gray-400 text-xl group">
                <span>TRUE</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
            </div>
            <div @click="currentSelected = 'false'"
                class="flex gap-2 px-6 py-3 rounded-lg border border-b-4 border-r-4 border-gray-400 text-xl group">
                <span>FALSE</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
            </div>
        </div>
    </div>
    <div class="w-full mt-12 md:mt-4">

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div class="flex gap-10 px-8 ">
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
    <div v-if="loading" class="absolute top-0 left-0 z-50 w-full h-screen flex justify-center align-middle">
        <div class="my-auto animate-spin">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </div>
    </div>
</template>

<style scoped></style>
