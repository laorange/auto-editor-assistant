import {useStore} from "../store";
import {watch} from "vue";
import {useStorage} from "vue3-storage";

const LOCAL_CONFIG_STORAGE_KEY = "local_config";

export default function useLocalStorage() {
    const store = useStore();
    const storage = useStorage();

    // 从 localStorage 读取本地设置
    let localConfig = storage.getStorageSync<typeof store.formData>(LOCAL_CONFIG_STORAGE_KEY);
    store.formData = {...store.formData, ...localConfig};

    watch(() => store.formData, (to) => {
        // 向 localStorage 存入本地设置
        storage.setStorageSync(LOCAL_CONFIG_STORAGE_KEY, to);
    }, {deep: true});
}
