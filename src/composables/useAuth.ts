import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const user = ref<any>(null);
const token = ref<string | null>(null);

export function useAuth() {
  const router = useRouter();

  async function login(email: string, password: string) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      user.value = cred.user;
      token.value = await cred.user.getIdToken();

      // salva localmente o token (útil no APK)
      localStorage.setItem("authToken", token.value);
      localStorage.setItem("userEmail", user.value.email);

      return true;
    } catch (err) {
      console.error("Erro no login:", err);
      throw err;
    }
  }

  async function logout() {
    await signOut(auth);
    user.value = null;
    token.value = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/login");
  }

  // Recarrega o token se já tiver salvo (mantém sessão)
  function loadSession() {
    const savedToken = localStorage.getItem("authToken");
    const savedEmail = localStorage.getItem("userEmail");
    if (savedToken && savedEmail) {
      token.value = savedToken;
      user.value = { email: savedEmail };
    }
  }

  return { user, token, login, logout, loadSession };
}
