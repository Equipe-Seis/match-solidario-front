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

            <ion-item>
              <ion-input
                label="Confirmar senha"
                label-placement="floating"
                type="password"
                v-model="confirmPassword"
              ></ion-input>
            </ion-item>
        </ion-list>

          <ion-button expand="block" @click="handleRegister" :disabled="submitting" class="ion-margin-top">
          Cadastrar
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { toastController } from '@ionic/vue';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
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
const route = useRoute();


const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const submitting = ref(false);
const selectedRole = ref<string>((route.query.role as string) || 'volunteer');

async function handleRegister() {
  const role = selectedRole.value as 'volunteer' | 'institution';
  if (!email.value || !password.value || !confirmPassword.value) {
    const t = await toastController.create({ message: 'Preencha e-mail e senhas', duration: 1800, color: 'warning' });
    await t.present();
    return;
  }
  if (password.value !== confirmPassword.value) {
    const t = await toastController.create({ message: 'Senhas não conferem', duration: 1800, color: 'warning' });
    await t.present();
    return;
  }
  submitting.value = true;
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const uid = cred.user.uid;
    await setDoc(doc(db, 'users', uid), {
      email: email.value,
      role,
      createdAt: serverTimestamp()
    }, { merge: true });
    if (role === 'volunteer') {
      router.push({ path: '/volunteer/register', query: { userId: uid } });
    } else if (role === 'institution') {
      router.push({ path: '/institution/register', query: { userId: uid } });
    } else {
      router.push('/home');
    }
  } catch (e: any) {
    const msg = e?.message || 'Falha ao registrar';
    const t = await toastController.create({ message: msg, duration: 2000, color: 'danger' });
    await t.present();
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped lang="scss" src="./css/RegisterPage.scss"></style>

