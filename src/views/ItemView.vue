<!--TODO: remover este arquivo antes da entrega, exemplo de utilização do firebase-->

<template>
  <ion-page>
    <ion-header><ion-toolbar><ion-title>Items</ion-title></ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="item in items" :key="item.id">
          <ion-label>{{ item.name }}</ion-label>
          <ion-button slot="end" @click="remove(item.id)">Excluir</ion-button>
        </ion-item>
      </ion-list>

      <ion-button expand="block" @click="addRandom">Adicionar aleatório</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import useFirestore from "@/composables/useFirestore";

const { addItem, subscribeItems, deleteItem } = useFirestore("items");
const items = ref<any[]>([]);
let unsub: (() => void) | null = null;

onMounted(() => {
  unsub = subscribeItems((data) => items.value = data);
});

onUnmounted(() => {
  if (unsub) unsub();
});

async function addRandom() {
  await addItem({ name: "Item " + Math.random().toString(36).slice(2,8) });
}

async function remove(id: string) {
  await deleteItem(id);
}
</script>
