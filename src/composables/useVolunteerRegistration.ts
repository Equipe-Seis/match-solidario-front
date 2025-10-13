import { reactive, ref } from 'vue';
import useFirestore from '@/composables/useFirestore';
import { storage, db } from '@/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

export type VolunteerForm = {
  fullName: string;
  birthDate: string;
  gender: string;
  city: string;
  state: string;
  phone: string;
  cpf: string;
  description: string;
  photoFile: File | null;
};

export default function useVolunteerRegistration() {
  const form = reactive<VolunteerForm>({
    fullName: '',
    birthDate: '',
    gender: '',
    city: '',
    state: '',
    phone: '',
    cpf: '',
    description: '',
    photoFile: null
  });

  const submitting = ref(false);
  const { addItem } = useFirestore('volunteers');

  function onFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    form.photoFile = target.files && target.files[0] ? target.files[0] : null;
  }

  function onlyDigits(value: string): string {
    return (value || '').replace(/\D+/g, '');
  }

  function formatPhoneInput(value: string): string {
    const digits = onlyDigits(value).slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7,11)}`;
  }

  function formatCpfInput(value: string): string {
    const digits = onlyDigits(value).slice(0, 11);
    const p1 = digits.slice(0, 3);
    const p2 = digits.slice(3, 6);
    const p3 = digits.slice(6, 9);
    const p4 = digits.slice(9, 11);
    let out = p1;
    if (p2) out += `.${p2}`;
    if (p3) out += `.${p3}`;
    if (p4) out += `-${p4}`;
    return out;
  }

  function onPhoneInput(ev: any) {
    const val = ev?.detail?.value ?? '';
    form.phone = formatPhoneInput(val);
  }

  function onCpfInput(ev: any) {
    const val = ev?.detail?.value ?? '';
    form.cpf = formatCpfInput(val);
  }

  async function submit(selectedInterests: string[], availability?: { days: string[]; shifts: string[]; frequency: string; preference: string; }, userId?: string) {
    if (!form.fullName || !form.birthDate || !form.city || !form.state || !form.phone) return;
    submitting.value = true;
    try {
      let photoUrl: string | null = null;
      if (form.photoFile) {
        const path = `volunteers/${Date.now()}_${form.photoFile.name}`;
        const fileRef = storageRef(storage, path);
        const contentType = form.photoFile.type || 'image/jpeg';
        await uploadBytes(fileRef, form.photoFile, { contentType });
        photoUrl = await getDownloadURL(fileRef);
      }

      const phoneDigits = onlyDigits(form.phone);
      const cpfDigits = onlyDigits(form.cpf);

      const volunteerId = await addItem({
        fullName: form.fullName,
        birthDate: form.birthDate,
        gender: form.gender || null,
        city: form.city,
        state: form.state,
        phone: phoneDigits,
        cpf: cpfDigits || null,
        description: form.description || null,
        photoUrl,
        interests: selectedInterests,
        availability: availability || null,
        userId: userId || null
      });
      if (userId) {
        await updateDoc(doc(db, 'users', userId), { volunteerId, role: 'volunteer' });
      }
      return { ok: true } as const;
    } finally {
      submitting.value = false;
    }
  }

  async function updateVolunteer(id: string, selectedInterests: string[], availability?: { days: string[]; shifts: string[]; frequency: string; preference: string; }) {
    if (!id) return;
    if (!form.fullName || !form.city || !form.state || !form.phone) return;
    submitting.value = true;
    try {
      let photoUrl: string | null | undefined = undefined;
      if (form.photoFile) {
        const path = `volunteers/${Date.now()}_${form.photoFile.name}`;
        const fileRef = storageRef(storage, path);
        const contentType = form.photoFile.type || 'image/jpeg';
        await uploadBytes(fileRef, form.photoFile, { contentType });
        photoUrl = await getDownloadURL(fileRef);
      }
      const phoneDigits = onlyDigits(form.phone);
      const cpfDigits = onlyDigits(form.cpf);
      const payload: Record<string, any> = {
        fullName: form.fullName,
        birthDate: form.birthDate || null,
        gender: form.gender || null,
        city: form.city,
        state: form.state,
        phone: phoneDigits,
        cpf: cpfDigits || null,
        description: form.description || null,
        interests: selectedInterests,
        availability: availability || null
      };
      if (photoUrl !== undefined) payload.photoUrl = photoUrl;
      await updateDoc(doc(db, 'volunteers', id), payload);
      return { ok: true } as const;
    } finally {
      submitting.value = false;
    }
  }

  return { form, submitting, onFileChange, onPhoneInput, onCpfInput, submit, updateVolunteer };
}


