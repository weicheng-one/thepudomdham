<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, DialogPanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/stores/AuthStore';

const mobileMenuOpen = ref(false);
const authStore = useAuthStore();
const navigation = [
  { name: 'Posts', href: { name: 'home' } },
  {
    name: 'Posts Management',
    href: { name: 'posts-management' },
    hidden: true
  }
];
</script>
<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <RouterLink :to="{ name: 'home' }" class="-m-1.5 p-1.5">
          <span class="sr-only">WeiCheng | Blog</span>
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </RouterLink>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="{
            hidden: item.hidden && !authStore.user
          }"
          class="text-sm font-semibold leading-6 text-gray-900"
          >{{ item.name }}</RouterLink
        >
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end" v-if="!authStore.user">
        <RouterLink :to="{ name: 'signin' }" class="text-sm font-semibold leading-6 text-gray-900"
          >Log in <span aria-hidden="true">&rarr;</span></RouterLink
        >
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end" v-else>
        <a
          href="javascript:;"
          @click="authStore.userSignOut"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Log out <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">WeiCheng | Blog</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <RouterLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="{
                  hidden: item.hidden && !authStore.user
                }"
                class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >{{ item.name }}</RouterLink
              >
            </div>
            <div class="py-6" v-if="!authStore.user">
              <RouterLink
                :to="{ name: 'signin' }"
                class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Log in</RouterLink
              >
            </div>
            <div class="py-6" v-else>
              <a
                href="javascript:;"
                @click="authStore.userSignOut"
                class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Log out
              </a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
