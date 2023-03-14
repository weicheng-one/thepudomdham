import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditorStore = defineStore('editor', () => {
  const timer = ref<NodeJS.Timeout>();
  const editable = ref<boolean>(false);
  const autoSave = ref<boolean>(false);

  return { timer, editable, autoSave };
});
