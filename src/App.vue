<script setup lang="ts">
import Notification from '@/components/Notification.vue'
//Firebase
import { useInitStore } from '@/stores/InitStore'
useInitStore().firebaseInit()
</script>

<template>
  <RouterView />
  <Notification />
</template>
