<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Question from '../components/Question.vue';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const page = ref(1);
const questions = ref([]);
const answers = ref([])
const score = ref(0);

const nextQuestion = (answer) => {
    if (page.value < questions.value.length) {
        answers.value[page.value - 1] = answer;
        page.value++;
        return
    }
    if (page.value === questions.value.length) {
        answers.value[page.value - 1] = answer;
        return scoring()
    }
}
const scoring = () => {
    score.value = 0
    for (let i = 0; i < answers.value.length; i++) {
        if (answers.value[i] === questions.value[i].correct_answer) {
            score.value += 10
        }
    }
    router.push({ name: 'results', params: { score: score.value, category: route.params.category, difficulty: route.params.difficulty } })

}
const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

onMounted(() => {
    fetchData()
})

const fetchData = async () => {
    if (!route.params.difficulty && !route.params.category) {
        try {
            fetch(`https://opentdb.com/api.php?amount=10&type=boolean`)
                .then(res => res.json())
                .then(data => {
                    questions.value = data.results;
                    loading.value = false;
                })
        } catch (error) {
            console.log(error)
        }
    }
    if (route.params.category && !route.params.difficulty) {
        try {
            fetch(`https://opentdb.com/api.php?amount=10&category=${route.params.category}&type=boolean`)
                .then(res => res.json())
                .then(data => {
                    questions.value = data.results;
                    loading.value = false;
                })
            console.log('difficulty kosong')
        } catch (error) {
            console.log(error)
        }
    }
    if (route.params.difficulty && !route.params.category) {
        try {
            fetch(`https://opentdb.com/api.php?amount=10&difficulty=${route.params.difficulty}&type=boolean`)
                .then(res => res.json())
                .then(data => {
                    questions.value = data.results;
                    loading.value = false;
                })
            console.log('category kosong')
        } catch (error) {
            console.log(error)
        }
    }
    if (route.params.difficulty && route.params.category) {
        try {
            fetch(`https://opentdb.com/api.php?amount=10&category=${route.params.category}&difficulty=${route.params.difficulty}&type=boolean`)
                .then(res => res.json())
                .then(data => {
                    questions.value = data.results;
                    loading.value = false;
                })
        } catch (error) {
            console.log(error)
        }
    }
}

const goHome = () => {
    router.push({ name: 'home' })
}
</script>
<template>
    <div v-show="!loading">
        <TransitionGroup name="fade">
            <Question v-for="(q, index) in questions" :key="index" v-show="page === index + 1" :question-data="q"
                :page="page" @answer="nextQuestion" />
        </TransitionGroup>
    </div>

    <div class="w-full mt-12 md:mt-4">
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div class="flex gap-10 px-8 ">
                <div @click="goHome" class="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </div>
                <div @click="nextQuestion('Skipped')" class="text-gray-500 text-xl flex gap-2">
                    Skip
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

<style scoped>
.fade-enter-active {
    transition: opacity 0.5s ease-in-out;
    animation-delay: 300ms;
}

.fade-leave-active {
    transition: opacity 300ms ease-in;
    position: absolute;
    top: 100%;
    left: 0;
}

.fade-enter-from,
.fade-leave-to {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    position: relative;
    opacity: 1;
}
</style>
