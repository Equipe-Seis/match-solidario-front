<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Crie sua conta</ion-title>
      </ion-toolbar>
    </ion-header>
    
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { heart } from 'ionicons/icons'; 

const router = useRouter();

function goTo(page: string) {
  router.push(page);
}

function goVolunteer() {
  router.push({ path: '/register', query: { role: 'volunteer' } });
}


</script>

<style scoped lang="scss" src="./css/HomePage.scss"></style>
