<script setup>
import { ref, computed, onMounted } from "vue";
const props = defineProps(["questionData", "page"]);
const emit = defineEmits(["answer", "nextPage"]);
const page = ref(1);
const options = ref([]);
const randomizeAnswers = () => {
	const answerOptions = props.questionData.incorrect_answers;
	answerOptions.push(props.questionData.correct_answer);
	options.value = answerOptions.sort(() => Math.random() - 0.5);
};

const decodeHtml = (html) => {
	const txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
};
const selectedAnswer = ref("");
const isCorrect = computed(() => {
	if (selectedAnswer.value === props.questionData.correct_answer) {
		return true;
	}
	return false;
});
const selectAnswer = (answer) => {
	selectedAnswer.value = answer;
	emit("answer", isCorrect.value === true ? 10 : 0);
};
const nextPage = () => {
	emit("nextPage");
};
onMounted(() => {
	randomizeAnswers();
	selectedAnswer.value = "";
	page.value = props.page;
});
</script>
<template>
    <div class="w-full px-2 pt-24 md:px-0">
        <div class="w-full max-w-xl mx-auto my-12 border-0 border-gray-400 rounded-lg md:my-6">
            <div class="flex flex-col px-4 pt-2 text-sm md:justify-between md:flex-row text-stone-500">
                <div class="text-center"><span class="hidden md:inline">Question</span> {{ page }}/10</div>
                <div class="text-center">{{ decodeHtml(questionData.category) }}</div>
            </div>
            <div class="flex justify-center py-5 align-middle min-h-64 md:py-24">
                <div class="px-4 my-auto text-xl font-medium leading-relaxed tracking-wide text-center">
                    <span v-if="!selectedAnswer">{{ decodeHtml(questionData.question) }}</span>
                <div v-if="selectedAnswer && isCorrect === true" class="flex gap-2 text-3xl text-secondary blink-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-9 h-9">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>

                    <span>Correct</span>
                </div>
                <div v-if="selectedAnswer && isCorrect === false">
                    <div class="flex justify-center gap-2 text-3xl text-tertiary blink-1">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-9 h-9">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <span>incorrect</span>
                    </div>
                    <div class="mt-4 text-base">
                        <p>The correct answer was: {{ questionData.correct_answer }}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div class="w-full max-w-xl min-h-[114px] mx-auto text-gray-600">
            <div v-if="questionData.type === 'boolean' && !selectedAnswer" class="flex justify-center gap-6 ">
                <div @click="selectAnswer('True')"
                    class="px-6 py-3 text-xl border border-b-4 border-r-4 border-gray-400 rounded-lg group hover:text-gray-800 hover:border-gray-800 hover:cursor-pointer active:border-gray-800 active:bg-gray-300">
                    <span>TRUE</span>
                </div>
                <div @click="selectAnswer('False')"
                    class="px-6 py-3 text-xl border border-b-4 border-r-4 border-gray-400 rounded-lg group hover:cursor-pointer hover:text-gray-800 hover:border-gray-800 active:border-gray-800 active:bg-gray-300">
                    <span>FALSE</span>
                </div>
            </div>
            <div v-if="questionData.type === 'multiple' && !selectedAnswer"
                class="grid justify-center grid-cols-1 gap-2 md:grid-cols-2">
                <div v-for="answer, index in options" :key="index" @click="selectAnswer(answer)"
                    class="px-3 py-3 border border-b-4 border-r-4 border-gray-400 rounded-lg group hover:cursor-pointer hover:text-gray-800 hover:border-gray-800 active:border-gray-800 active:bg-gray-300">
                    <span>{{ decodeHtml(answer) }}</span>
                </div>
            </div>
            <div v-if="selectedAnswer" @click="nextPage"
                class="flex gap-2 px-6 py-3 mx-auto text-xl border border-b-4 border-r-4 border-gray-400 rounded-lg w-fit group hover:text-gray-800 hover:border-gray-800 active:border-gray-800 hover:cursor-pointer active:bg-gray-300">
                <span>{{ page === 10 ? 'Finish' : 'Next Question' }}</span>
                <span v-show="page < 10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.blink-1 {
    -webkit-animation: blink-1 0.6s both;
    animation: blink-1 0.6s both;
}

/* ----------------------------------------------
 * Generated by Animista on 2023-11-25 12:16:35
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation blink-1
 * ----------------------------------------
 */
@-webkit-keyframes blink-1 {

    0%,
    50%,
    100% {
        opacity: 1;
    }

    25%,
    75% {
        opacity: 0;
    }
}

@keyframes blink-1 {

    0%,
    50%,
    100% {
        opacity: 1;
    }

    25%,
    75% {
        opacity: 0;
    }
}
</style>