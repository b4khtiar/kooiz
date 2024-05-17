<script setup>
import { ref, computed } from "vue";

const props = defineProps(["category"]);
const emit = defineEmits(["selectDifficulty", "start", "close"]);
const difficulties = ["easy", "medium", "hard"];
const selectedDifficulty = ref("medium");
const stars = computed(() => {
	if (selectedDifficulty.value === "easy") {
		return 1;
	}
	if (selectedDifficulty.value === "medium") {
		return 2;
	}
	if (selectedDifficulty.value === "hard") {
		return 3;
	}
});
const selectDifficulty = (difficulty) => {
	selectedDifficulty.value = difficulty;
	emit("selectDifficulty", selectedDifficulty);
};
</script>

<template>
    <div class="fixed top-0 left-0 z-50 w-full h-screen p-6 bg-stone-900/85 backdrop:blur">
        <div class="flex justify-center h-full align-middle">
            <div class="w-full max-w-md px-4 py-8 my-auto shadow-lg rounded-xl bg-light">
                <h1 class="text-2xl font-bold text-center">{{ category }}</h1>
                <h4 class="text-lg text-center">Select Difficulty</h4>
                <div class="flex justify-center gap-1 py-6">
                    <span v-for="n in stars" :key="n" class="text-primary">
                        <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            color="currentColor" stroke-width="1.6">
                            <path
                                d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
                                fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                        </svg>
                    </span>
                </div>
                <div class="flex justify-center gap-6 pb-6">
                    <button v-for="difficulty in difficulties" :key="difficulty" @click="selectDifficulty(difficulty)"
                        :class="{ 'font-[800] text-tertiary': difficulty === selectedDifficulty }" class="text-xl ">{{ difficulty
                        }}</button>
                </div>

                <div class="flex justify-center gap-2 pt-2">
                    <button @click="emit('start')"
                        class="px-4 py-2 font-medium text-white border border-b-4 border-r-4 border-red-700 rounded-lg bg-tertiary hover:cursor-pointer">Start
                        Quiz
                    </button>
                    <button @click="emit('close')"
                        class="px-4 py-2 font-medium border border-b-4 border-r-4 rounded-lg border-stone-500 bg-light hover:cursor-pointer">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>