<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Meus favoritos</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" color="light">
      <div v-if="loading">
        Carregando
      </div>
      <div v-else-if="user?.favorites && user.favorites.length > 0">
        <ion-list lines="full">
          <ion-item v-for="fav in user.favorites">
            <ion-label>{{ fav.name }}</ion-label>
            <ion-button shape="round" fill="clear" size="large" @click="favorite(fav.id)">
              <ion-icon slot="icon-only" color="danger" :icon="closeCircle"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>
      </div>
      <div v-else>
        Nada por aqui
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useUser } from "@/composables/useUser";
import { IonContent, IonItem, IonLabel, IonList, onIonViewWillEnter } from "@ionic/vue";
import {
  closeCircle,
} from "ionicons/icons";

const { user, load, loading, favorite } = useUser()

const build = async () => {
  setTimeout(() => load(), 1500)
}

onIonViewWillEnter(build)
</script>

