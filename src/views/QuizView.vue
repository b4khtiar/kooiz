<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Question from "@/components/Question.vue";
import Loading from "@/components/Loading.vue";

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const showAlert = ref(false);
const page = ref(1);
const questions = ref([]);
const score = ref(0);

const addScore = (val) => {
	score.value += val;
};
const nextQuestion = (answer) => {
	if (page.value < questions.value.length) {
		page.value++;
		return;
	}
	if (page.value === questions.value.length) {
		loading.value = true;
		router.push({
			name: "results",
			params: {
				score: score.value,
				category: route.params.category,
				difficulty: route.params.difficulty,
			},
		});
	}
};
onMounted(() => {
	if (questions.value.length > 0) {
		return;
	}
	fetchData();
});
const fetchURL = computed(() => {
	if (!route.params.difficulty && !route.params.category) {
		return "https://opentdb.com/api.php?amount=10";
	}
	if (route.params.category && !route.params.difficulty) {
		return `https://opentdb.com/api.php?amount=10&category=${route.params.category}`;
	}
	if (route.params.difficulty && !route.params.category) {
		return `https://opentdb.com/api.php?amount=10&difficulty=${route.params.difficulty}`;
	}
	if (route.params.category && route.params.difficulty) {
		return `https://opentdb.com/api.php?amount=10&category=${route.params.category}&difficulty=${route.params.difficulty}`;
	}
});
const fetchData = async () => {
	const URL = fetchURL.value;
	try {
		fetch(URL)
			.then((res) => res.json())
			.then((data) => {
				if (data.response_code === 1) {
					loading.value = false;
					showAlert.value = true;
					return;
				}
				questions.value = data.results;
				loading.value = false;
			});
	} catch (error) {
		showAlert.value = true;
	}
};

const goHome = () => {
	router.push({ name: "home" });
};
</script>
<template>
    <div v-show="!loading">
        <TransitionGroup name="fade">
            <Question v-for="(q, index) in questions" :key="index" v-show="page === index + 1" :question-data="q"
                :page="index + 1" @answer="addScore" @next-page="nextQuestion" />
        </TransitionGroup>
    </div>
    <div v-if="showAlert" class="w-full p-6 mt-32">
        <div
            class="w-full max-w-md px-8 py-4 mx-auto text-center bg-white border border-b-4 border-r-4 border-gray-400 rounded-lg">
            <figure class="w-[180px] h-[180px] mx-auto">
                <img src="/assets/avatar-thinking.png" alt="">
            </figure>
            <h1 class="text-3xl font-light">Sorry,</h1>
            <p class="text-gray-600">The quiz you requested are currently not available.</p>
            <p @click="goHome"
                class="px-4 py-2 mt-4 font-medium text-white border border-b-4 border-r-4 border-red-700 rounded-lg bg-tertiary hover:cursor-pointer">
                Try another option
            </p>
        </div>
    </div>

    <div v-show="!loading && questions.length !== 0" class="w-full mt-32 md:mt-24">
        <div class="flex justify-center px-8 ">
            <div @click="goHome" class="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </div>
            <!-- <div class="flex gap-2 text-xl text-gray-400">
                Skip
            </div> -->
        </div>
    </div>

    <div class="flex justify-center gap-6 px-4 py-6 mt-10">
        <span>
            🚀 novabyte.dev
        </span>
        <span @click="showAbout" class="underline hover:cursor-pointer">
            About
        </span>
    </div>

    <Loading v-if="loading" />
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
