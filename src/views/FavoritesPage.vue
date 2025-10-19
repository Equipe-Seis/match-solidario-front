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
            <ion-button shape="round" fill="clear" size="large" @click="">
              <ion-icon
                slot="icon-only"
                color="danger"
                :icon="closeCircle"
              ></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonItem, IonLabel, IonList } from "@ionic/vue";
import {
  closeCircle,
  closeCircleOutline,
  closeOutline,
  timeOutline,
} from "ionicons/icons";
</script>

<style scoped lang="scss" src="./css/RegisterPage.scss"></style>
