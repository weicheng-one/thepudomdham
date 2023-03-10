<script setup lang="ts">
import PostEditHeading from '@/components/PostEditHeading.vue';
import PostEditContent from '@/components/PostEditContent.vue';
import { usePostStore } from '@/stores/PostStore';
import { onMounted } from 'vue';
//取得從路由 params 過來的 postId
const props = defineProps({
  postId: {
    type: String,
    required: true
  }
});
const postStore = usePostStore();
onMounted(() => {
  postStore.postId = props.postId; //儲存文章的id，更新或發布文章時才不會出錯。
});
</script>
<template>
  <PostEditHeading />
  <PostEditContent />
</template>
