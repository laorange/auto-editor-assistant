import {createApp} from "vue";
import App from "./App.vue";

const app = createApp(App);

// region plugins
import {createPinia} from "pinia";
import {createI18n} from "vue-i18n";

app.use(createPinia());

app.use(createI18n({
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
}));
// endregion

app.mount("#app");