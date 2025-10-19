<template>
  <ion-page>
    <ion-header class="ion-no-border" :translucent="true">
      <ion-toolbar color="transparent">
        <ion-title></ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="secondary">
          <ion-button router-link="/profile">
            <ion-icon slot="icon-only" :icon="personOutline" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <div class="main">
      <div class="card-stack" v-if="!selectedProject">
        <ion-loading class="custom-loading" message="Carregando dados..." :isOpen="loading"></ion-loading>

        <div class="card transparent" v-if="loading">
          <div class="card-placeholder">
            <p>Estamos carregando tudo para você.</p>
            <p>Por favor, aguarde!</p>
          </div>
        </div>

        <transition-group name="swipe" tag="div" v-else-if="currentIndex <= projects?.length - 1">
          <div v-for="(card, index) in visibleProjects" :key="card.id" class="card"
            :style="{ zIndex: visibleProjects.length - index }" @click="openDetails(card)">
            <img :src="card.imageUrl ?? placeholderImg" alt="card image" />
            <div class="overlay">
              <div style="display: flex; flex-direction: column; gap: 5px;">
                <span class="title">{{ card.name }}</span>
                <!-- <div v-if="card.services && card.services.length > 0">
                  <ion-chip v-for="categorie in card.services.flatMap(x => x.categories)" color="white" outline>
                    {{ categorie }}
                  </ion-chip>
                </div> -->
                <span class="location">
                  {{ card.address }}, {{ card.city }}, {{ card.state }}
                  <ion-icon :icon="locationOutline" size="medium"></ion-icon>
                </span>
              </div>
            </div>
          </div>
        </transition-group>

        <div class="card transparent" v-else>
          <div class="card-placeholder">
            <p>Você finalizou por hoje!</p>
            <p>Novos projetos estarão disponíveis amanhã.</p>
            <p>ou</p>
            <p>
              Clique no botão
              <ion-icon slot="icon-only" size="small" color="medium" :icon="refreshOutline"></ion-icon>
              para recomeçar.
            </p>
          </div>
        </div>
      </div>

      <transition name="expand">
        <div v-if="selectedProject" class="details-view">
          <img :src="selectedProject.imageUrl ?? placeholderImg" class="details-image" alt="Detalhe do projeto" />
          <ion-icon :icon="closeOutline" class="back-icon" @click="closeDetails" />

          <div class="details-content">
            <h1>{{ selectedProject.name }}</h1>
            <div class="location">
              <ion-icon :icon="location"></ion-icon>
              {{ selectedProject.address }}, {{ selectedProject.city }}, {{ selectedProject.state }}
            </div>

            <p class="description">{{ selectedProject.description }}</p>

            <ion-button expand="block" color="primary" shape="round">
              Participar
            </ion-button>
          </div>
        </div>
      </transition>

      <div v-if="!selectedProject" class="actions">
        <ion-button shape="round" color="white" size="large" @click="reset">
          <ion-icon slot="icon-only" color="medium" :icon="refreshOutline"></ion-icon>
        </ion-button>
        <ion-button shape="round" color="white" size="large" @click="undo">
          <ion-icon slot="icon-only" color="warning" :icon="arrowUndoOutline"></ion-icon>
        </ion-button>
        <ion-button shape="round" color="white" size="large" @click="swipe">
          <ion-icon slot="icon-only" color="danger" :icon="closeOutline"></ion-icon>
        </ion-button>
        <ion-button shape="round" color="white" size="large" @click="favorite(viewingProject.id)">
          <ion-icon slot="icon-only" color="primary" :icon="isFavorite ? star : starOutline"></ion-icon>
        </ion-button>
        <ion-button shape="round" color="white" size="large" @click="swipe">
          <ion-icon slot="icon-only" color="success" :icon="heartOutline"></ion-icon>
        </ion-button>
      </div>

    </div>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  closeOutline,
  location,
  personOutline,
  heartOutline,
  arrowUndoOutline,
  starOutline,
  refreshOutline,
  locationOutline,
  star,
} from "ionicons/icons";
import { ref, computed } from 'vue';
import { Project, useProjects } from '@/composables/useProjects';
import { useUser } from "@/composables/useUser";
import { onIonViewWillEnter } from "@ionic/vue";

const placeholderImg = "https://picsum.photos/400/600?random=4";

const { load, projects, loading } = useProjects()
const { user, load: loadUser, favorite, loading: loadingUser } = useUser()

const currentIndex = ref(0);
const selectedProject = ref<Project | null>(null);

const visibleProjects = computed(() =>
  projects.value.slice(currentIndex.value, currentIndex.value + 3)
);

const viewingProject = computed(() => {
  return projects.value[currentIndex.value]
})

const isFavorite = computed(() => {
  return user.value?.favorites?.some(x => x.id === viewingProject.value.id)
})

const swipe = () => {
  if (currentIndex.value < projects.value.length) currentIndex.value++;
};

const undo = () => {
  if ((currentIndex.value - 1) >= 0) currentIndex.value--;
};

const reset = () => {
  currentIndex.value = 0;
};

const openDetails = (card: any) => {
  selectedProject.value = card;
};

const closeDetails = () => {
  selectedProject.value = null;
};

const build = async () => {
  await loadUser()
  setTimeout(() => load(), 1500)
}

onIonViewWillEnter(build)
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  background: #f8f9fa;
  overflow: hidden;
  position: relative;
}

.card-stack {
  position: relative;
  width: 90%;
  height: 70%;
  padding-top: 20px;
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: #000;
  cursor: pointer;
  transition: transform 0.4s ease, opacity 0.3s ease;
}

.card.transparent {
  background: #fff;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  left: 20px;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  bottom: 30px;
  font-size: 1.5rem;
  font-weight: bold;
  max-width: 100%;
}

.card-placeholder {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

.overlay .subtitle {
  font-weight: 100;
  font-size: 1rem;
  text-overflow: ellipsis;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
}

.overlay .title {
  font-weight: bold;
  font-size: 1.125rem;
}
.overlay .location {
  font-weight: lighter;
  font-size: 0.875rem;
}

.swipe-leave-active {
  transform: translateX(-150%) rotate(-15deg);
  opacity: 0;
}

.swipe-enter-active {
  transform: translateX(0%) rotate(0deg);
  opacity: 1;
}

.details-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  z-index: 10;
  overflow-y: auto;
}

.details-image {
  width: 100%;
  height: 40vh;
  object-fit: cover;
}

.back-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 2rem;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0.875rem;
}

.details-content h1 {
  margin-bottom: 0.5rem;
}

.details-content .location {
  color: #555;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
}

.details-content .description {
  margin: 1rem 0;
  font-size: 1.1rem;
  line-height: 1.4;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s ease;
}

.expand-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.expand-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 2rem;
}
</style>
