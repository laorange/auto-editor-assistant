<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useStore} from "../store/useStore";
import {watch} from "vue";

const {t, locale} = useI18n();
const store = useStore();

watch(() => store.formData.language, (newLanguage) => locale.value = newLanguage, {immediate: true});

function handleSwitchLanguage() {
  switch (locale.value) {
    case "zh":
      return store.formData.language = "en";
    case "en":
      return store.formData.language = "zh";
  }
}
</script>

<template>
  <header>
    <h1>
      <a href="https://auto-editor.com/"><span id="header-span-auto">Auto</span><span id="header-span-editor">-Editor</span></a>-{{ t("title") }}
    </h1>
    <n-button @click="handleSwitchLanguage">
      <template #icon>
        <img style="height: 16px" src="../assets/switchLanguage.svg" alt="switchLanguage.svg" id="switch-language-svg"/>
      </template>
      {{ t("switchLanguage") }}
    </n-button>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

#switch-language-svg {
  height: 30px;
  cursor: pointer;
  margin-right: 20px;
  justify-self: end;
}

#header-span-auto {
  color: #3b8eda;
  text-decoration: underline #3b8eda;
}

#header-span-editor {
  color: #64c2f8;
  text-decoration: underline #64c2f8;
}
</style>
