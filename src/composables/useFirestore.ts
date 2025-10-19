import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function useFirestore(collectionName = "items") {
  const colRef = collection(db, collectionName);

  async function addItem(data: Record<string, any>) {
    const docRef = await addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }

  async function getItems() {
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  function subscribeItems(onChange: (items: any[]) => void) {
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onChange(items);
    });
    return unsub;
  }

  async function getItem(id: string) {
    const d = await getDoc(doc(db, collectionName, id));
    if (!d.exists()) return null;
    return { id: d.id, ...d.data() };
  }

  async function updateItem(id: string, data: Record<string, any>) {
    await updateDoc(doc(db, collectionName, id), data);
  }

  async function deleteItem(id: string) {
    await deleteDoc(doc(db, collectionName, id));
  }

  return { addItem, getItems, subscribeItems, getItem, updateItem, deleteItem };
}
