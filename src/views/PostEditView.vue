<script setup lang="ts">
import PostEditHeading from '@/components/PostEditHeading.vue';
import PostEditContent from '@/components/PostEditContent.vue';
import { usePostStore } from '@/stores/PostStore';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
//取得從路由 params 過來的 postId
const props = defineProps({
  postId: {
    type: String,
    required: true
  }
});
const authStore = useAuthStore();
const postStore = usePostStore();
const router = useRouter();

onBeforeMount(() => {
  if (!authStore.user) {
    router.push({ name: 'signin' });
  }
});
onMounted(() => {
  postStore.postId = props.postId; //儲存文章的id，更新或發布文章時才不會出錯。
});
</script>
<template>
  <PostEditHeading />
  <PostEditContent />
</template>
