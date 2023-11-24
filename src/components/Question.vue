<script setup>
const props = defineProps(['questionData', 'page'])
const emit = defineEmits(['answer'])
const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const selectAnswer = (answer) => {
    emit('answer', answer)
}
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
                    {{ decodeHtml(questionData.question) }}
                </p>
            </div>
        </div>

        <div v-if="questionData.type === 'boolean'" class="flex gap-4 justify-center w-full px-8 text-gray-600">
            <div @click="selectAnswer('True')"
                class="flex gap-2 px-6 py-3 rounded-lg border border-b-4 border-r-4 border-gray-400 text-xl group hover:text-gray-800 hover:border-gray-800 active:border-gray-800 active:bg-gray-300">
                <span>TRUE</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
            </div>
            <div @click="selectAnswer('False')"
                class="flex gap-2 px-6 py-3 rounded-lg border border-b-4 border-r-4 border-gray-400 text-xl group hover:text-gray-800 hover:border-gray-800 active:border-gray-800 active:bg-gray-300">
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
</template>