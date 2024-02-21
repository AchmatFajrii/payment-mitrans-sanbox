import { createRouter, createWebHistory } from 'vue-router';

// Impor komponen halaman
import SuccessPage from '../src/components/SuccessPage.vue';
import HomePage from '../src/components/HomePage.vue';
import UnfinishPage from '../src/components/UnfinishPage.vue';
import ErrorPage from '../src/components/ErrorPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/success', component: SuccessPage },
    { path: '/unfinish', component: UnfinishPage },
    { path: '/error', component: ErrorPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
