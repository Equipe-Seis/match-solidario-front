import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import FeedPage from '../views/FeedPage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import ItemView from '@/views/ItemView.vue';
import { Component } from 'ionicons/dist/types/stencil-public-runtime';

const routes = [
  { path: '/', component: HomePage },
  { path: '/feed', component: FeedPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/profile', component: ProfilePage },
  { path: '/itemsview', component: ItemView} //TODO: remover esta rota antes da entrega, exemplo de utilização do firebase
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
