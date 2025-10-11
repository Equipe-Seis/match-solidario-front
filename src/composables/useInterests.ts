import { ref } from 'vue';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { defaultInterests } from '@/seeds/interests.seed';

export default function useInterests() {
  const interestsOptions = ref<string[]>([]);
  const selectedInterests = ref<string[]>([]);

  async function loadInterests() {
    try {
      const snap = await getDoc(doc(db, 'config', 'interesses'));
      if (snap.exists()) {
        const data: any = snap.data();
        const opts = Array.isArray(data?.options) ? data.options.filter((x: any) => typeof x === 'string') : [];
        interestsOptions.value = opts.length ? opts : defaultInterests;
      } else {
        interestsOptions.value = defaultInterests;
      }
    } catch {
      interestsOptions.value = defaultInterests;
    }
  }

  function toggleInterest(label: string, checked: boolean) {
    if (checked) {
      if (!selectedInterests.value.includes(label)) selectedInterests.value.push(label);
    } else {
      selectedInterests.value = selectedInterests.value.filter(l => l !== label);
    }
  }

  return { interestsOptions, selectedInterests, loadInterests, toggleInterest };
}


