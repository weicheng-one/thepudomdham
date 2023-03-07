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
import type Data from '@/types/Data';

export const useStorageStore = defineStore('storage', () => {
  const notificationStore = useNotificationStore();
  const storage = getStorage();
  const openFileManager = vueRef(false);
  const imagesRef = ref(storage, 'images/');
  const files = useLocalStorage<Data[]>('storage:data', []);

  async function filesGet() {
    //Start getting all files
    files.value = [];
    try {
      const res = await listAll(imagesRef);
      res.items.forEach(async (itemRef) => {
        const url = await getDownloadURL(ref(storage, itemRef.fullPath));
        files.value.push({
          fullPath: itemRef.fullPath,
          name: itemRef.name,
          url: url
        });
      });
      openFileManager.value = true;
    } catch (error) {
      console.log(error);
      notificationStore.showNotification(
        1,
        'Something went wrong!',
        'Failed to get files, please contact technical support.'
      );
    }
  }

  async function fileUpload(file: File) {
    const storageRef = ref(storage, `images/${file.name}`);

    // 'file' comes from the Blob or File API
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(ref(storage, snapshot.metadata.fullPath));
      files.value.push({
        fullPath: snapshot.metadata.fullPath,
        name: snapshot.metadata.name,
        url: url
      });
    } catch (error) {
      notificationStore.showNotification(
        1,
        'Something went wrong!',
        'Failed to upload file, please contact technical support.'
      );
    }
  }
  async function fileDelete(fileFullPath: string) {
    console.log('Delete File...');
    const fileRef = ref(storage, `${fileFullPath}`);

    // Delete the file
    try {
      deleteObject(fileRef);
      files.value = files.value.filter((file) => file.fullPath != fileFullPath);
    } catch (error) {
      notificationStore.showNotification(
        1,
        'Something went wrong!',
        'Failed to delete file, please contact technical support.'
      );
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
