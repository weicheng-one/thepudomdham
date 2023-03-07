<script setup lang="ts">
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid';
import { useAuthStore } from '@/stores/AuthStore';

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
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon }
];

const mobileMenuOpen = ref(false);
</script>
<template>
  <div class="relative isolate overflow-hidden bg-gray-900">
    <img
      src="https://images.unsplash.com/photo-1599283787923-51b965a58b05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=334155&exp=15&blend-mode=multiply"
      alt=""
      class="absolute inset-0 -z-10 h-full w-full object-cover"
    />
    <div
      class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
    >
      <svg
        class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
      >
        <path
          fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
          fill-opacity=".2"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#9089FC" />
            <stop offset="1" stop-color="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="px-6 lg:px-8">
      <nav class="mx-auto flex max-w-7xl items-center justify-between pt-6" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Thepudomdham</span>
            <!-- COMPANY LOGO -->
            <!-- <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          /> -->
            <h1 class="text-3xl font-bold -mt-2 text-white">เทพอุดมธรรม ทราเวล</h1>
            <p class="text-white text-center font-bold">11/09584</p>
          </a>
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
        <PopoverGroup class="hidden lg:flex lg:gap-x-12">
          <Popover class="relative">
            <PopoverButton
              class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
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
                      class="overflow-hidden flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                    >
                      <!-- <img
                      :src="item.src"
                      class="aspect-square text-gray-600 group-hover:text-indigo-600"
                      aria-hidden="true"
                    /> -->
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
                <!-- <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                <a
                  v-for="item in callsToAction"
                  :key="item.name"
                  :href="item.href"
                  class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                >
                  <component
                    :is="item.icon"
                    class="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </div> -->
              </PopoverPanel>
            </transition>
          </Popover>

          <a href="#" class="text-sm font-semibold leading-6 text-white">เกี่ยวกับ</a>
          <a href="#" class="text-sm font-semibold leading-6 text-white">จุดหมายปลายทาง</a>
          <a href="#" class="text-sm font-semibold leading-6 text-white">ติดต่อเรา</a>
        </PopoverGroup>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end" v-if="!authStore.user">
          <RouterLink :to="{ name: 'signin' }" class="text-sm font-semibold leading-6 text-white"
            >เข้าสู่ระบบ<span aria-hidden="true">&rarr;</span></RouterLink
          >
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end" v-else>
          <a
            href="javascript:;"
            @click="authStore.signOutUser"
            class="text-sm font-semibold leading-6 text-white"
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
              <!-- <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              /> -->
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
                  <DisclosurePanel class="mt-2 space-y-2">
                    <DisclosureButton
                      v-for="item in [...products, ...callsToAction]"
                      :key="item.name"
                      as="a"
                      :href="item.href"
                      class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >{{ item.name }}</DisclosureButton
                    >
                  </DisclosurePanel>
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
                  @click="authStore.signOutUser"
                  class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  ออกจากระบบ
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div
            class="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20"
          >
            Announcing our next round of funding.
            <a href="#" class="font-semibold text-white"
              ><span class="absolute inset-0" aria-hidden="true" />Read more
              <span aria-hidden="true">&rarr;</span></a
            >
          </div>
        </div>
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Data to enrich your online business
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-300">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
            commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >Get started</a
            >
            <a href="#" class="text-sm font-semibold leading-6 text-white"
              >Learn more <span aria-hidden="true">→</span></a
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    >
      <svg
        class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
      >
        <path
          fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
          fill-opacity=".2"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#9089FC" />
            <stop offset="1" stop-color="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>
