<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="login-container">
        <h1>Bem-vindo de volta!</h1>
        <p>Faça login para continuar</p>

        <ion-list>
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
              :type="passwordFieldType"
              v-model="password"
            ></ion-input>
            <ion-icon
              slot="end"
              :icon="passwordFieldIcon"
              @click="togglePasswordVisibility"
              class="password-toggle-icon"
            ></ion-icon>
          </ion-item>

        </ion-list>

        <ion-button expand="block" @click="handleLogin" class="ion-margin-top">
          Entrar
        </ion-button>

        <ion-button fill="clear" expand="block" @click="goToRegister">
          Não tem uma conta? Cadastre-se
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'; 
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
  IonBackButton,
  IonIcon 
} from '@ionic/vue';
import { eye, eyeOff } from 'ionicons/icons'; 

const router = useRouter();

const email = ref('');
const password = ref('');

const showPassword = ref(false);

const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'));

const passwordFieldIcon = computed(() => (showPassword.value ? eyeOff : eye));

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

function handleLogin() {
  console.log('Tentando fazer login com:', email.value, password.value);
  router.push('/feed');
}

function goToRegister() {
  router.push('/register');
}
</script>

<style scoped lang="scss" src="./css/LoginPage.scss"></style>

