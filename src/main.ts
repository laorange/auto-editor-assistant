import {createApp} from 'vue'
import App from './App.vue'

const app = createApp(App)

// region plugins
import {createPinia} from "pinia";
import {createI18n} from "vue-i18n";
import {languages} from "./languages";

app.use(createPinia())

app.use(createI18n({
    legacy: false,
    locale: "zh",
    fallbackLocale: "English",
    messages: languages
}))
// endregion

app.mount('#app')