<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Serviços Solidários</ion-title>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-card v-for="item in cards" :key="item.id" class="custom-card">
          <ion-img :src="item.image" class="card-image"></ion-img>

          <ion-card-header>
            <ion-card-title>{{ item.title }}</ion-card-title>
            <ion-card-subtitle>{{ item.tags.join(' • ') }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            Distância: {{ item.distance }} km
          </ion-card-content>

          <ion-footer class="ion-no-border">
            <ion-toolbar>
              <ion-button expand="block" color="success" @click="confirm(item)">
                Confirmar Interesse
              </ion-button>
            </ion-toolbar>
          </ion-footer>
        </ion-card>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonImg,
  IonList,
  IonFooter
} from '@ionic/vue';

const cards = ref([
  {
    id: 1,
    title: 'Aulas de reforço escolar',
    tags: ['Educação', 'Crianças'],
    distance: 2.5,
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=872&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Carona solidária',
    tags: ['Transporte', 'Saúde'],
    distance: 5.1,
    image: 'https://images.unsplash.com/photo-1534708112740-cb40ecb0663e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
] );

function confirm(item: any) {
  alert('Você se conectou com: ' + item.title);
}
</script>

<style scoped>
.custom-card {
  margin-bottom: 16px;
}

.card-image {
  height: 180px;
  object-fit: cover; 
}

ion-footer ion-toolbar {
  --background: transparent;
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-bottom: 10px;
}
</style>
