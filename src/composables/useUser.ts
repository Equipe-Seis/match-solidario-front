import { ref } from "vue";
import { Project } from "./useProjects";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase";

export interface User {
  favorites?: Project[];
}

export const useUser = () => {
  const loading = ref(false);
  const isError = ref(false);
  const error = ref("");
  const user = ref<User>();

  const load = async () => {
    loading.value = true;

    try {
      const authUser = auth.currentUser;
      console.log(authUser);
      
       
      if (!authUser) {
        return;
      }

      const userSnap = await getDoc(doc(db, "users", authUser.uid));

      if (userSnap.exists()) {
        user.value = userSnap.data() as User;
      }
    } catch (error) {
      console.error("Erro ao buscar as informações do usuário:", error);
    } finally {
      loading.value = false;
    }
  };

  const favorite = async (projectId: string) => {
    loading.value = true;
    try {
      const authUser = auth.currentUser;
      if (!authUser) return;

      const userRef = doc(db, "users", authUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const data = userSnap.data() as User;

      const projectRef = doc(db, "projects", projectId);
      const projectSnap = await getDoc(projectRef);
      const project = projectSnap.data() as Project;
        
      const projectToAdd = {
        id: projectSnap.id,
        ...projectSnap.data(),
      } as Project;

      const isAlreadyFavorite = data.favorites?.some((x) => x.id == projectSnap.id);

      console.log('remove', isAlreadyFavorite);

      await updateDoc(userRef, {
        favorites: isAlreadyFavorite
          ? arrayRemove(projectToAdd)
          : arrayUnion(projectToAdd),
      });

      await load()
    } catch (err) {
      console.error("Erro ao salvar os favoritos:", err);
      isError.value = true;
      error.value = "Erro ao salvar favorito";
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    isError,
    error,
    user,
    favorite,
    load,
  };
};
