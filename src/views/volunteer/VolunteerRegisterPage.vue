<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Cadastro de Voluntário</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="volunteer-register">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Perfil Pessoal</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <form @submit.prevent="onSubmitUi">

              <ion-item>
                <ion-label position="stacked">Nome completo</ion-label>
                <ion-input
                  v-model="form.fullName"
                  required
                  autocomplete="name"
                  placeholder="Seu nome"
                />
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Data de nascimento</ion-label>
                <ion-input
                  v-model="form.birthDate"
                  type="date"
                  required
                />
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Gênero (opcional)</ion-label>
                <ion-select v-model="form.gender" interface="popover" placeholder="Selecione">
                  <ion-select-option value="feminino">Feminino</ion-select-option>
                  <ion-select-option value="masculino">Masculino</ion-select-option>
                  <ion-select-option value="nao-informar">Prefiro não informar</ion-select-option>
                </ion-select>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Cidade</ion-label>
                <ion-input v-model="form.city" placeholder="Ex.: Recife" inputmode="text" required />
                <ion-button slot="end" size="small" :disabled="geoLoading" @click="fillCityStateFromLocation">
                  Usar localização
                </ion-button>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">UF</ion-label>
                <ion-input v-model="form.state" placeholder="Ex.: PE" inputmode="text" required />
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Telefone / WhatsApp</ion-label>
                <ion-input
                  v-model="form.phone"
                  type="tel"
                  inputmode="tel"
                  placeholder="(00) 90000-0000"
                  @ionInput="onPhoneInput"
                  :maxlength="15"
                  required
                />
              </ion-item>

              <ion-item lines="none">
                <ion-label position="stacked">Foto de perfil (opcional)</ion-label>
                <input class="file-input" type="file" accept="image/*" @change="onFileChange" />
              </ion-item>

              <ion-item>
                <ion-label position="stacked">CPF (opcional)</ion-label>
                <ion-input v-model="form.cpf" inputmode="numeric" placeholder="Somente números" @ionInput="onCpfInput" :maxlength="14" />
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Descrição (opcional)</ion-label>
                <ion-textarea v-model="form.description" placeholder="Conte um pouco sobre você e coloque links de redes sociais se quiser" auto-grow />
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
        <ion-button expand="block" @click="onSubmitUi" :disabled="submitting || !isValid">
          {{ submitting ? 'Enviando...' : 'Salvar' }}
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
  
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonList,
  IonChip,
  IonFooter
} from '@ionic/vue';
import useInterests from '@/composables/useInterests';
import useVolunteerRegistration from '@/composables/useVolunteerRegistration';
import useAvailability from '@/composables/useAvailability';
import useGeolocation from '@/composables/useGeolocation';
import { toastController } from '@ionic/vue';

const route = useRoute();
const { interestsOptions, selectedInterests, loadInterests, toggleInterest } = useInterests();
const { form, submitting, onFileChange, onPhoneInput, onCpfInput, submit } = useVolunteerRegistration();
const { config: availabilityConfig, selected: availabilitySelected, loadAvailability, toggleInArray } = useAvailability();
const { loading: geoLoading, requestCityState } = useGeolocation();

onMounted(async () => {
  await Promise.all([loadInterests(), loadAvailability()]);
});

async function onSubmitUi() {
  try {
    const userId = (route.query.userId as string) || undefined;
    const res = await submit(selectedInterests.value, {
      days: availabilitySelected.days,
      shifts: availabilitySelected.shifts,
      frequency: availabilitySelected.frequency,
      preference: availabilitySelected.preference
    }, userId);
    if ((res as any)?.ok) {
      const t = await toastController.create({ message: 'Cadastro salvo com sucesso!', duration: 1800, color: 'success' });
      await t.present();
    }
  } catch (e) {
    const t = await toastController.create({ message: 'Falha ao salvar. Tente novamente.', duration: 2000, color: 'danger' });
    await t.present();
  }
}

const isValid = computed(() => {
  const hasBase = Boolean(form.fullName && form.phone && form.city && form.state);
  const hasInterests = selectedInterests.value.length > 0;
  const hasDays = availabilitySelected.days.length > 0;
  const hasShifts = availabilitySelected.shifts.length > 0;
  const hasFreq = !!availabilitySelected.frequency;
  const hasPref = !!availabilitySelected.preference;
  return hasBase && hasInterests && hasDays && hasShifts && hasFreq && hasPref;
});

async function fillCityStateFromLocation() {
  const loadingToast = await toastController.create({ message: 'Obtendo sua localização...', duration: 0, position: 'bottom' });
  await loadingToast.present();
  try {
    const result = await requestCityState();
    await loadingToast.dismiss();
    if (result) {
      form.city = result.city;
      form.state = result.state;
      const t = await toastController.create({ message: 'Cidade/UF preenchidos pela sua localização', duration: 1600, color: 'success' });
      await t.present();
    } else {
      const t = await toastController.create({ message: 'Não foi possível obter sua localização', duration: 1800, color: 'medium' });
      await t.present();
    }
  } catch (e: any) {
    await loadingToast.dismiss();
    const t = await toastController.create({ message: e?.message || 'Falha ao obter localização', duration: 2000, color: 'danger' });
    await t.present();
  }
}
</script>

<style lang="scss" scoped>
.volunteer-register {
  padding: 16px;
}

.file-input {
  margin-top: 8px;
}

.actions {
  margin-top: 16px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>


