<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Serviços Solidários</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div v-if="loading" class="ion-text-center ion-padding">
        <ion-spinner name="crescent"></ion-spinner>
        <p>Carregando vagas...</p>
      </div>

      <div v-if="!loading && services.length === 0" class="ion-text-center ion-padding">
        <p>Nenhum serviço encontrado no momento.</p>
        <ion-button @click="handleRefresh()" fill="clear">Tentar novamente</ion-button>
      </div>

      <ion-list v-else>
        <ion-card v-for="service in services" :key="service.id" class="custom-card">
          <ion-img :src="service.imageUrl || 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=872&auto=format&fit=crop'" class="card-image"></ion-img>

          <ion-card-header>
            <ion-card-title>{{ service.title }}</ion-card-title>
            <ion-card-subtitle>{{ service.categories.join(' • ' ) }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            Projeto: {{ service.projectName }}
          </ion-card-content>

          <ion-footer class="ion-no-border">
            <ion-toolbar>
              <ion-button expand="block" color="success" @click="confirm(service)">
                Confirmar Interesse
              </ion-button>
            </ion-toolbar>
          </ion-footer>
        </ion-card>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard, IonImg, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter, IonButton, IonButtons, IonMenuButton,
  IonSpinner, IonRefresher, IonRefresherContent
} from '@ionic/vue';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';

interface Service {
  id: string;
  title: string;
  projectName: string;
  categories: string[];
  imageUrl?: string;
}

const services = ref<Service[]>([]);
const loading = ref(true);

async function fetchServices() {
  loading.value = true;
  try {
    const servicesCollection = collection(db, 'services');
    const q = query(servicesCollection, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    
    const fetchedServices: Service[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      fetchedServices.push({
        id: doc.id,
        title: data.title,
        projectName: data.projectName,
        categories: data.categories || [],
        imageUrl: data.imageUrl,
      });
    });
    
    services.value = fetchedServices;

  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
  } finally {
    loading.value = false;
  }
}

const handleRefresh = async (event?: CustomEvent) => {
  await fetchServices();
  if (event && event.target) {
    (event.target as HTMLIonRefresherElement).complete();
  }
};

function confirm(service: Service) {
  alert('Você se conectou com: ' + service.title);
}

onMounted(() => {
  fetchServices();
});
</script>

<style scoped>
.custom-card {
  margin-bottom: 16px;
}

.card-image {
  height: 180px;
  object-fit: cover; 
}

ion-footer ion-toolbar {
  --background: transparent;
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-bottom: 10px;
}
</style>
