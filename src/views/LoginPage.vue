<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="login-container">
        <div class="ion-padding">
          <h1 color="primary">Bem-vindo de volta!</h1>
          <h5>Faça login para continuar!</h5>
        </div>
        <div class="ion-padding">
          <ion-input
            label="Email"
            label-placement="stacked"
            value="hi@ionic.io"
            type="email"
            placeholder="seu@email.com"
            v-model="email"
          >
          </ion-input>
          <ion-input
            label="Senha"
            label-placement="stacked"
            type="password"
            v-model="password"
          >
            <ion-input-password-toggle slot="end"></ion-input-password-toggle>
          </ion-input>

          <ion-button
            expand="block"
            @click="handleLogin"
            class="ion-margin-top"
          >
            Entrar
          </ion-button>

          <ion-button fill="clear" expand="block" @click="goToRegister">
            Não tem uma conta? Cadastre-se
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  toastController,
  IonInputPasswordToggle,
} from "@ionic/vue";
import { eye, eyeOff } from "ionicons/icons";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { login } = useAuth();

const email = ref("");
const password = ref("");

async function handleLogin() {
  try {
    await login(email.value, password.value);
    const toast = await toastController.create({
      message: "Login realizado com sucesso!",
      duration: 1500,
      color: "success",
    });
    await toast.present();
    router.push("/feed");
  } catch (e) {
    const t = await toastController.create({
      message: "Login inválido. Verifique suas credenciais.",
      duration: 1800,
      color: "danger",
    });
    await t.present();
  }
}

function goToRegister() {
  router.push("/home");
}
</script>

<style scoped lang="scss" src="./css/LoginPage.scss"></style>
