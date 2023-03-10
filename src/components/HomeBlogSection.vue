<script setup lang="ts">
import { usePostStore } from '@/stores/PostStore';
import { usePostsStore } from '@/stores/PostsStore';
import { onMounted } from 'vue';
import { useDateFormat } from '@vueuse/core';
import router from '@/router';
import type Post from '@/types/Post';
const postStore = usePostStore();
const postsStore = usePostsStore();
onMounted(() => {
  postsStore.postsPublishedGet();
});
function toPostView(post: Post) {
  postStore.postId = post.postId;
  router.push({ name: 'post', params: { slug: post.slug } });
}
</script>
<template>
  <div class="bg-white pt-5 pb-24 md:pt-10 sm:pb-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          การเดินทางสู่ประสบการณ์ที่ไม่เคยรู้จัก
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          เราจะแนะนำสถานที่ท่องเที่ยวและแหล่งท่องเที่ยวที่ยอดเยี่ยมทั่วโลก
        </p>
      </div>
      <div
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article
          v-for="post in postsStore.postsPublished"
          :key="post.postId"
          class="flex flex-col items-start justify-start"
        >
          <div class="relative w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2]">
            <svg
              v-if="post.imageUrl === '' || !post.imageUrl"
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
              :src="post.imageUrl"
              alt=""
              class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
            />
            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
          </div>
          <div class="max-w-xl">
            <div class="mt-8 flex items-center gap-x-4 text-xs">
              <time
                :datetime="useDateFormat(post.date.seconds * 1000, 'YYYY-MM-DD').value"
                class="text-gray-500"
                >{{ useDateFormat(post.date.seconds * 1000, 'MMM DD, YYYY').value }}</time
              >
            </div>
            <div class="group relative">
              <h3
                class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
              >
                <a href="javascript:;" @click="toPostView(post)">
                  <span class="absolute inset-0" />
                  {{ post.title }}
                </a>
              </h3>
              <p class="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                {{ post.excerpt.replace(/<\/?.+?>/g, '') }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
