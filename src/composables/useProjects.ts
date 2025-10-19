import { db } from "@/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { ref } from "vue";

export interface Service {
  description?: string,
  categories?: string[]
}

export interface Project {
  id: string;
  name: string;
  city?: string;
  state?: string;
  address?: string;
  description?: string;
  imageUrl?: string;
  services?: Service[] 
}

export const useProjects = () => {
  const loading = ref(false);
  const isError = ref(false);
  const error = ref("");
  const projects = ref<Project[]>([]);

  const load = async () => {
    loading.value = true;

    try {
      const servicesCollection = collection(db, "projects");
      const q = query(servicesCollection, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);

      const fetchedServices: Project[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        fetchedServices.push({
          id: doc.id,
          name: data.name,
          description: data.description,
          address: data.address,
          city: data.city,
          state: data.state,
          services: data.services
        });
      });

      projects.value = fetchedServices;
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
    projects,
    load
  }
};
