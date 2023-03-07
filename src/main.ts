import { createApp } from 'vue'
import { createPinia } from 'pinia'
//FormKit
import { plugin, defaultConfig } from '@formkit/vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig)
app.mount('#app')
