<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Question from '../components/Question.vue';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const showAlert = ref(false);
const page = ref(1);
const questions = ref([]);
const score = ref(0);

const addScore = (val) => {
    score.value += val
}
const nextQuestion = (answer) => {
    if (page.value < questions.value.length) {
        page.value++;
        return
    }
    if (page.value === questions.value.length) {
        loading.value = true
        router.push({ name: 'results', params: { score: score.value, category: route.params.category, difficulty: route.params.difficulty } })
    }
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
            fetch(`https://opentdb.com/api.php?amount=10`)
                .then(res => res.json())
                .then(data => {
                    if (data.response_code === 1) {
                        loading.value = false
                        showAlert.value = true
                        return
                    }
                    questions.value = data.results;
                    loading.value = false;
                })
        } catch (error) {
            console.log(error)
        }
    }
    if (route.params.category && !route.params.difficulty) {
        try {
            fetch(`https://opentdb.com/api.php?amount=10&category=${route.params.category}`)
                .then(res => res.json())
                .then(data => {
                    if (data.response_code === 1) {
                        loading.value = false
                        showAlert.value = true
                        return
                    }
                    questions.value = data.results;
                    loading.value = false;
                })
        } catch (error) {
            console.log(error)
        }
    }
    if (route.params.difficulty && !route.params.category) {
        try {
            fetch(`https://opentdb.com/api.php?amount=10&difficulty=${route.params.difficulty}`)
                .then(res => res.json())
                .then(data => {
                    if (data.response_code === 1) {
                        loading.value = false
                        showAlert.value = true
                        return
                    }
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
            fetch(`https://opentdb.com/api.php?amount=10&category=${route.params.category}&difficulty=${route.params.difficulty}`)
                .then(res => res.json())
                .then(data => {
                    if (data.response_code === 1) {
                        loading.value = false
                        showAlert.value = true
                        return
                    }
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
                :page="index + 1" @answer="addScore" @next-page="nextQuestion" />
        </TransitionGroup>
    </div>

    <div v-if="showAlert" class="w-full mt-32 p-6">
        <div
            class="w-full max-w-md mx-auto px-8 py-4 bg-white text-center rounded-lg border border-b-4 border-r-4 border-gray-400">
            <figure class="w-[180px] h-[180px] mx-auto">
                <img src="/assets/avatar-thinking.png" alt="">
            </figure>
            <h1 class="text-3xl font-light">Sorry,</h1>
            <p class="text-gray-600">The quiz you requested are currently not available.</p>
            <p @click="goHome"
                class="mt-4 px-4 py-2 text-white font-medium bg-tertiary rounded-lg border border-b-4 border-r-4 border-red-700 hover:cursor-pointer">
                Try another option
            </p>
        </div>
    </div>

    <div v-show="!loading && questions.length !== 0" class="w-full mt-32 md:mt-24">
        <div class="flex justify-between px-8 ">
            <div @click="goHome" class="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </div>
            <div class="text-gray-400 text-xl flex gap-2">
                Skip
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
