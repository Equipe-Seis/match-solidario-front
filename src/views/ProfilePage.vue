<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/match"></ion-back-button>
        </ion-buttons>
        <ion-title>Meu Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Informações básicas</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="profile-header">
            <ion-avatar class="avatar">
              <img :src="volunteer?.photoUrl || placeholderAvatar" alt="avatar" />
            </ion-avatar>
            <div class="info">
              <h2>{{ userName || userEmail }}</h2>
              <p>{{ userEmail }}</p>
              <p v-if="role">Perfil: {{ roleLabel }}</p>
            </div>
          </div>

          <ion-list lines="none">
            <ion-item v-if="volunteer?.city || volunteer?.state">
              <ion-label>Cidade/UF</ion-label>
              <div slot="end">{{ volunteer?.city }} / {{ volunteer?.state }}</div>
            </ion-item>
            <ion-item v-if="volunteer?.phone">
              <ion-label>Telefone</ion-label>
              <div slot="end">{{ volunteer?.phone }}</div>
            </ion-item>
          </ion-list>

          <div class="actions">
            <ion-button v-if="volunteerId" expand="block" @click="editVolunteer">Editar cadastro de voluntário</ion-button>
            <ion-button v-else expand="block" color="secondary" @click="completeVolunteer">Completar cadastro de voluntário</ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <div class="exit-button-container">
        <ion-button expand="block" color="medium" fill="outline" @click="handleExit">
          Sair
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
  
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar
} from '@ionic/vue';
import { personCircleOutline } from 'ionicons/icons';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

const router = useRouter();

const userEmail = ref<string>('');
const userName = ref<string>('');
const role = ref<string | null>(null);
const volunteerId = ref<string | null>(null);
const volunteer = ref<any | null>(null);
const placeholderAvatar = '/favicon.png';

const roleLabel = computed(() => {
  if (role.value === 'volunteer') return 'Voluntário';
  if (role.value === 'institution') return 'Instituição';
  return 'Usuário';
});

async function loadProfile() {
  const u = auth.currentUser;
  if (!u) {
    router.push('/login');
    return;
  }
  userEmail.value = u.email || '';
  const userSnap = await getDoc(doc(db, 'users', u.uid));
  if (userSnap.exists()) {
    const data: any = userSnap.data();
    userName.value = data?.name || '';
    role.value = data?.role || null;
    volunteerId.value = data?.volunteerId || null;
  }
  if (role.value === 'volunteer') {
    if (volunteerId.value) {
      const vSnap = await getDoc(doc(db, 'volunteers', volunteerId.value));
      if (vSnap.exists()) volunteer.value = vSnap.data();
    }
  }
}

function editVolunteer() {
  if (volunteerId.value) router.push(`/volunteer/edit/${volunteerId.value}`);
}

function completeVolunteer() {
  const u = auth.currentUser;
  if (u) router.push({ path: '/volunteer/register', query: { userId: u.uid } });
}

function handleExit() {
  router.push('/login');
}

onMounted(loadProfile);
</script>

<style scoped lang="scss" src="./css/ProfilePage.scss"></style>
<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar {
  width: 72px;
  height: 72px;
}
.actions { margin-top: 12px; }
</style>

