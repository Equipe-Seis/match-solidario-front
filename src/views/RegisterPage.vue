<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="register-container">
        <div class="ion-padding">
          <h1>Vamos começar!</h1>
          <h5>Crie uma conta para participar!</h5>
        </div>
        <div class="ion-padding">
          <ion-input
            label="E-mail"
            label-placement="stacked"
            type="email"
            placeholder="seu@email.com"
            v-model="email"
          ></ion-input>

          <ion-input
            label="Senha"
            label-placement="stacked"
            type="password"
            v-model="password"
          >
            <ion-input-password-toggle slot="end"></ion-input-password-toggle>
          </ion-input>

          <ion-input
            label="Confirme sua senha"
            label-placement="stacked"
            type="password"
            v-model="confirmPassword"
          >
            <ion-input-password-toggle slot="end"></ion-input-password-toggle>
          </ion-input>

          <ion-button
            expand="block"
            @click="handleRegister"
            :disabled="submitting"
            class="ion-margin-top"
          >
            Cadastrar
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
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { toastController } from "@ionic/vue";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { IonPage, IonContent, IonInput, IonButton } from "@ionic/vue";

const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const submitting = ref(false);
const selectedRole = ref<string>((route.query.role as string) || "volunteer");

function goTo(page: string) {
  router.push(page);
}

async function handleRegister() {
  const role = selectedRole.value as "volunteer" | "institution";
  if (!email.value || !password.value || !confirmPassword.value) {
    const t = await toastController.create({
      message: "Preencha e-mail e senhas",
      duration: 1800,
      color: "warning",
    });
    await t.present();
    return;
  }
  if (password.value !== confirmPassword.value) {
    const t = await toastController.create({
      message: "Senhas não conferem",
      duration: 1800,
      color: "warning",
    });
    await t.present();
    return;
  }
  submitting.value = true;
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const uid = cred.user.uid;
    await setDoc(
      doc(db, "users", uid),
      {
        email: email.value,
        role,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
    if (role === "volunteer") {
      router.push({ path: "/volunteer/register", query: { userId: uid } });
    } else if (role === "institution") {
      router.push({ path: "/institution/register", query: { userId: uid } });
    } else {
      router.push("/home");
    }
  } catch (e: any) {
    const msg = e?.message || "Falha ao registrar";
    const t = await toastController.create({
      message: msg,
      duration: 2000,
      color: "danger",
    });
    await t.present();
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped lang="scss" src="./css/RegisterPage.scss"></style>
