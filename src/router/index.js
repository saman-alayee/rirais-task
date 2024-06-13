
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'todo',
		meta: {
			title: 'todo',
		},
		component: () => import('../views/Todo/index.vue'),
	},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
