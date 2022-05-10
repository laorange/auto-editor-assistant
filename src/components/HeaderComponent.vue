<script setup lang="ts">
function openNewWindow(url: string) {
  window.open(url);
}
</script>

<template>
  <header>
    <img src="../assets/auto-editor_banner.png" alt="auto-editor_banner.png"
         class="auto-editor-banner" @click="openNewWindow('https://auto-editor.com/')"/>
    <img src="../assets/switchLanguage.svg" alt="switchLanguage.svg" id="switch-language-svg"
         @click="$i18n.locale=$i18n.locale==='zh'?'en':'zh'"/>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.auto-editor-banner {
  max-width: 400px;
  width: 100%;
  cursor: pointer;
}

#switch-language-svg {
  height: 50px;
  cursor: pointer;
}

img + img {
  margin-left: 50px;
}
</style>