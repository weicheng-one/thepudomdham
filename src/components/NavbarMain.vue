<script setup lang="ts">
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { useAuthStore } from '@/stores/AuthStore';

defineProps({
  themeDark: Boolean,
  themeLight: Boolean
});

const authStore = useAuthStore();
const products = [
  {
    name: 'อินเดีย',
    description: 'วัฒนธรรมที่ลึกซึ้งและสีสันสวยงาม อาหารอร่อย เชื่อฟังศาสนาและประชากรที่น่ารัก',
    href: '#',
    flag: ['fi', 'fi-in', 'fis']
  },
  {
    name: 'เนปาล',
    description: 'ทะเลสาบหิมาลัยและการเดินทางเชิงจิตใจ',
    href: '#',
    flag: ['fi', 'fi-np', 'fis']
  },
  {
    name: 'ศรีลังกา',
    description: 'วัด เกาะทราย และชาเขียว',
    href: '#',
    flag: ['fi', 'fi-lk', 'fis']
  },
  {
    name: 'พม่า',
    description: 'วัฒนธรรมโบราณ วัดพุทธ และวิวที่สวยงาม',
    href: '#',
    flag: ['fi', 'fi-mm', 'fis']
  },
  {
    name: 'กัมพูชา',
    description: 'วัดปราสาทหริภุญชัย แม่น้ำโขง และวัด',
    href: '#',
    flag: ['fi', 'fi-kh', 'fis']
  },
  {
    name: 'อินโดนีเซีย',
    description: 'เกาะสวรรค์ ชายหาดแห่งความโรแมนติก และวัฒนธรรมหลากหลาย',
    href: '#',
    flag: ['fi', 'fi-id', 'fis']
  },
  {
    name: 'ลาว',
    description: 'วัดที่สวยงาม ธรรมชาติและความสงบและเงียบสงบ',
    href: '#',
    flag: ['fi', 'fi-la', 'fis']
  },
  {
    name: 'ภูฏาน',
    description: 'ราชอาณาจักรความสุขและธรรมชาติที่น่าตื่นเต้น',
    href: '#',
    flag: ['fi', 'fi-bt', 'fis']
  }
];

const mobileMenuOpen = ref(false);
</script>
<template>
  <nav class="mx-auto flex max-w-7xl items-center justify-between pt-6" aria-label="Global">
    <div class="flex lg:flex-1">
      <a href="#" class="-m-1.5 p-1.5">
        <span class="sr-only">Thepudomdham</span>
        <h1
          class="text-3xl font-bold -mt-2"
          :class="{ 'text-white': themeDark, 'text-black': themeLight }"
        >
          เทพอุดมธรรม ทราเวล
        </h1>
        <p
          class="text-center font-bold"
          :class="{ 'text-white': themeDark, 'text-black': themeLight }"
        >
          11/09584
        </p>
      </a>
    </div>
    <div class="flex lg:hidden">
      <button
        type="button"
        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        @click="mobileMenuOpen = true"
      >
        <span class="sr-only">Open main menu</span>
        <Bars3Icon
          class="h-6 w-6"
          :class="{ 'text-white': themeDark, 'text-black': themeLight }"
          aria-hidden="true"
        />
      </button>
    </div>
    <PopoverGroup class="hidden lg:flex lg:gap-x-12">
      <Popover class="relative">
        <PopoverButton
          class="flex items-center gap-x-1 text-sm font-semibold leading-6"
          :class="{ 'text-white': themeDark, 'text-black': themeLight }"
        >
          หน้าหลัก
          <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
        </PopoverButton>

        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <PopoverPanel
            class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
          >
            <div class="p-4">
              <div
                v-for="item in products"
                :key="item.name"
                class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
              >
                <div
                  class="overflow-hidden flex h-11 w-11 flex-none items-center justify-center rounded-lg border-slate-300 border-2 bg-gray-50 group-hover:bg-white"
                >
                  <i :class="item.flag" class="text-5xl" aria-hidden="true"></i>
                </div>
                <div class="flex-auto">
                  <a :href="item.href" class="block font-semibold text-gray-900">
                    {{ item.name }}
                    <span class="absolute inset-0" />
                  </a>
                  <p class="mt-1 text-gray-600">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>

      <a
        href="#"
        class="text-sm font-semibold leading-6"
        :class="{ 'text-white': themeDark, 'text-black': themeLight }"
        >เกี่ยวกับ</a
      >
      <a
        href="#"
        class="text-sm font-semibold leading-6"
        :class="{ 'text-white': themeDark, 'text-black': themeLight }"
        >จุดหมายปลายทาง</a
      >
      <a
        href="#"
        class="text-sm font-semibold leading-6"
        :class="{ 'text-white': themeDark, 'text-black': themeLight }"
        >ติดต่อเรา</a
      >
      <router-link
        v-if="authStore.user"
        :to="{ name: 'posts-management' }"
        class="text-sm font-semibold leading-6"
        :class="{ 'text-white': themeDark, 'text-black': themeLight }"
        >จัดการบทความ</router-link
      >
    </PopoverGroup>
    <div class="hidden lg:flex lg:flex-1 lg:justify-end" v-if="!authStore.user">
      <RouterLink
        :to="{ name: 'signin' }"
        class="text-sm font-semibold leading-6"
        :class="{ 'text-white': themeDark, 'text-black': themeLight }"
        >เข้าสู่ระบบ<span aria-hidden="true">&rarr;</span></RouterLink
      >
    </div>
    <div class="hidden lg:flex lg:flex-1 lg:justify-end" v-else>
      <a
        href="javascript:;"
        @click="authStore.userSignOut"
        class="text-sm font-semibold leading-6"
        :class="{ 'text-white': themeDark, 'text-black': themeLight }"
      >
        ออกจากระบบ <span aria-hidden="true">&rarr;</span>
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
          <span class="sr-only">Thepudomdham</span>
          <h1 class="text-3xl font-bold -mt-2 text-black">เทพอุดมธรรม ทราเวล</h1>
          <p class="text-black text-center font-bold">11/09584</p>
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
            <Disclosure as="div" class="-mx-3" v-slot="{ open }">
              <DisclosureButton
                class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50"
              >
                หน้าหลัก
                <ChevronDownIcon
                  :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']"
                  aria-hidden="true"
                />
              </DisclosureButton>
            </Disclosure>
            <a
              href="#"
              class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >เกี่ยวกับ</a
            >
            <a
              href="#"
              class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >จุดหมายปลายทาง</a
            >
            <a
              href="#"
              class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >ติดต่อเรา</a
            >
            <router-link
              v-if="authStore.user"
              :to="{ name: 'posts-management' }"
              class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >จัดการบทความ</router-link
            >
          </div>
          <div class="py-6" v-if="!authStore.user">
            <RouterLink
              :to="{ name: 'signin' }"
              class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >เข้าสู่ระบบ</RouterLink
            >
          </div>
          <div class="py-6" v-else>
            <a
              href="javascript:;"
              @click="authStore.userSignOut"
              class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              ออกจากระบบ
            </a>
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</template>
