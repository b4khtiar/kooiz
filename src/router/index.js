import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizView from '../views/QuizView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/quiz&:category?&:difficulty?',
			name: 'quiz',
			component: QuizView,
		},
		{
			path: '/results&score=:score&category=:category?&difficulty=:difficulty?',
			name: 'results',
			component: import('../views/ResultsView.vue'),
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('../views/AboutView.vue'),
		},
	],
})

export default router
