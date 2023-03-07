import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  const show = ref<boolean>(false);
  const state = ref<number>();
  const title = ref<string>("");
  const content = ref<string>("");
  const timer = ref();

  function showNotification(s: number, t: string, c: string) {
    clearTimeout(timer.value);
    show.value = true;
    state.value = s;
    title.value = t;
    content.value = c;
    timer.value = setTimeout(() => {
      show.value = false;
    }, 5000);
  }

  return {
    show,
    state,
    title,
    content,
    showNotification,
  };
});
