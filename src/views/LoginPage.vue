<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="login-container">
        <h1>Bem-vindo de volta!</h1>
        <p>Faça login para continuar</p>

        <ion-list>
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input
              label-placement="floating"
              type="email"
              placeholder="seu@email.com"
              v-model="email"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Senha</ion-label>
            <ion-input
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
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
  IonIcon,
  toastController,
} from "@ionic/vue";
import { eye, eyeOff } from "ionicons/icons";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { login } = useAuth();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const passwordFieldType = computed(() =>
  showPassword.value ? "text" : "password"
);
const passwordFieldIcon = computed(() => (showPassword.value ? eyeOff : eye));

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

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
  router.push("/perfil");
}
</script>

<style scoped lang="scss" src="./css/LoginPage.scss"></style>
