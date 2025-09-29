<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/feed"></ion-back-button>
        </ion-buttons>
        <ion-title>Configurações</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-list :inset="true">
        <ion-item button @click="goTo('/profile-details')">
          <ion-icon :icon="personCircleOutline" slot="start"></ion-icon>
          <ion-label>Meu perfil</ion-label>
        </ion-item>
        <ion-item button @click="goTo('/notifications')">
          <ion-icon :icon="notificationsOutline" slot="start"></ion-icon>
          <ion-label>Notificações</ion-label>
        </ion-item>
        <ion-item button @click="goTo('/support')">
          <ion-icon :icon="helpCircleOutline" slot="start"></ion-icon>
          <ion-label>Ajuda</ion-label>
        </ion-item>
      </ion-list>

      <div class="exit-button-container">
        <ion-button expand="block" color="primary" @click="handleExit">
          Exit
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/vue';
import { personCircleOutline, notificationsOutline, helpCircleOutline } from 'ionicons/icons';

const router = useRouter();

function goTo(path: string) {
  console.log(`Navegando para ${path}`);
}

function handleExit() {
  console.log('Saindo...');
  router.push('/login');
}
</script>

<style scoped lang="scss" src="./css/ProfilePage.scss"></style>

