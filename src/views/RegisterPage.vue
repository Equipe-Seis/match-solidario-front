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
      <div class="register-container">
        <h1>Vamos começar!</h1>
        <p>Crie uma conta para participar</p>

        <ion-list>
          <ion-item>
            <ion-input
              label="Nome Completo"
              label-placement="floating"
              type="text"
              placeholder="Seu nome"
              v-model="name"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="E-mail"
              label-placement="floating"
              type="email"
              placeholder="seu@email.com"
              v-model="email"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="Senha"
              label-placement="floating"
              type="password"
              v-model="password"
            ></ion-input>
          </ion-item>
        </ion-list>

        <ion-button expand="block" @click="handleRegister" class="ion-margin-top">
          Cadastrar
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/vue';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');

function handleRegister() {
  console.log('Tentando cadastrar:', name.value, email.value, password.value);
  router.push('/feed');
}
</script>

<style scoped lang="scss" src="./css/RegisterPage.scss"></style>

