<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { usePostStore } from "@/stores/PostStore";
import { useEditorStore } from "@/stores/EditorStore";
import { useStorageStore } from "@/stores/StorageStore";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TiptapFileManager from "@/components/TiptapFileManager.vue";
import TiptapMenu from "@/components/TiptapMenu.vue";
import { ref } from "vue";

const postStore = usePostStore();
const editorStore = useEditorStore();
const storageStore = useStorageStore();
const setMainImage = ref<boolean>(false);
const editor = useEditor({
  extensions: [
    Highlight.configure({ multicolor: true }),
    Image,
    StarterKit.configure({
      heading: {
        levels: [1, 2],
      },
    }),
    TaskItem.configure({
      nested: true,
    }),
    TaskList,
  ],
  editorProps: {
    attributes: {
      class: "focus:outline-none",
    },
  },
  editable: editorStore.editable,
  onCreate: async ({ editor }) => {
    await postStore.postGet();
    editorStore.editable = true;
    editor.commands.setContent(postStore.content);
    editor.setEditable(editorStore.editable);
  },
  onUpdate: ({ editor }) => {
    if (editorStore.autoSave) {
      clearTimeout(editorStore.timer);
      postStore.content = editor.getHTML();
      editorStore.timer = setTimeout(() => {
        postStore.postSave();
      }, 5000);
    } else {
      editorStore.autoSave = true;
    }
  },
});
function setImage(url: string) {
  if (setMainImage.value) {
    postStore.imageUrl = url;
    setMainImage.value = false;
    storageStore.openFileManager = false;
  } else {
    editor.value?.chain().setImage({ src: url }).run();
    editor.value?.chain().focus().enter().run();
    storageStore.openFileManager = false;
  }
}
function postSave() {
  clearTimeout(editorStore.timer);
  editorStore.timer = setTimeout(() => {
    postStore.postSave();
  }, 5000);
}
function addMainImageHandle() {
  storageStore.openFileManager = true;
  setMainImage.value = true;
}
</script>

<template>
  <div>
    <label for="title" class="sr-only">Title</label>
    <input
      type="text"
      name="title"
      id="title"
      :disabled="!editorStore.editable"
      @input="postSave"
      v-model="postStore.title"
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-2xl font-bold"
      placeholder="Please enter the post title"
    />
  </div>
  <div
    class="relative w-full aspect-[16/9] rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] cursor-pointer my-3"
    @click="addMainImageHandle"
  >
    <svg
      v-if="postStore.imageUrl == '' || !postStore.imageUrl"
      class="absolute w-24 h-24 inset-1/2 -translate-x-1/2 -translate-y-1/2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
    <img
      v-else
      :src="postStore.imageUrl"
      alt=""
      class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
    />
    <div
      class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
    ></div>
  </div>
  <div class="max-h-[26rem] md:max-h-[35rem] flex flex-col">
    <div
      v-if="editor"
      id="editor-header"
      class="border-t-4 border-l-4 border-r-4 border-slate-900 rounded-t-xl p-1 flex flex-wrap items-center"
    >
      <TiptapMenu
        @toggle-bold="editor?.chain().focus().toggleBold().run()"
        @toggle-Italic="editor?.chain().focus().toggleItalic().run()"
        @toggle-strike="editor?.chain().focus().toggleStrike().run()"
        @toggle-code="editor?.chain().focus().toggleCode().run()"
        @toggle-highlight="editor?.chain().focus().toggleHighlight().run()"
        @toggle-heading-level-1="
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        "
        @toggle-heading-level-2="
          editor
            ?.chain()
            .focus()
            .toggleHeading({
              level: 2,
            })
            .run()
        "
        @set-paragraph="editor?.chain().focus().setParagraph().run()"
        @toggle-bullet-list="editor?.chain().focus().toggleBulletList().run()"
        @toggle-ordered-list="editor?.chain().focus().toggleOrderedList().run()"
        @toggle-task-list="editor?.chain().focus().toggleTaskList().run()"
        @toggle-code-block="editor?.chain().focus().toggleCodeBlock().run()"
        @toggle-block-quote="editor?.chain().focus().toggleBlockquote().run()"
        @set-horizontal-rule="
          editor?.chain().focus().enter().enter().setHorizontalRule().run()
        "
        @set-hard-break="editor?.chain().focus().setHardBreak().run()"
        @clear-format="
          editor?.chain().clearNodes().unsetAllMarks().focus().run()
        "
        @set-image="storageStore.filesGet()"
      />
    </div>
    <editor-content
      id="editor-content"
      :editor="editor"
      class="border-4 border-slate-900 focus:outline-none px-4 py-5 overflow-x-hidden overflow-y-auto flex-auto"
    />
    <div
      id="editor-footer"
      class="border-b-4 border-l-4 border-r-4 border-slate-900 rounded-b-xl px-3 py-1 text-xs font-semibold flex justify-end"
    >
      WeiCheng | Tiptap Editor
    </div>
  </div>
  <TiptapFileManager @set-image="setImage" />
</template>
