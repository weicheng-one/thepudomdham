import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
} from "firebase/firestore";
import { useLocalStorage } from "@vueuse/core";
import { useNotificationStore } from "@/stores/NotificationStore";
import type Post from "@/types/Post";

export const usePostsStore = defineStore("posts", () => {
  const db = getFirestore();
  const notificationStore = useNotificationStore();
  const postsAll = useLocalStorage<Post[]>("posts:postsAll", []);
  const postsPublished = useLocalStorage<Post[]>("posts:postsPublished", []);
  async function postsPublishedGet() {
    const q = query(collection(db, "posts"), where("status", "==", "publish"));
    try {
      const querySnapshot = await getDocs(q);
      console.log("Getting published posts...");
      postsPublished.value = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        postsPublished.value.push({
          authorId: data.authorId,
          content: data.content,
          date: data.date,
          excerpt: data.excerpt,
          imageUrl: data.imageUrl,
          modified: data.modified,
          postId: doc.id,
          slug: data.slug,
          status: data.status,
          title: data.title,
        });
      });
    } catch (error) {
      console.log(error);
      notificationStore.showNotification(
        1,
        "Something went wrong!",
        "Failed to get published posts, please contact technical support."
      );
    }
  }
  async function postsAllGet() {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      console.log("Getting all posts...");
      postsAll.value = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        postsAll.value.push({
          authorId: data.authorId,
          content: data.content,
          date: data.date,
          excerpt: data.excerpt,
          imageUrl: data.imageUrl,
          modified: data.modified,
          postId: doc.id,
          slug: data.slug,
          status: data.status,
          title: data.title,
        });
      });
    } catch (error) {
      console.log(error);
      notificationStore.showNotification(
        1,
        "Something went wrong!",
        "Failed to get all posts, please contact technical support."
      );
    }
  }
  return {
    postsPublishedGet,
    postsAllGet,
    postsPublished,
    postsAll,
  };
});
