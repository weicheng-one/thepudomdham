import { defineStore } from 'pinia';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { useNotificationStore } from './NotificationStore';
import { useRouter, useRoute } from 'vue-router';
import type { User } from 'firebase/auth';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const notificationStore = useNotificationStore();
  const auth = getAuth();
  const user = useLocalStorage<User | null>('auth:user', null);
  const router = useRouter();
  const route = useRoute();

  async function userSignIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      user.value = auth.currentUser;
      const redirect = route.query.redirect;
      if (redirect) {
        router.push(`${redirect}`);
      } else {
        router.push({ name: 'home' });
      }
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
      user.value = null;
      router.push({ name: 'home' });
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
