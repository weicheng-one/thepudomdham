<script setup lang="ts">
import NavbarMain from '@/components/NavbarMain.vue';
import { usePostStore } from '@/stores/PostStore';
import { usePostsStore } from '@/stores/PostsStore';
import { useDateFormat } from '@vueuse/core';

const postStore = usePostStore();
const postsStore = usePostsStore();

const post = postsStore.postsPublished.find((post) => post.postId === postStore.postId);
</script>

<template>
  <NavbarMain :theme-light="true" />
  <div class="bg-white pt-5 pb-24 md:pt-10 sm:pb-32 px-6 lg:px-8" v-if="post">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <img
        v-if="post.imageUrl != '' || post.imageUrl"
        :src="post.imageUrl"
        alt=""
        class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] mb-5"
      />
      <h1
        class="mt-2 mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl prose prose-lg prose-indigo"
      >
        {{ post.title }}
      </h1>
      <div class="mb-10">
        <time
          :datetime="useDateFormat(post.date.seconds * 1000, 'YYYY-MM-DD').value"
          class="text-gray-500"
          >{{ useDateFormat(post.date.seconds * 1000, 'MMM DD, YYYY').value }}</time
        >
      </div>
      <div v-html="post.content"></div>
    </div>
  </div>
</template>
