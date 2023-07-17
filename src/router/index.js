// eslint-disable-next-line import/no-unresolved
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
];

const createRouter = () =>
	new VueRouter({
		scrollBehavior: () => ({ y: 0 }),
		routes: [...routes],
	});

const router = createRouter();

export function resetRouter() {
	const newRouter = createRouter();
	router.matcher = newRouter.matcher; // reset router
}

export default router;
