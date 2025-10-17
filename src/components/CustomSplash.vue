<template>
  <div v-if="visible" class="custom-splash">
    <div class="splash-content">
      <img src="/assets/splash.png" alt="Logo" class="splash-img" />
      <div class="app-name">
        <ion-text color="primary"><h1 class="app-name-title">Match<br>Solidário</h1></ion-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { SplashScreen } from "@capacitor/splash-screen";

const visible = ref(true);

onMounted(async () => {
  try {
    await new Promise((r) => setTimeout(r, 1400));

    await SplashScreen.hide();
  } catch (e) {
  } finally {
    await new Promise((r) => setTimeout(r, 200));
    visible.value = false;
  }
});
</script>

<style scoped>
.custom-splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
}

.app-name-title {
    font-weight: bold;
    font-size: 60px;
}

.splash-content {
  text-align: center;
}
.splash-img {
  width: 180px;
  height: 180px;
  object-fit: contain;
  animation: pop 900ms ease-out;
}
.app-name {
  margin-top: 12px;
  font-weight: 600;
  font-size: 18px;
  color: #333;
}

@keyframes pop {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  60% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
</style>
