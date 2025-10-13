<template>
  <ion-app>
    <ion-menu content-id="main-content" side="start" menu-id="mainMenu">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <ion-item button router-link="/feed">
            <ion-icon :icon="homeOutline" slot="start"></ion-icon>
            <ion-label>Início</ion-label>
          </ion-item>

          <ion-item button router-link="/profile">
            <ion-icon :icon="personCircleOutline" slot="start"></ion-icon>
            <ion-label>Perfil</ion-label>
          </ion-item>
          <ion-item button @click="logoutUser">
            <ion-icon :icon="logOutOutline" slot="start"></ion-icon>
            <ion-label>Sair</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- CONTEÚDO PRINCIPAL -->
    <div class="ion-page" id="main-content">
      <ion-router-outlet />
    </div>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
} from '@ionic/vue';

import {
  homeOutline,
  personCircleOutline,
  heartOutline,
  settingsOutline,
  logOutOutline,
} from 'ionicons/icons';

import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

const { logout } = useAuth();
const router = useRouter();

async function logoutUser() {
  await logout();
  router.push('/login');
}
</script>

