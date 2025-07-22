import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import BoardsView from '../views/BoardsView.vue'
import TeamsView from '../views/TeamsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView
        },
        { path: '/projects', name: 'projects', component: ProjectsView },
        { path: '/boards', name: 'boards', component: BoardsView },
        { path: '/teams', name: 'teams', component: TeamsView },


    ]
})

router.beforeEach((to, from, next) => {
    // 1. Define las páginas que son públicas (no requieren login)
    const publicPages = ['/login', '/'];
    const authRequired = !publicPages.includes(to.path);

    // 2. Revisa si hay un token en el almacenamiento local
    const loggedIn = localStorage.getItem('accessToken');

    // 3. Si la ruta requiere autenticación y no hay token, redirige al login
    if (authRequired && !loggedIn) {
        return next('/login');
    }

    // 4. Si todo está bien, permite el acceso
    next();
});

export default router
