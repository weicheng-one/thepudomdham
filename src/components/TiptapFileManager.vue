<script setup lang="ts">
import { useStorageStore } from '@/stores/StorageStore';
import { ArrowUpTrayIcon, DocumentIcon } from '@heroicons/vue/24/outline';
import { useClipboard } from '@vueuse/core';
import { useNotificationStore } from '@/stores/NotificationStore';

const storageStore = useStorageStore();
const notificationStore = useNotificationStore();
const { copy } = useClipboard();
defineEmits(['setImage']);

function fileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files;
  if (file) {
    storageStore.fileUpload(file[0]);
  }
}
function fileDelete(filePath: string, fileName: string) {
  if (window.confirm(`Do you want to delele "${fileName}"?`)) {
    storageStore.fileDelete(filePath);
  }
}
function fileCopy(fileUrl: string) {
  copy(fileUrl);
  notificationStore.showNotification(0, 'Operation Succeeded', 'File URL has been copied.');
}
</script>

<template>
  <div class="max-h-[26rem] md:max-h-[35rem] bg-white shadow sm:rounded-md flex flex-col">
    <div class="px-6 py-4">
      <label
        for="upload"
        class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <ArrowUpTrayIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Upload
      </label>
      <input type="file" id="upload" @change="fileUpload" class="sr-only" accept="image/*,.pdf" />
    </div>
    <div class="overflow-y-auto overflow-x-hidden">
      <ul role="list" class="divide-y divide-gray-200">
        <li
          v-for="file in storageStore.files"
          :key="file.fullPath"
          class="px-6 py-4 flex justify-between hover:bg-gray-200"
        >
          <div class="bg-gray-400 h-20 aspect-[3/2] flex justify-center">
            <img :src="file.url" class="h-full" v-if="file.name.split('.')[1] !== 'pdf'" />
            <DocumentIcon class="h-full" aria-hidden="true" v-else />
          </div>
          <div class="flex flex-col justify-between">
            <span class="text-end">{{ file.name }}</span>
            <div class="flex justify-end">
              <button
                @click.stop="fileCopy(file.url)"
                title="Copy URL"
                class="self-end bg-gray-400 hover:bg-gray-500 text-white rounded-md w-7 h-7 p-1 m-[0.1rem] inline-flex justify-center items-center"
              >
                <i class="ri-file-copy-fill text-base"></i>
              </button>
              <button
                @click.stop="fileDelete(file.fullPath, file.name)"
                title="Delete File"
                class="self-end bg-red-400 hover:bg-red-500 text-white rounded-md w-7 h-7 p-1 m-[0.1rem] inline-flex justify-center items-center"
              >
                <i class="ri-delete-bin-fill text-base"></i>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
