<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showDifficulty = ref('')

const selectDifficulty = (cat, diff) => {
  showDifficulty.value = ''
  router.push({ name: 'quiz', params: { category: cat, difficulty: diff } })
}
</script>

<template>
  <main>
    <div class="mt-[116px] p-4">
      <h1 class="text-4xl">Hi, Welcome to Kooiz!</h1>
      <p class="text-gray-400 mt-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore commodi rerum quae,
        ab facilis nemo error.
      </p>
    </div>
    <div class="flex justify-between align-middle mt-4 px-4">
      <div class="py-2">
        <h3 class="text-xl text-gray-600 font-bold tracking-wide">PICK CATEGORY</h3>
      </div>
      <div class="p-2 rounded-xl hover:bg-primary hover:text-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    </div>
    <div class="p-4">
      <div
        class="relative w-72 h-80 bg-cover bg-no-repeat bg-center border-primary rounded-2xl shadow-sm overflow-hidden hover:shadow-md"
        style="background-image: url('https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');">
        <div class="absolute bottom-0 right-0 z-2 w-full h-full bg-dark/30 hover:bg-dark/10 duration-300 ease-in-out">
          <h5 class="px-4 py-2 bg-primary rounded-br-2xl max-w-fit text-lg font-bold tracking-wider">ANIMALS</h5>

          <div v-show="!showDifficulty" class="absolute bottom-0 w-full items-center">
            <button @click="showDifficulty = 1"
              class="px-8 py-3 my-auto bg-dark/50 backdrop-blur-sm w-full text-2xl text-light font-bold tracking-wider">Select</button>
          </div>
          <div v-show="showDifficulty === 1" class="absolute bottom-0 z-4 w-full bg-light/90 rounded-2xl text-xl py-4">
            <h4 class="text-gray-600 font-bold pb-2 px-4 uppercase">Select Difficulty</h4>
            <div @click="selectDifficulty('animal', 'easy')"
              class="py-3 px-4 mt-1 font-bold tracking-wide hover:border-b hover:border-primary">Easy</div>
            <div @click="selectDifficulty('animal', 'medium')"
              class="py-3 px-4 mt-1 font-bold tracking-wide hover:border-b hover:border-primary">Medium</div>
            <div @click="selectDifficulty('animal', 'hard')"
              class="py-3 px-4 mt-1 font-bold tracking-wide hover:border-b hover:border-primary">hard</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
