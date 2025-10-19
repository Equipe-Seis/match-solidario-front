<template>
  <ion-page>
    <ion-header class="ion-no-border" :translucent="true">
      <ion-toolbar color="transparent">
        <ion-title></ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="secondary">
          <ion-button>
            <ion-icon slot="icon-only" :icon="personOutline" size="large" href="/profile" </ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <div class="main">
      <!-- Stack de cards -->
      <div class="card-stack" v-if="!selectedCard">
        <transition-group
          name="swipe"
          tag="div"
          v-if="currentIndex <= cards.length - 1"
        >
          <div
            v-for="(card, index) in visibleCards"
            :key="card.id"
            class="card"
            :style="{ zIndex: visibleCards.length - index }"
            @click="openDetails(card)"
          >
            <img :src="card.image" alt="card image" />
            <div class="overlay">
              <div style="display: flex; flex-direction: column; gap: 5px">
                <span>{{ card.name }}</span>
                <span class="subtitle">{{ card.description }}</span>
                <span class="location">
                  {{ card.location }}
                  <ion-icon :icon="location"></ion-icon>
                </span>
              </div>
            </div>
          </div>
        </transition-group>

        <div class="card transparent" v-else>
          <div
            style="
              display: flex;
              flex-direction: column;
              text-align: center;
              width: 100%;
              height: 100%;
              justify-content: center;
              align-items: center;
              font-size: 20px;
            "
          >
            <p>Você finalizou por hoje!</p>
            <p>Novos projetos estarão disponíveis amanhã.</p>
            <p>ou</p>
            <p>
              Clique no botão
              <ion-icon
                slot="icon-only"
                size="small"
                color="medium"
                :icon="refreshOutline"
              ></ion-icon>
              para recomeçar.
            </p>
          </div>
        </div>
      </div>

      <!-- DETAILS -->
      <transition name="expand">
        <div v-if="selectedCard" class="details-view">
          <img
            :src="selectedCard.image"
            class="details-image"
            alt="Detalhe do projeto"
          />
          <ion-icon
            :icon="closeOutline"
            class="back-icon"
            @click="closeDetails"
          />

          <div class="details-content">
            <h1>{{ selectedCard.name }}</h1>
            <div class="location">
              <ion-icon :icon="location"></ion-icon>
              {{ selectedCard.location }}
            </div>

            <p class="description">{{ selectedCard.description }}</p>

            <ion-button expand="block" color="primary" shape="round">
              Participar
            </ion-button>

            <div>
              <h2 style="border-bottom: 2px solid #666">Galeria de fotos</h2>
              <ion-grid>
                <ion-row>
                  <ion-col v-for="i in 20" size="6">
                    <img :src="selectedCard.image" alt="Detalhe do projeto" />
                  </ion-col>
                </ion-row>
              </ion-grid>
            </div>
          </div>
        </div>
      </transition>

      <div v-if="!selectedCard" class="actions">
        <ion-button shape="round" color="white" size="large" @click="reset">
          <ion-icon
            slot="icon-only"
            color="medium"
            :icon="refreshOutline"
          ></ion-icon>
        </ion-button>
        <ion-button shape="round" color="white" size="large" @click="undo">
          <ion-icon
            slot="icon-only"
            color="warning"
            :icon="arrowUndoOutline"
          ></ion-icon>
        </ion-button>
        <ion-button shape="round" color="white" size="large" @click="swipe">
          <ion-icon
            slot="icon-only"
            color="danger"
            :icon="closeOutline"
          ></ion-icon>
        </ion-button>
        <ion-button shape="round" color="white" size="large" @click=""> <!--favorite-->
          <ion-icon
            slot="icon-only"
            color="primary"
            :icon="starOutline"
          ></ion-icon>
        </ion-button>
        <ion-button
          shape="round"
          color="white"
          size="large"
          @click="swipe"
        >
          <ion-icon slot="icon-only" color="success" :icon="heartOutline"></ion-icon>
        </ion-button>
      </div>
    </div>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import {
  closeOutline,
  location,
  reloadSharp,
  personOutline,
  heartOutline,
  arrowUndoOutline,
  starOutline,
  refreshOutline,
} from "ionicons/icons";

type Card = {
  id: number;
  name: string;
  description: string;
  location: string;
  image: string;
};

const cards = ref<Card[]>([
  {
    id: 1,
    name: "Limpeza Rio Jacuí",
    description:
      "Limpar o rio vai fazer bem para todos, a população não aguenta mais estamos todos deseperados.",
    location: "Caldas Rosas, SP",
    image: "https://docs-demo.ionic.io/assets/madison.jpg",
  },
  {
    id: 2,
    name: "Sopa solidária",
    description: "Vamos fazer sopa para todos os moradores afetados",
    location: "Caldas Rosas, SP",
    image: "https://picsum.photos/400/600?random=2",
  },
  {
    id: 3,
    name: "1 real",
    description: "Ajude na cozinha do 1 real por favor, estamos precisando",
    location: "Caldas Rosas, SP",
    image: "https://picsum.photos/400/600?random=3",
  },
  {
    id: 4,
    name: "Formatar computadores",
    description:
      "Precisamos de voluntários para formatar PCs de escolas locais.",
    location: "Caldas Rosas, SP",
    image: "https://picsum.photos/400/600?random=4",
  },
]);

const currentIndex = ref(0);
const selectedCard = ref<Card | null>(null);

const visibleCards = computed(() =>
  cards.value.slice(currentIndex.value, currentIndex.value + 3)
);

const swipe = () => {
  if (currentIndex.value < cards.value.length) currentIndex.value++;
};

const undo = () => {
  if ((currentIndex.value - 1) >= 0) currentIndex.value--;
};

const reset = () => {
  currentIndex.value = 0;
};

const openDetails = (card: any) => {
  selectedCard.value = card;
};

const closeDetails = () => {
  selectedCard.value = null;
};
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

.overlay .subtitle {
  font-weight: 100;
  font-size: 1rem;
  text-overflow: ellipsis;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
}

.overlay .location {
  font-weight: bold;
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

/* === ANIMAÇÃO === */
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
