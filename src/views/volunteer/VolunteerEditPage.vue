<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Editar Voluntário</ion-title>
        <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="volunteer-edit ion-padding">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Dados do Perfil</ion-card-title>
          </ion-card-header>
<ion-card-content>
            <form @submit.prevent="onSaveUi">
              <ion-item>
                <ion-label position="stacked">Nome completo</ion-label>
                <ion-input v-model="form.fullName" required />
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Telefone</ion-label>
                <ion-input v-model="form.phone" @ionInput="onPhoneInput" :maxlength="15" />
              </ion-item>
              <ion-item>
                <ion-label position="stacked">CPF (opcional)</ion-label>
                <ion-input v-model="form.cpf" @ionInput="onCpfInput" :maxlength="11" />
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Cidade</ion-label>
                <ion-input v-model="form.city" />
              </ion-item>
              <ion-item>
                <ion-label position="stacked">UF</ion-label>
                <ion-input v-model="form.state" />
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Descrição</ion-label>
                <ion-textarea v-model="form.description" auto-grow />
              </ion-item>
              <ion-item lines="none">
                <ion-label position="stacked">Foto de perfil (opcional)</ion-label>
                <input class="file-input" type="file" accept="image/*" @change="onFileChange" />
              </ion-item>
              <div class="actions"></div>
            </form>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>Interesses</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="chips">
              <ion-chip
                v-for="label in interestsOptions"
                :key="label"
                :color="selectedInterests.includes(label) ? 'primary' : undefined"
                :outline="!selectedInterests.includes(label)"
                @click="toggleInterest(label, !selectedInterests.includes(label))"
              >
                {{ label }}
              </ion-chip>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>Disponibilidade</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item lines="full">
                <ion-label> Dias disponíveis </ion-label>
              </ion-item>
              <div class="chips">
                <ion-chip
                  v-for="d in availabilityConfig.days"
                  :key="d.value"
                  :color="availabilitySelected.days.includes(d.value) ? 'primary' : undefined"
                  :outline="!availabilitySelected.days.includes(d.value)"
                  @click="toggleInArray(availabilitySelected.days, d.value, !availabilitySelected.days.includes(d.value))"
                >
                  {{ d.label }}
                </ion-chip>
              </div>

              <ion-item lines="full" style="margin-top:8px">
                <ion-label> Turnos </ion-label>
              </ion-item>
              <div class="chips">
                <ion-chip
                  v-for="s in availabilityConfig.shifts"
                  :key="s.value"
                  :color="availabilitySelected.shifts.includes(s.value) ? 'primary' : undefined"
                  :outline="!availabilitySelected.shifts.includes(s.value)"
                  @click="toggleInArray(availabilitySelected.shifts, s.value, !availabilitySelected.shifts.includes(s.value))"
                >
                  {{ s.label }}
                </ion-chip>
              </div>

              <ion-item lines="full" style="margin-top:8px">
                <ion-label> Frequência </ion-label>
              </ion-item>
              <div class="chips">
                <ion-chip
                  v-for="f in availabilityConfig.frequency"
                  :key="f.value"
                  :color="availabilitySelected.frequency === f.value ? 'primary' : undefined"
                  :outline="availabilitySelected.frequency !== f.value"
                  @click="availabilitySelected.frequency = availabilitySelected.frequency === f.value ? '' : f.value"
                >
                  {{ f.label }}
                </ion-chip>
              </div>

              <ion-item lines="full" style="margin-top:8px">
                <ion-label> Prefere atuar </ion-label>
              </ion-item>
              <div class="chips">
                <ion-chip
                  v-for="p in availabilityConfig.preference"
                  :key="p.value"
                  :color="availabilitySelected.preference === p.value ? 'primary' : undefined"
                  :outline="availabilitySelected.preference !== p.value"
                  @click="availabilitySelected.preference = availabilitySelected.preference === p.value ? '' : p.value"
                >
                  {{ p.label }}
                </ion-chip>
              </div>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button expand="block" :disabled="saving || !form.fullName" @click="onSaveUi">Salvar alterações</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toastController, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonFooter, IonButton, IonList, IonChip } from '@ionic/vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import useVolunteerRegistration from '@/composables/useVolunteerRegistration';
import useInterests from '@/composables/useInterests';
import useAvailability from '@/composables/useAvailability';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const { form, onPhoneInput, onCpfInput, onFileChange, updateVolunteer } = useVolunteerRegistration();
const { interestsOptions, selectedInterests, loadInterests, toggleInterest } = useInterests();
const { config: availabilityConfig, selected: availabilitySelected, loadAvailability, toggleInArray } = useAvailability();
const saving = ref(false);

async function load() {
  const snapshot = await getDoc(doc(db, 'volunteers', id));
  if (!snapshot.exists()) {
    const t = await toastController.create({ message: 'Voluntário não encontrado', duration: 1800, color: 'danger' });
    await t.present();
    router.back();
    return;
  }
  const data = snapshot.data() as any;
  form.fullName = data.fullName || '';
  form.birthDate = data.birthDate || '';
  form.gender = data.gender || '';
  form.city = data.city || '';
  form.state = data.state || '';
  form.phone = data.phone || '';
  form.cpf = data.cpf || '';
  form.description = data.description || '';
  // Pré-seleciona interesses e disponibilidade
  if (Array.isArray(data.interests)) selectedInterests.value = data.interests;
  if (data.availability) {
    availabilitySelected.days = Array.isArray(data.availability.days) ? data.availability.days : [];
    availabilitySelected.shifts = Array.isArray(data.availability.shifts) ? data.availability.shifts : [];
    availabilitySelected.frequency = data.availability.frequency || '';
    availabilitySelected.preference = data.availability.preference || '';
  }
}

async function onSaveUi() {
  saving.value = true;
  try {
    await updateVolunteer(id, selectedInterests.value, {
      days: availabilitySelected.days,
      shifts: availabilitySelected.shifts,
      frequency: availabilitySelected.frequency,
      preference: availabilitySelected.preference
    });
    const t = await toastController.create({ message: 'Alterações salvas', duration: 1500, color: 'success' });
    await t.present();
  } catch (e) {
    const t = await toastController.create({ message: 'Falha ao salvar', duration: 1800, color: 'danger' });
    await t.present();
  } finally {
    saving.value = false;
  }
}

onMounted(async () => {
  await Promise.all([loadInterests(), loadAvailability()]);
  await load();
});
</script>

<style scoped>
.actions { margin-top: 12px; }
</style>


