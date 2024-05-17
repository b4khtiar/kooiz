<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTriviaStore } from "@/stores/trivia.js";
import CategoryCard from "@/components/CategoryCard.vue";
import DifficultySelect from "@/components/DifficultySelect.vue";
import CategorySelect from "@/components/CategorySelect.vue";

const router = useRouter();
const store = useTriviaStore();
const categories = store.categories;
const showCategory = ref(false);
const showDifficulty = ref(false);
const categoryPicked = ref("");
const difficultyPicked = ref("medium");

const selectCategory = (category) => {
	categoryPicked.value = category;
	showCategory.value = false;
	showDifficulty.value = true;
};
const startQuiz = () => {
	router.push({
		name: "quiz",
		params: {
			category: categoryPicked.value.id,
			difficulty: difficultyPicked.value,
		},
	});
	categoryPicked.value = "";
};
const showAbout = () => {
	router.push({ name: "about" });
};
</script>

<template>
  <DifficultySelect v-if="showDifficulty" :category="categoryPicked.name" @select="difficultyPicked = $event" 
  @start="startQuiz" @close="showDifficulty = false; categoryPicked = ''" />
  <CategorySelect v-if="showCategory" :categories="categories" @selectCategory="selectCategory"/>
  <main>
    <div class="mt-[116px] p-4 text-center">
      <h1 class="text-4xl">Hi, Welcome to Kooiz!</h1>
      <p class="mt-2 text-gray-600">
        Challenge yourself with a myriad of intriguing questions and
        explore fascinating facts. Get ready to laugh, learn, and let the good times roll!
      </p>
    </div>

    <div class="p-4">
      <div @click="startQuiz()" id="quick-play"
        class="max-w-md p-4 pr-6 mx-auto border border-b-4 border-r-4 rounded-full bg-primary border-amber-700/60">
        <div class="flex gap-5 align-middle hover:cursor-pointer">
          <div>
            <svg height="124px" width="124px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <circle style="fill:#EA8953;" cx="256" cy="256" r="256"></circle>
                <path style="opacity:0.1;enable-background:new ;"
                  d="M512,256c0-8.336-0.432-16.571-1.211-24.704L397.115,117.621l-0.075,0.053 c-4.293-5.061-10.619-8.347-17.776-8.347H132.736c-12.928,0-23.403,10.48-23.403,23.403v232.816v13.712 c0,6.133,2.411,11.675,6.277,15.845l-0.037,0.027l0.325,0.325c0.213,0.219,0.421,0.432,0.64,0.64l114.683,114.683 C239.381,511.568,247.637,512,256,512C397.387,512,512,397.387,512,256z">
                </path>
                <path style="fill:#D5D6DB;"
                  d="M379.264,109.333H132.736c-12.928,0-23.403,10.48-23.403,23.403v246.523 c0,12.928,10.48,23.403,23.403,23.403h246.523c12.928,0,23.403-10.48,23.403-23.403V132.736 C402.667,119.813,392.187,109.333,379.264,109.333z">
                </path>
                <path style="fill:#EBF0F3;"
                  d="M379.264,109.333H132.736c-12.928,0-23.403,10.48-23.403,23.403v232.816 c0,12.928,10.48,23.403,23.403,23.403h246.523c12.928,0,23.403-10.48,23.403-23.403V132.736 C402.667,119.813,392.187,109.333,379.264,109.333z">
                </path>
                <circle style="fill:#64798A;" cx="256" cy="249.147" r="30.213"></circle>
                <path style="fill:#3A556A;"
                  d="M256,218.933c-0.587,0-1.157,0.053-1.733,0.085c13.957,0.896,25.013,12.475,25.013,26.661 c0,14.773-11.973,26.747-26.747,26.747c-14.187,0-25.76-11.051-26.661-25.013c-0.032,0.576-0.085,1.147-0.085,1.733 c0,16.688,13.525,30.213,30.213,30.213s30.213-13.525,30.213-30.213S272.688,218.933,256,218.933z">
                </path>
                <circle style="fill:#64798A;" cx="160.107" cy="160.107" r="30.213"></circle>
                <path style="fill:#3A556A;"
                  d="M160.112,129.899c-0.587,0-1.157,0.053-1.733,0.085c13.963,0.896,25.013,12.475,25.013,26.661 c0,14.773-11.973,26.747-26.747,26.747c-14.187,0-25.76-11.056-26.661-25.013c-0.032,0.576-0.091,1.147-0.091,1.733 c0,16.688,13.525,30.213,30.213,30.213s30.213-13.525,30.213-30.213C190.325,143.424,176.8,129.899,160.112,129.899z">
                </path>
                <circle style="fill:#64798A;" cx="351.888" cy="338.187" r="30.213"></circle>
                <path style="fill:#3A556A;"
                  d="M351.888,307.968c-0.587,0-1.157,0.053-1.733,0.091c13.963,0.896,25.013,12.475,25.013,26.661 c0,14.773-11.973,26.747-26.747,26.747c-14.187,0-25.76-11.051-26.661-25.013c-0.032,0.576-0.085,1.147-0.085,1.733 c0,16.688,13.525,30.213,30.213,30.213c16.688,0,30.213-13.525,30.213-30.213C382.101,321.493,368.576,307.968,351.888,307.968z">
                </path>
              </g>
            </svg>
          </div>
          <div class="my-auto">
            <h2 class="text-3xl font-bold text-amber-900">PLAY NOW!</h2>
            <p class="hidden text-amber-950/80 md:block">
              A dose of randomness is good for your brain.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div id="categories" class="my-4">
      <h4 class="pb-6 text-center">OR PICK A CATEGORY</h4>

      <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <CategoryCard @click="selectCategory(category)" v-for="category in store.featured" :key="category.id"
          :category="category" />
      </div>
    </div>

    <div class="p-4 my-4">
      <button @click="showCategory = true"
        class="flex gap-3 p-4 mx-auto font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer group">
        <span class="group-hover:underline">See all categories</span>
        <span class="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        </span>
      </button>
    </div>

    <div class="flex justify-center gap-6 px-4 py-6 mt-10">
      <span>
        🚀 novabyte.dev
      </span>
      <span @click="showAbout" class="underline hover:cursor-pointer">
        About
      </span>
    </div>
  </main>
</template>
