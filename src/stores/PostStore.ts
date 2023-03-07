import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { usePostsStore } from '@/stores/PostsStore';
import { useEditorStore } from '@/stores/EditorStore';

import {
  collection,
  setDoc,
  getDoc,
  getFirestore,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  deleteDoc
} from 'firebase/firestore';
import { ref, computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useNotificationStore } from '@/stores/NotificationStore';

export const usePostStore = defineStore('post', () => {
  // Stores
  const authStore = useAuthStore();
  const postsStore = usePostsStore();
  const editorStore = useEditorStore();
  const notificationStore = useNotificationStore();

  const router = useRouter();

  // Post Fields
  const content = ref<string>('');
  const date = ref<Timestamp | null>(null);
  function excerpt(): string {
    const string = content.value.match(/<p>[^<>]+<\/p>/);
    return string ? string.join('') : '';
  }
  const imageUrl = ref<string>('');
  const postId = useLocalStorage<string>('post:postId', '');
  const status = ref<'publish' | 'draft'>('draft');
  const title = ref<string>('');

  // For Fetch Data
  const postRef = computed(() => {
    return doc(getFirestore(), 'posts', postId.value);
  });

  // Fetch Data Functions
  async function postNew() {
    const newPostRef = doc(collection(getFirestore(), 'posts'));
    try {
      await setDoc(newPostRef, {
        authorId: authStore.user?.uid,
        content: '',
        date: null,
        excerpt: '',
        imageUrl: '',
        modified: serverTimestamp(),
        slug: newPostRef.id,
        status: 'draft',
        title: ''
      });

      router.push({
        name: 'post-edit',
        params: {
          postId: newPostRef.id
        }
      });
      notificationStore.showNotification(
        0,
        'Operation successful',
        'Post created successfully. You can start editing now.'
      );
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function postSave() {
    clearTimeout(editorStore.timer);
    try {
      await updateDoc(postRef.value, {
        content: content.value,
        excerpt: excerpt(),
        imageUrl: imageUrl.value,
        modified: serverTimestamp(),
        title: title.value
      });
      notificationStore.showNotification(0, 'Operation successful', 'Post saved successfully.');
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function postPublish() {
    clearTimeout(editorStore.timer);
    try {
      if (!date.value) {
        await updateDoc(postRef.value, {
          content: content.value,
          date: serverTimestamp(),
          excerpt: excerpt(),
          imageUrl: imageUrl.value,
          modified: serverTimestamp(),
          status: 'publish',
          title: title.value
        });
      } else {
        await updateDoc(postRef.value, {
          content: content.value,
          excerpt: excerpt(),
          modified: serverTimestamp(),
          status: 'publish',
          title: title.value
        });
      }
      notificationStore.showNotification(0, 'Operation successful', 'Post published successfully.');
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function postUpdate() {
    clearTimeout(editorStore.timer);
    try {
      await updateDoc(postRef.value, {
        content: content.value,
        excerpt: excerpt(),
        imageUrl: imageUrl.value,
        modified: serverTimestamp(),
        title: title.value
      });
      notificationStore.showNotification(0, 'Operation Successful', 'Post updated successfully.');
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function postDraft() {
    try {
      await updateDoc(postRef.value, {
        modified: serverTimestamp(),
        status: 'draft'
      });
    } catch (error) {
      console.log(error);
      notificationStore.showNotification(
        1,
        'Something went wrong!',
        'Failed to switch post to draft, please contact technical support.'
      );
    }
  }
  async function postGet() {
    try {
      const postSnap = await getDoc(postRef.value);
      if (postSnap.exists()) {
        content.value = postSnap.data().content;
        date.value = postSnap.data().date;
        imageUrl.value = postSnap.data().imageUrl;
        status.value = postSnap.data().status;
        title.value = postSnap.data().title;
      } else {
        notificationStore.showNotification(
          1,
          'No such document',
          'There is no data in the database.'
        );
      }
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function postDelete(postId: string) {
    try {
      await deleteDoc(doc(getFirestore(), 'posts', postId));
      postsStore.postsAll = postsStore.postsAll.filter((p) => p.postId != postId);
      notificationStore.showNotification(
        0,
        'Operation successful',
        'Post has been successfully deleted.'
      );
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }

  return {
    date,
    content,
    status,
    title,
    postId,
    imageUrl,
    postNew,
    postSave,
    postPublish,
    postUpdate,
    postDraft,
    postGet,
    postDelete
  };
});
