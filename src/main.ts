import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/main.css'

const app = createApp(App)

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title as string
	}
	next()
})

app.use(router)

app.mount('#app')
