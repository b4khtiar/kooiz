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
    <div class="relative w-72 h-80 bg-cover bg-no-repeat bg-center rounded-lg overflow-hidden border border-b-4 border-r-4 border-gray-400"
        style="background-image: url('https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');">
        <div class="absolute bottom-0 right-0 z-2 w-full h-full bg-dark/30 hover:bg-dark/10 duration-300 ease-in-out">
            <h5
                class="w-full px-4 py-2 bg-light text-gray-800 text-center border-b border-gray-600 text-lg font-bold tracking-wider">
                ANIMALS</h5>

            <div v-show="!showDifficulty" class="absolute flex bottom-4 w-full justify-center">
                <button @click="showDifficulty = 1"
                    class="px-8 py-3 mx-auto bg-light rounded-full text-2xl text-gray-800 border border-b-4 border-r-4 border-gray-800 font-bold tracking-wider">Select</button>
            </div>
            <div v-show="showDifficulty === 1" class="absolute bottom-0 z-4 w-full bg-light/90 rounded-t-lg text-xl py-4">
                <h4 class="text-gray-600 text-base pb-2 px-4 uppercase">Select Difficulty</h4>
                <div @click="selectDifficulty('27', 'easy')"
                    class="py-3 px-4 mt-1 font-bold tracking-wide hover:border-b hover:border-gray-600">Easy</div>
                <div @click="selectDifficulty('27', 'medium')"
                    class="py-3 px-4 mt-1 font-bold tracking-wide hover:border-b hover:border-gray-600">Medium</div>
                <div @click="selectDifficulty('27', 'hard')"
                    class="py-3 px-4 mt-1 font-bold tracking-wide hover:border-b hover:border-gray-600">hard</div>
            </div>
        </div>
    </div>
</template>