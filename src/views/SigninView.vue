<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
const authStore = useAuthStore()
interface Data {
  email: string
  password: string
}
function submitHandler(data: Data) {
  authStore.signInUser(data.email, data.password)
}
</script>
<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <!-- class="space-y-6" -->
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <FormKit
          form-class="space-y-6"
          type="form"
          submit-label="Sign in"
          @submit="submitHandler"
          :submit-attrs="{
            inputClass:
              'flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
            ignore: false
          }"
        >
          <FormKit
            :classes="{
              label: 'block text-sm font-medium text-gray-700',
              inner: 'mt-1',
              messages: 'list-none p-0 mt-1 mb-0',
              message: 'text-red-500 mb-1 text-xs',
              input:
                'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            }"
            type="email"
            name="email"
            validation="email|required"
            label="Email address"
          />
          <FormKit
            :classes="{
              label: 'block text-sm font-medium text-gray-700',
              inner: 'mt-1',
              messages: 'list-none p-0 mt-1 mb-0',
              message: 'text-red-500 mb-1 text-xs',
              input:
                'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            }"
            type="password"
            name="password"
            label="Password"
            validation="required"
          />

          <div class="text-sm text-end">
            <RouterLink to="/" class="font-medium text-indigo-600 hover:text-indigo-500"
              >Forgot your password?</RouterLink
            >
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>
