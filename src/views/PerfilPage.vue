<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/login"></ion-back-button>
        </ion-buttons>
        <ion-title>Crie sua Conta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="container">
        <div class="header">
          <ion-icon :icon="heart" class="logo-icon"></ion-icon>
          <h1>Match Solidário</h1>
          <p>Essa aplicação é para doações e causas sociais</p>
        </div>

        <div class="action-buttons">
          <ion-button expand="block" color="success" @click="goVolunteer()" id="quero-ajudar">
            Quero ajudar
          </ion-button>
          <ion-button expand="block" fill="outline" color="primary" @click="goTo('feed')" id="preciso-de-ajuda">
            Preciso de ajuda
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { heart } from 'ionicons/icons'; 

const router = useRouter();
function goTo(page: string) {
  router.push('/login');
}
function goVolunteer() {
  router.push({ path: '/register', query: { role: 'volunteer' } });
}


</script>

<style scoped lang="scss" src="./css/HomePage.scss"></style>
