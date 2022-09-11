import {createApp} from "vue";
import App from "./App.vue";
import {createPinia} from "pinia";
import {createI18n} from "vue-i18n";
import Vue3Storage from "vue3-storage";

createApp(App)
    .use(createPinia())
    .use(createI18n({
        legacy: false,
        locale: "en",
        fallbackLocale: "zh",
        messages: {
            zh: {
                title: "指令生成器",
                switchLanguage: "Switch to English",
            },
            en: {
                title: "Assistant",
                switchLanguage: "切换为简体中文",
            },
        },
    }))
    .use(Vue3Storage)
    .mount("#app");
