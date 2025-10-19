<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Cadastrar novo projeto</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="ion-padding">
        <form @submit.prevent="onSubmitUi">
          <ion-card>
            <ion-card-header>
              <ion-card-title>1. Dados do Projeto</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-item>
                <ion-label position="stacked">Nome do projeto</ion-label>
                <ion-input v-model="projectForm.name" required placeholder="Ex: Horta Comunitária do Bairro"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Endereço principal do projeto</ion-label>
                <ion-input v-model="projectForm.address" required placeholder="Rua, número, bairro"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Cidade</ion-label>
                <ion-input v-model="projectForm.city" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">UF</ion-label>
                <ion-input v-model="projectForm.state" required :maxlength="2"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Sobre o projeto</ion-label>
                <ion-textarea v-model="projectForm.description" placeholder="Descreva a missão e as atividades." auto-grow></ion-textarea>
              </ion-item>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>2. Crie o primeiro serviço solidário</ion-card-title>
              <ion-card-subtitle>Serviços solidários são oportunidades que necessitam de voluntários. Descreva aqui um serviço solidário e chame todos à ação!</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-item>
                <ion-label position="stacked">Título do Serviço</ion-label>
                <ion-input v-model="serviceForm.title" required placeholder="Ex: Ajudante para plantio de mudas"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Descrição do Serviço</ion-label>
                <ion-textarea v-model="serviceForm.description" required auto-grow placeholder="Descreva as atividades, requisitos e objetivos."></ion-textarea>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Imagem do Serviço (Opcional)</ion-label>
                <input type="file" @change="handleImageUpload" accept="image/*" />
              </ion-item>
              <div v-if="imageUrl" class="ion-padding-start ion-padding-bottom">
                <img :src="imageUrl" style="max-width: 100px; max-height: 100px; object-fit: cover;" />
              </div>
              
              <ion-item lines="none">
                <ion-label position="stacked">Categorias do Serviço</ion-label>
              </ion-item>
              
              <div v-if="categoriesLoading" class="ion-padding-start ion-padding-bottom">
                <ion-spinner name="dots"></ion-spinner>
                <ion-label> Carregando categorias...</ion-label>
              </div>

              <div v-if="categoriesError" class="ion-padding-start ion-padding-bottom">
                <ion-label color="danger">Falha ao carregar categorias.</ion-label>
                <ion-button fill="clear" size="small" @click="loadCategories">Tentar Novamente</ion-button>
              </div>

              <div class="chips-container" v-if="!categoriesLoading && !categoriesError">
                  <ion-chip
                    v-for="category in categoryOptions"
                    :key="category"
                    :color="serviceForm.categories.includes(category) ? 'primary' : 'light'"
                    :outline="!serviceForm.categories.includes(category)"
                    @click="toggleCategory(category)"
                  >
                    <ion-label>{{ category }}</ion-label>
                  </ion-chip>
              </div>
            </ion-card-content>
          </ion-card>
        </form>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button expand="block" @click="onSubmitUi" :disabled="submitting || !isFormValid">
          {{ submitting ? 'Publicando...' : 'Cadastrar Projeto' }}
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonFooter, IonChip, IonBackButton, IonButtons,
  toastController, IonSpinner
} from '@ionic/vue';
import { getDoc, doc, writeBatch, collection } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth } from '@/firebase';

const router = useRouter();
const submitting = ref(false);

const projectForm = reactive({ name: '', address: '', city: '', state: '', description: '' });
const serviceForm = reactive({ title: '', description: '', categories: [] as string[], imageUrl: '' });
const selectedImage = ref<File | null>(null);
const imageUrl = ref<string | null>(null);

const categoryOptions = ref<string[]>([]);
const categoriesLoading = ref(true);
const categoriesError = ref(false);

const isFormValid = computed(() => {
  const isProjectValid = projectForm.name && projectForm.address && projectForm.city && projectForm.state;
  const isServiceValid = serviceForm.title && serviceForm.description && serviceForm.categories.length > 0;
  return !!(isProjectValid && isServiceValid);
});

function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    selectedImage.value = input.files[0];
    imageUrl.value = URL.createObjectURL(input.files[0]);
  } else {
    selectedImage.value = null;
    imageUrl.value = null;
  }
}

async function loadCategories() {
  categoriesLoading.value = true;
  categoriesError.value = false;
  try {
    const docRef = doc(db, "config", "interesses");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const labels = docSnap.data().options;
      if (Array.isArray(labels)) {
        categoryOptions.value = labels.sort();
      } else {
        throw new Error("O campo 'options' não é um array.");
      }
    } else {
      throw new Error("O documento 'config/interesses' não foi encontrado.");
    }
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    categoriesError.value = true;
  } finally {
    categoriesLoading.value = false;
  }
}

function toggleCategory(category: string) {
  const index = serviceForm.categories.indexOf(category);
  if (index > -1) {
    serviceForm.categories.splice(index, 1);
  } else {
    serviceForm.categories.push(category);
  }
}

async function onSubmitUi() {
  if (!isFormValid.value) return;
  const user = auth.currentUser;
  if (!user) {
    toastController.create({ message: 'Você precisa estar logado.', duration: 2000, color: 'danger' }).then(t => t.present());
    return;
  }
  submitting.value = true;
  try {
    const batch = writeBatch(db);
    const projectRef = doc(collection(db, 'projects'));
    batch.set(projectRef, {
      ownerId: user.uid,
      name: projectForm.name,
      address: projectForm.address,
      city: projectForm.city,
      state: projectForm.state,
      description: projectForm.description,
      createdAt: new Date(),
    });

    let serviceImageUrl = '';
    if (selectedImage.value) {
      const storage = getStorage();
      const imageRef = storageRef(storage, `service_images/${user.uid}/${Date.now()}_${selectedImage.value.name}`);
      const uploadResult = await uploadBytes(imageRef, selectedImage.value);
      serviceImageUrl = await getDownloadURL(uploadResult.ref);
    }
    const serviceRef = doc(collection(db, 'services'));
    batch.set(serviceRef, {
      projectId: projectRef.id,
      projectName: projectForm.name,
      title: serviceForm.title,
      description: serviceForm.description,
      address: projectForm.address,
      categories: serviceForm.categories,
      createdAt: new Date(),
      status: 'open',
      imageUrl: serviceImageUrl,
    });
    await batch.commit();
    toastController.create({ message: 'Projeto e serviço publicados com sucesso!', duration: 2000, color: 'success' }).then(t => t.present());
    router.push('/feed');
  } catch (error: any) {
    console.error("Erro ao publicar:", error);
    toastController.create({ message: 'Falha ao publicar. Tente novamente.', duration: 3000, color: 'danger' }).then(t => t.present());
  } finally {
    submitting.value = false;
  }
}

onMounted(loadCategories);
</script>

<style scoped>
.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 0;
  width: 100%;
}
.ion-padding-start {
  padding-left: 16px;
}
.ion-padding-bottom {
  padding-bottom: 8px;
}
</style>
