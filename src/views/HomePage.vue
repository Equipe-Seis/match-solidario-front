<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="container">
        <div class="header">
          <ion-icon :icon="heart" class="logo-icon" color="primary"></ion-icon>
          <h1>Match Solidário</h1>
          <h4>
            Aqui voluntários e projetos<br />
            se encontram!
          </h4>
        </div>

        <div class="action-buttons">
          <ion-button
            expand="block"
            color="primary"
            @click="goTo('/register')"
          >
            Quero ajudar
          </ion-button>
          <ion-button
            expand="block"
            fill="outline"
            color="primary"
            @click="goTo('/register')"
          >
            Preciso de ajuda
          </ion-button>
          <ion-button fill="clear" expand="block" @click="goTo('/login')">
            Já tem uma conta? Acesse aqui!
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/vue";
import { heart } from "ionicons/icons";

const router = useRouter();
function goTo(page: string) {
  router.push(page);
}
</script>

<style scoped lang="scss" src="./css/HomePage.scss"></style>
