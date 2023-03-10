<script setup lang="ts">
import NotificationOverlay from '@/components/NotificationOverlay.vue';
//Firebase
import { useInitStore } from '@/stores/InitStore';
useInitStore().firebaseInit();
</script>

<template>
  <RouterView />
  <NotificationOverlay />
</template>
