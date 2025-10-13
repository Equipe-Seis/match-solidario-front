<template>
    <ion-page>
        <div class="main">
            <div class="card-stack">
                <transition-group name="swipe" tag="div" v-if="currentIndex <= cards.length - 1">
                    <div v-for="(card, index) in visibleCards" :key="card.id" class="card"
                        :style="{ zIndex: visibleCards.length - index }">
                        <img :src="card.image" alt="card image" />
                        <div class="overlay">
                            <div style="display: flex; flex-direction: column; gap: 5px;">
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
                        style="display: flex; flex-direction: column; text-align: center; width: 100%; height: 100%; justify-content: center; align-items: center; font-size: 1.5rem;">
                        <p>Você finalizou por hoje!</p>
                        <p>Novos projetos estarão disponíveis amanhã.</p>
                        <p>ou</p>
                        <p>
                            Clique no botão
                            <ion-icon slot="icon-only" size="small" color="medium" :icon="reloadSharp"></ion-icon>
                            para recomeçar.
                        </p>

                    </div>
                </div>
            </div>

            <div class="actions">
                <ion-button shape="round" color="white" size="large" @click="reset">
                    <ion-icon slot="icon-only" color="medium" :icon="reloadSharp"></ion-icon>
                </ion-button>
                <ion-button shape="round" color="white" size="large" @click="swipeLeft">
                    <ion-icon slot="icon-only" color="danger" :icon="closeOutline"></ion-icon>
                </ion-button>
                <ion-button shape="round" color="white" size="large" @click="swipeRight">
                    <ion-icon slot="icon-only" color="primary" :icon="heart"></ion-icon>
                </ion-button>
            </div>
        </div>
    </ion-page>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { closeOutline, heart, location, reloadSharp } from 'ionicons/icons';

const cards = ref([
    { id: 1, name: 'Limpeza Rio Jacuí', description: 'Limpar o rio vai fazer bem para todos', location: 'Caldas Rosas, SP', image: 'https://docs-demo.ionic.io/assets/madison.jpg' },
    { id: 2, name: 'Sopa solidaria', description: 'Vamos fazer sopa para todos os moradores que foram afetados',location: 'Caldas Rosas, SP', image: 'https://picsum.photos/400/600?random=2' },
    { id: 3, name: '1 real', description: 'Ajude na cozinha do 1 real por favor, estamos precisando',location: 'Caldas Rosas, SP', image: 'https://picsum.photos/400/600?random=3' },
    { id: 4, name: 'Formatar computadores', description: '', image: 'https://picsum.photos/400/600?random=4',location: 'Caldas Rosas, SP', },
]);

const currentIndex = ref(0);
const visibleCards = computed(() => cards.value.slice(currentIndex.value, currentIndex.value + 3));

const swipeLeft = () => {
    if (currentIndex.value < cards.value.length)
        currentIndex.value++;
}

const swipeRight = () => {
    if (currentIndex.value < cards.value.length)
        currentIndex.value++;
}

const reset = () => {
    currentIndex.value = 0;
}

</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: #f8f9fa;
    overflow: hidden;
    position: relative;
}

.card-stack {
    position: relative;
    width: 90%;
    height: 70%;
}

.card {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background: #000;
    transition: transform 0.4s ease, opacity 0.3s ease;
    &.transparent {
            background: #fff;
        }
}

.card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.overlay-text {
    position: absolute;
    bottom: 40px;
    left: 20px;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
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

    .subtitle {
        font-weight: 100;
        font-size: 1rem;
        text-overflow: ellipsis;
        width: 90%;
        text-wrap: nowrap;
        overflow: hidden;
        white-space: nowrap;
    }

    .location {
        font-weight: bold;
        font-size: 0.875rem;
    }
}

.swipe-leave-active {
    transform: translateX(-150%) rotate(-15deg);
    opacity: 0;
}

.swipe-enter-active {
    transform: translateX(0%) rotate(0deg);
    opacity: 1;
}

.actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 2rem;
}
</style>
