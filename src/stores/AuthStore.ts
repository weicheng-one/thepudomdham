import { defineStore } from "pinia";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useNotificationStore } from "./NotificationStore";
import { useRouter } from "vue-router";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const notificationStore = useNotificationStore();
  const auth = getAuth();
  const user = ref(auth.currentUser);
  const router = useRouter();

  onAuthStateChanged(auth, (u) => {
    user.value = u;
  });

  async function signInUser(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push({ name: "home" });
      notificationStore.showNotification(
        0,
        "Signed in",
        `Hi ${
          user.value?.displayName ? user.value?.displayName : user.value?.email
        }, welcome back!`
      );
    } catch (error: any) {
      console.log(error);
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function signOutUser() {
    try {
      await signOut(auth);
      notificationStore.showNotification(
        0,
        "Sign-out successful.",
        "See you next time!"
      );
    } catch (error: any) {
      console.log(error);
    }
  }
  return {
    user,
    signInUser,
    signOutUser,
  };
});
