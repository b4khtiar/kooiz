<script setup>
import { ref, computed, onMounted } from 'vue'
const props = defineProps(['questionData', 'page'])
const emit = defineEmits(['answer', 'nextPage'])
const page = ref(props.page)
const randomizeAnswers = computed(() => {
    let answerOptions = props.questionData.incorrect_answers
    answerOptions.push(props.questionData.correct_answer)
    return answerOptions.sort(() => Math.random() - 0.5)
})

const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
const selectedAnswer = ref('')
const isCorrect = computed(() => {
    if (selectedAnswer.value === props.questionData.correct_answer) {
        return true
    }
    return false
})
const selectAnswer = (answer) => {
    selectedAnswer.value = answer
    emit('answer', isCorrect.value === true ? 10 : 0)
}
const nextPage = () => {
    emit('nextPage')
}
onMounted(() => {
    selectedAnswer.value = ''
})
</script>
<template>
    <div class="w-full pt-24 px-2 md:px-0">
        <div class="w-full max-w-xl mx-auto my-12 md:my-6 rounded-lg border border-b-4 border-r-4 border-gray-400">
            <div class="flex justify-between text-stone-500 px-4 pt-2">
                <div class="text-sm"><span class="hidden md:inline">Question</span> {{ page }}</div>
                <div class="text-sm">{{ decodeHtml(questionData.category) }}</div>
            </div>
            <div class="h-72 md:h-52 flex justify-center align-middle">
                <p class="text-xl text-center font-medium px-4 my-auto tracking-wide leading-relaxed">
                    <span v-if="!selectedAnswer">{{ decodeHtml(questionData.question) }}</span>
                <div v-if="selectedAnswer && isCorrect === true" class="flex gap-3 text-secondary text-3xl blink-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-9 h-9">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>

                    <span>Correct</span>
                </div>
                <div v-if="selectedAnswer && isCorrect === false" class="flex gap-3 text-tertiary text-3xl blink-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-9 h-9">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>

                    <span>Incorrect</span>
                </div>
                </p>
            </div>
        </div>

        <div class="w-full max-w-xl min-h-[114px] mx-auto text-gray-600">
            <div v-if="questionData.type === 'boolean' && !selectedAnswer" class="flex gap-6 justify-center ">
                <div @click="selectAnswer('True')"
                    class="px-6 py-3 rounded-lg border border-b-4 border-r-4 border-gray-400 text-xl group hover:text-gray-800 hover:border-gray-800 active:border-gray-800 active:bg-gray-300">
                    <span>TRUE</span>
                </div>
                <div @click="selectAnswer('False')"
                    class="px-6 py-3 rounded-lg border border-b-4 border-r-4 border-gray-400 text-xl group hover:text-gray-800 hover:border-gray-800 active:border-gray-800 active:bg-gray-300">
                    <span>FALSE</span>
                </div>
            </div>
            <div v-if="questionData.type === 'multiple' && !selectedAnswer" class="grid grid-cols-2 gap-2 justify-center">
                <div v-for="answer, index in randomizeAnswers" :key="index" @click="selectAnswer(answer)"
                    class="px-3 py-3 rounded-lg border border-b-4 border-r-4 border-gray-400 group hover:text-gray-800 hover:border-gray-800 active:border-gray-800 active:bg-gray-300">
                    <span>{{ decodeHtml(answer) }}</span>
                </div>
            </div>
            <div v-if="selectedAnswer" @click="nextPage"
                class="w-fit mx-auto flex gap-2 px-6 py-3 rounded-lg border border-b-4 border-r-4 border-gray-400 text-xl group hover:text-gray-800 hover:border-gray-800 active:border-gray-800 active:bg-gray-300">
                <span>{{ page === 10 ? 'Finish' : 'Next Question' }}</span>
                <span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </span>
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