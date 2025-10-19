import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import MatchingPage from '@/views/MatchingPage.vue';
import VolunteerRegisterPage from '../views/volunteer/VolunteerRegisterPage.vue';
import VolunteerEditPage from '../views/volunteer/VolunteerEditPage.vue';
const InstitutionRegisterPage = () =>
  import("../views/institution/InstitutionRegisterPage.vue");
import { auth } from '@/firebase';

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: LoginPage },
  { path: "/login", component: LoginPage },
  { path: "/home", component: HomePage },
  { path: "/match", component: MatchingPage}, //, meta: { requiresAuth: true } 
  { path: "/register", component: RegisterPage },
  { path: "/profile", component: ProfilePage}, //, meta: { requiresAuth: true } 
  { path: "/volunteer/register", component: VolunteerRegisterPage },
  {
    path: "/volunteer/edit/:id",
    component: VolunteerEditPage,
    meta: { requiresAuth: true },
  },
  { path: "/institution/register", component: InstitutionRegisterPage}, //, meta: { requiresAuth: true } 
  //{ path: "/match", component: MatchingPage },
];

if (import.meta.env.VITE_ENABLE_DEV_ROUTES === 'true') {
  const devRoutes: Array<RouteRecordRaw> = [
    { path: '/dev/seed-interests', component: () => import('../views/seeds/DevSeedInterests.vue') }
  ];
  routes.push(...devRoutes);
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some(r => (r.meta as any)?.requiresAuth);
  const isAuthed = !!auth.currentUser;
  if (requiresAuth && !isAuthed) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
