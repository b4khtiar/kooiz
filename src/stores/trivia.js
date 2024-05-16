import { ref } from "vue";
import { defineStore } from "pinia";

export const useTriviaStore = defineStore("trivia", () => {
	const categories = [
		{ id: 9, name: "General Knowledge" },
		{ id: 10, name: "Entertainment: Books" },
		{ id: 11, name: "Entertainment: Film" },
		{ id: 12, name: "Entertainment: Music" },
		{ id: 13, name: "Entertainment: Musicals & Theatres" },
		{ id: 14, name: "Entertainment: Television" },
		{ id: 15, name: "Entertainment: Video Games" },
		{ id: 16, name: "Entertainment: Board Games" },
		{ id: 17, name: "Science & Nature" },
		{ id: 18, name: "Science: Computers" },
		{ id: 19, name: "Science: Mathematics" },
		{ id: 20, name: "Mythology" },
		{ id: 21, name: "Sports" },
		{ id: 22, name: "Geography" },
		{ id: 23, name: "History" },
		{ id: 24, name: "Politics" },
		{ id: 25, name: "Art" },
		{ id: 26, name: "Celebrities" },
		{ id: 27, name: "Animals" },
		{ id: 28, name: "Vehicles" },
		{ id: 29, name: "Entertainment: Comics" },
		{ id: 30, name: "Science: Gadgets" },
		{ id: 31, name: "Entertainment: Japanese Anime & Manga" },
		{ id: 32, name: "Entertainment: Cartoon & Animations" },
	];
	const featured = [
		{ id: 17, name: "Nature", img: "/assets/icons/nature.svg" },
		{ id: 19, name: "Mathematics", img: "/assets/icons/math.svg" },
		{ id: 11, name: "Film", img: "/assets/icons/film.svg" },
		{ id: 21, name: "Sports", img: "/assets/icons/sport.svg" },
		{ id: 23, name: "History", img: "/assets/icons/history.svg" },
		{ id: 20, name: "Mythology", img: "/assets/icons/mythology.svg" },
		{ id: 31, name: "Anime & Manga", img: "/assets/icons/anime.svg" },
		{ id: 15, name: "Video Games", img: "/assets/icons/videogame.svg" },
	];
	const questions = ref([]);
	const answers = ref([]);

	return { categories, featured, questions, answers };
});
