import { db } from "@/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { ref } from "vue";

interface Service {
  id: string;
  title: string;
  projectName: string;
  categories: string[];
  imageUrl?: string;
  address?: string;
}

export const useServices = () => {
  const loading = ref(false);
  const isError = ref(false);
  const error = ref("");
  const services = ref<Service[]>();

  const load = async () => {
    loading.value = true;

    try {
      const servicesCollection = collection(db, "services");
      const q = query(servicesCollection, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);

      const fetchedServices: Service[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        
        fetchedServices.push({
          id: doc.id,
          title: data.title,
          projectName: data.projectName,
          categories: data.categories || [],
          imageUrl: data.imageUrl,
          address: data.address,
        });
      });

      services.value = fetchedServices;
    } catch (error) {
      console.error("Erro ao os projetos:", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    isError,
    services,
    load
  }
};
