<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t, locale} = useI18n()
</script>

<template>
  <header>
    <h1>
      <a href="https://auto-editor.com/"><span id="header-span-auto">Auto</span>-<span id="header-span-editor">Editor</span></a>-{{ t("title") }}
    </h1>
    <img src="../assets/switchLanguage.svg" alt="switchLanguage.svg" id="switch-language-svg"
         @click="locale = locale==='zh' ? 'en' : 'zh'"/>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

#switch-language-svg {
  height: 30px;
  cursor: pointer;
  margin-left: 20px;
  justify-self: end;
}

#header-span-auto {
  color: #3b8eda;
}

#header-span-editor {
  color: #64c2f8;
}
</style>