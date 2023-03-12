<script setup lang="ts">
import { usePostsStore } from '@/stores/PostsStore';
const postsStore = usePostsStore();
</script>
<template>
  <div class="flex justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <button
      type="button"
      v-show="!postsStore.lastResult && postsStore.showBtn"
      @click="postsStore.postsAllGet()"
      class="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Show more...
    </button>
    <p v-show="postsStore.lastResult">All data has been loaded.</p>
  </div>
</template>
