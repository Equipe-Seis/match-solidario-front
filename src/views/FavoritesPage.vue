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
      <div>
        <ion-list lines="full">
          <ion-item>
            <ion-label>Pokémon Yellow</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Mega Man X</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>The Legend of Zelda</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Pac-Man</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Super Mario World</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonItem, IonLabel, IonList } from "@ionic/vue";
</script>

<style scoped lang="scss" src="./css/RegisterPage.scss"></style>
