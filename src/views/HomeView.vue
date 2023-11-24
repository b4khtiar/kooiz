<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTriviaStore } from '../stores/trivia.js';

const router = useRouter();
const store = useTriviaStore();
const categories = store.categories;
const showCategory = ref(false);
const showDifficulty = ref(false);
const categoryPicked = ref('');
const difficultyPicked = ref('');
const startQuiz = () => {
  router.push({ name: 'quiz', params: { category: categoryPicked.value.id, difficulty: difficultyPicked.value } });
}
const showAbout = () => {
  router.push({ name: 'about' });
}
</script>

<template>
  <main>
    <div class="mt-[116px] p-4">
      <h1 class="text-4xl">Hi, Welcome to Kooiz!</h1>
      <p class="text-gray-600 mt-2">
        The ultimate trivia experience! Challenge yourself with a myriad of intriguing questions and
        explore fascinating facts. Get ready to laugh, learn, and let the good times roll!
      </p>
    </div>
    <div class="flex justify-between align-middle mt-4 px-4">
      <div class="py-2">
        <h3 class="text-xl text-gray-600 font-bold tracking-wide">SET YOUR PREFERENCES</h3>
      </div>
      <div class="p-2 rounded-xl hover:bg-tertiary hover:text-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    </div>

    <div class="relative px-4">
      <div @click="showCategory = !showCategory"
        class="flex justify-between bg-gray-100 rounded-lg p-4 border border-b-4 border-r-4 border-gray-400 hover:cursor-pointer">
        <span>{{ categoryPicked ? categoryPicked.name : 'Select Category' }}</span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>

        </span>
      </div>
      <ul class="absolute top-16 left-0 z-10 w-full max-w-sm px-4">
        <div v-if="showCategory" class="h-80 rounded-lg border overflow-y-scroll">
          <li v-for="category in categories" @click="categoryPicked = category, showCategory = false"
            class="p-4 bg-gray-100 hover:bg-gray-300">{{ category.name }}</li>
        </div>
      </ul>
    </div>

    <div class="relative px-4 mt-4">
      <div @click="showDifficulty = !showDifficulty"
        class="flex justify-between bg-gray-100 rounded-lg p-4 border border-b-4 border-r-4 border-gray-400 hover:cursor-pointer">
        <span>{{ difficultyPicked ? difficultyPicked : 'Select Difficulty' }}</span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </div>
      <ul class="absolute top-16 left-0 z-[8] w-full max-w-sm px-4">
        <div v-if="showDifficulty" class=" rounded-lg border">
          <li @click="difficultyPicked = 'easy', showDifficulty = false" class="p-4 bg-gray-100 hover:bg-gray-300">Easy
          </li>
          <li @click="difficultyPicked = 'medium', showDifficulty = false" class="p-4 bg-gray-100 hover:bg-gray-300">
            Medium
          </li>
          <li @click="difficultyPicked = 'hard', showDifficulty = false" class="p-4 bg-gray-100 hover:bg-gray-300">Hard
          </li>
        </div>
      </ul>
    </div>

    <div class="px-4 my-4">
      <div @click="startQuiz()"
        class="w-fit flex gap-2 bg-tertiary text-light font-medium rounded-lg p-4 border border-b-4 border-r-4 border-rose-700 hover:cursor-pointer">
        <span>Start Quiz</span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        </span>
      </div>

      <div class="flex justify-center gap-6 mt-10 px-4 py-6">
        <span>
          🚀 novabyte.dev
        </span>
        <span @click="showAbout">
          About
        </span>
      </div>
    </div>
  </main>
</template>
