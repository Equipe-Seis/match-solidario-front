import { ref, reactive } from 'vue';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { defaultAvailabilityConfig } from '@/seeds/availability-config.seed';

export type LabeledOption = { value: string; label: string };
export type AvailabilityConfig = {
  days: LabeledOption[];
  shifts: LabeledOption[];
  frequency: LabeledOption[];
  preference: LabeledOption[];
};

export type AvailabilitySelected = {
  days: string[];
  shifts: string[];
  frequency: string;
  preference: string;
};

export default function useAvailability() {
  const config = ref<AvailabilityConfig>(defaultAvailabilityConfig);
  const selected = reactive<AvailabilitySelected>({
    days: [],
    shifts: [],
    frequency: '',
    preference: ''
  });

  function isLabeledOption(x: any): x is LabeledOption {
    return x && typeof x.value === 'string' && typeof x.label === 'string';
  }

  function coerceOptions(arr: any, fallback: LabeledOption[]): LabeledOption[] {
    if (Array.isArray(arr)) {
      const filtered = arr.filter(isLabeledOption);
      if (filtered.length) return filtered as LabeledOption[];
    }
    return fallback;
  }

  async function loadAvailability() {
    try {
      const snap = await getDoc(doc(db, 'config', 'availabilityConfig'));
      if (snap.exists()) {
        const data = snap.data() as Partial<AvailabilityConfig> | any;
        config.value = {
          days: coerceOptions(data?.days, defaultAvailabilityConfig.days),
          shifts: coerceOptions(data?.shifts, defaultAvailabilityConfig.shifts),
          frequency: coerceOptions(data?.frequency, defaultAvailabilityConfig.frequency),
          preference: coerceOptions(data?.preference, defaultAvailabilityConfig.preference),
        };
      } else {
        config.value = defaultAvailabilityConfig;
      }
    } catch {
      config.value = defaultAvailabilityConfig;
    }
  }

  function toggleInArray(arr: string[], value: string, checked: boolean) {
    if (checked) {
      if (!arr.includes(value)) arr.push(value);
    } else {
      const idx = arr.indexOf(value);
      if (idx !== -1) arr.splice(idx, 1);
    }
  }

  return { config, selected, loadAvailability, toggleInArray };
}


