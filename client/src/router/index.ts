import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import BoardsView from '../views/BoardsView.vue'
import TeamsView from '../views/TeamsView.vue'
import ReportsView from '../views/ReportsView.vue'
import SettingsView from '../views/SettingsView.vue'
// --- 1. IMPORTAMOS NUESTRA NUEVA VISTA DE NOTIFICACIONES ---
import NotificationsView from '../views/NotificationsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/login', name: 'login', component: LoginView },
        { path: '/dashboard', name: 'dashboard', component: DashboardView },
        { path: '/projects', name: 'projects', component: ProjectsView },
        { path: '/projects/:projectId/boards', name: 'board', component: BoardsView },
        { path: '/teams', name: 'teams', component: TeamsView },
        { path: '/reports', name: 'reports', component: ReportsView },
        { path: '/settings', name: 'settings', component: SettingsView },
        // --- 2. AÑADIMOS LA NUEVA RUTA AQUÍ ---
        {
            path: '/notifications',
            name: 'notifications',
            component: NotificationsView
        }
    ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('accessToken');
    if (authRequired && !loggedIn) {
        return next('/login');
    }
    next();
});

export default router