import { db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const defaultInterests = [
  'Meio ambiente',
  'Educação',
  'Saúde',
  'Inclusão social',
  'Animais',
  'Cultura e arte',
  'Direitos humanos'
];

export async function seedInterests(options: string[] = defaultInterests) {
  await setDoc(doc(db, 'config', 'interesses'), { options }, { merge: true });
}


