import { db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const defaultAvailabilityConfig = {
  days: [
    { value: 'monday', label: 'Segunda' },
    { value: 'tuesday', label: 'Terça' },
    { value: 'wednesday', label: 'Quarta' },
    { value: 'thursday', label: 'Quinta' },
    { value: 'friday', label: 'Sexta' },
    { value: 'saturday', label: 'Sábado' },
    { value: 'sunday', label: 'Domingo' }
  ],
  shifts: [
    { value: 'morning', label: 'Manhã' },
    { value: 'afternoon', label: 'Tarde' },
    { value: 'evening', label: 'Noite' }
  ],
  frequency: [
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quinzenal' },
    { value: 'sporadic', label: 'Esporádico' }
  ],
  preference: [
    { value: 'onsite', label: 'Presencialmente' },
    { value: 'remote', label: 'Remotamente' },
    { value: 'both', label: 'Ambos' }
  ]
};

export async function seedAvailabilityConfig(config = defaultAvailabilityConfig) {
  await setDoc(doc(db, 'config', 'availabilityConfig'), config, { merge: true });
}


