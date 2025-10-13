<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Seeds</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button :disabled="seeding" @click="seed">{{ seeding ? 'Semendo...' : 'Semear interesses padrão' }}</ion-button>
      <ion-button :disabled="seedingConfig" color="secondary" @click="seedConfig" style="margin-left: 8px">
        {{ seedingConfig ? 'Semendo...' : 'Semear availability config' }}
      </ion-button>
      <div v-if="message" class="message">{{ message }}</div>
      <div v-if="messageConfig" class="message">{{ messageConfig }}</div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { seedInterests, defaultInterests } from '@/seeds/interests.seed';
import { seedAvailabilityConfig, defaultAvailabilityConfig } from '@/seeds/availability-config.seed';

const seeding = ref(false);
const message = ref('');

const seedingConfig = ref(false);
const messageConfig = ref('');

const options = defaultInterests;

async function seed() {
  seeding.value = true;
  message.value = '';
  try {
    await seedInterests(options);
    message.value = 'Interesses semeados com sucesso em config/interesses.options';
  } catch (e: any) {
    message.value = `Erro: ${e?.message || e}`;
  } finally {
    seeding.value = false;
  }
}

async function seedConfig() {
  seedingConfig.value = true;
  messageConfig.value = '';
  try {
    await seedAvailabilityConfig(defaultAvailabilityConfig);
    messageConfig.value = 'Availability config semeada em config/availabilityConfig';
  } catch (e: any) {
    messageConfig.value = `Erro: ${e?.message || e}`;
  } finally {
    seedingConfig.value = false;
  }
}
</script>

<style scoped>
.message { margin-top: 12px; }
</style>


