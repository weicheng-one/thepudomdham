<script setup lang="ts">
import HomeHeader from '@/components/NavbarAdmin.vue';
import { usePostStore } from '@/stores/PostStore';
import { usePostsStore } from '@/stores/PostsStore';
import { useDateFormat } from '@vueuse/core';
import { onBeforeMount } from 'vue';
const postStore = usePostStore();
const postsStore = usePostsStore();
onBeforeMount(() => {
  postsStore.postsAllGet();
});
function dateFormat(date: number) {
  return useDateFormat(date * 1000, 'YYYY/MM/DD hh:mm').value;
}
function postDelete(postId: string, title: string) {
  if (window.confirm(`Do you want to delete "${title || 'Untitled'}"?`)) {
    postStore.postDelete(postId);
  }
}
</script>
<template>
  <HomeHeader />
  <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-5 md:pt-10 pb-24 sm:pb-32">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Posts</h1>
        <p class="mt-2 text-sm text-gray-700">
          On this page, you can perform functions such as editing, creating, and deleting posts,
          making it convenient for you to manage your posts.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          @click="postStore.postNew"
          class="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          New Post
        </button>
      </div>
    </div>
    <div class="-mx-4 mt-8 sm:-mx-0">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Title
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Date
            </th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white" v-if="postsStore.postsAll">
          <tr v-for="post in postsStore.postsAll" :key="post.postId">
            <td
              class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"
            >
              {{ post.title || 'Untitled' }}
              <dl class="font-normal lg:hidden">
                <dt class="sr-only sm:hidden">Date</dt>
                <dd class="mt-1 truncate text-gray-500 sm:hidden">
                  {{
                    post.status === 'draft'
                      ? `Last Modified ${dateFormat(post.modified.seconds)}`
                      : `Published ${dateFormat(post.date.seconds)}`
                  }}
                </dd>
              </dl>
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
              {{
                post.status === 'draft'
                  ? `Last Modified ${dateFormat(post.modified.seconds)}`
                  : `Published ${dateFormat(post.date.seconds)}`
              }}
            </td>
            <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <RouterLink
                :to="{ name: 'post-edit', params: { postId: post.postId } }"
                class="text-indigo-500 hover:text-indigo-600"
                >Edit<span class="sr-only">, {{ post.postId }}</span></RouterLink
              >
            </td>
            <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <a
                href="javascript:;"
                @click="postDelete(post.postId, post.title)"
                class="text-red-500 hover:text-red-600"
                >Delete<span class="sr-only">, {{ post.postId }}</span></a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
