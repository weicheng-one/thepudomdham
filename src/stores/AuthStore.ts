import { defineStore } from 'pinia';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { useNotificationStore } from './NotificationStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const notificationStore = useNotificationStore();
  const auth = getAuth();
  const user = ref(auth.currentUser);
  const router = useRouter();

  onAuthStateChanged(auth, (u) => {
    user.value = u;
  });

  async function userSignIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push({ name: 'home' });
      notificationStore.showNotification(
        0,
        'Signed in',
        `Hi ${user.value?.displayName ? user.value?.displayName : user.value?.email}, welcome back!`
      );
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function userSignOut() {
    try {
      await signOut(auth);
      notificationStore.showNotification(
        0,
        'Successfully logged out',
        'Welcome to log in again to gain full access.'
      );
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function userForgot(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      notificationStore.showNotification(
        0,
        'Operation succeeded',
        'The password reset link has been sent to your email. Please click the link in the email to reset your password.'
      );
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  return {
    user,
    userSignIn,
    userSignOut,
    userForgot
  };
});
