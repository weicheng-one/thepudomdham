import { defineStore } from 'pinia';
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject
} from 'firebase/storage';
import { ref as vueRef } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useNotificationStore } from '@/stores/NotificationStore';
import type StorageData from '@/types/StorageData';

export const useStorageStore = defineStore('storage', () => {
  const notificationStore = useNotificationStore();
  const storage = getStorage();
  const openFileManager = vueRef(false);
  const storageRef = ref(storage, '/');
  const files = useLocalStorage<StorageData[]>('storage:data', []);

  async function filesGet() {
    //Start getting all files
    files.value = [];
    try {
      const res = await listAll(storageRef);
      res.items.forEach(async (itemRef) => {
        const url = await getDownloadURL(ref(storage, itemRef.fullPath));
        files.value.push({
          fullPath: itemRef.fullPath,
          name: itemRef.name,
          url: url
        });
      });
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }

  async function fileUpload(file: File) {
    const storageRef = ref(storage, `/${file.name}`);

    // 'file' comes from the Blob or File API
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(ref(storage, snapshot.metadata.fullPath));
      files.value.push({
        fullPath: snapshot.metadata.fullPath,
        name: snapshot.metadata.name,
        url: url
      });
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function fileDelete(fileFullPath: string) {
    const fileRef = ref(storage, `${fileFullPath}`);
    // Delete the file
    try {
      await deleteObject(fileRef);
      files.value = files.value.filter((file) => file.fullPath != fileFullPath);
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  return {
    filesGet,
    fileUpload,
    fileDelete,
    openFileManager,
    files
  };
});
