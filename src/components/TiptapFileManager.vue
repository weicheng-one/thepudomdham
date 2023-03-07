<script setup lang="ts">
import { useStorageStore } from "@/stores/StorageStore";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/vue/24/outline";
const storageStore = useStorageStore();
function uploadFile(event: Event) {
  const file = (event.target as HTMLInputElement).files;
  if (file) {
    storageStore.fileUpload(file[0]);
  }
}
defineEmits(["setImage"]);
function fileDelete(filePath: string, fileName: string) {
  if (window.confirm(`Do you want to delele "${fileName}"?`)) {
    storageStore.fileDelete(filePath);
  }
}
</script>

<template>
  <TransitionRoot as="template" :show="storageStore.openFileManager">
    <Dialog
      as="div"
      class="relative z-10"
      @close="storageStore.openFileManager = false"
    >
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
                >
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <div>
                        <DialogTitle class="text-lg font-medium text-gray-900"
                          >File Manager</DialogTitle
                        >
                        <label
                          @click=""
                          for="upload"
                          class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <ArrowUpTrayIcon
                            class="-ml-0.5 mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Upload
                        </label>
                        <input
                          type="file"
                          id="upload"
                          @change="uploadFile"
                          class="sr-only"
                          accept=".jpg, .jpeg, .png"
                        />
                      </div>

                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          @click="storageStore.openFileManager = false"
                        >
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <div class="overflow-hidden rounded-md bg-white shadow">
                      <ul role="list" class="divide-y divide-gray-200">
                        <li
                          v-for="file in storageStore.files"
                          :key="file.fullPath"
                          @click="$emit('setImage', file.url)"
                          class="px-6 py-4 flex justify-between hover:bg-gray-200 cursor-pointer"
                        >
                          <div class="bg-gray-400 h-20 aspect-[3/2]">
                            <img :src="file.url" class="h-full" />
                          </div>
                          <div class="flex flex-col justify-between">
                            <span class="text-end">{{ file.name }}</span>
                            <button
                              @click.stop="fileDelete(file.fullPath, file.name)"
                              class="self-end bg-red-400 hover:bg-red-500 text-white rounded-md w-7 h-7 p-1 m-[0.1rem] inline-flex justify-center items-center"
                            >
                              <i class="ri-delete-bin-fill text-base"></i>
                            </button>
                            <div class="self-end hidden">
                              <button
                                class="mr-1 bg-slate-300 hover:bg-slate-400 rounded-md px-2 py-1"
                              >
                                Cancel
                              </button>
                              <button
                                class="bg-red-400 hover:bg-red-500 text-white rounded-md px-2 py-1"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!-- /End replace -->
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
