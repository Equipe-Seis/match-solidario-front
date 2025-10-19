<template>
  <ion-app>
    <CustomSplash />

    <ion-menu content-id="main-content" side="start" menu-id="mainMenu">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-item button router-link="/match">
          <ion-icon :icon="homeOutline" slot="start" color="primary"></ion-icon>
          <ion-label>Início</ion-label>
        </ion-item>

        <ion-item button router-link="/profile">
          <ion-icon
            :icon="personCircleOutline"
            slot="start"
            color="secondary"
          ></ion-icon>
          <ion-label>Perfil</ion-label>
        </ion-item>

        <ion-item button router-link="/institution/register">
          <ion-icon :icon="heart" slot="start" color="tertiary"></ion-icon>
          <ion-label>Cadastre um projeto!</ion-label>
        </ion-item>

        <ion-item button @click="logoutUser">
          <ion-icon :icon="logOutOutline" slot="start" color="danger"></ion-icon>
          <ion-label>Sair</ion-label>
        </ion-item>
      </ion-content>
    </ion-menu>

    <!-- CONTEÚDO PRINCIPAL -->
    <div class="ion-page" id="main-contionic cap run android -l --externalent">
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
  IonItem,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
} from "@ionic/vue";

import {
  homeOutline,
  personCircleOutline,
  heartOutline,
  settingsOutline,
  logOutOutline,
  heart,
} from "ionicons/icons";

import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import CustomSplash from "@/components/CustomSplash.vue";

const { logout } = useAuth();
const router = useRouter();

async function logoutUser() {
  await logout();
  router.push("/login");
}
</script>
