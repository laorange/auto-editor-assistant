<script setup lang="ts">
import MainBody from "./components/MainBody.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import useLocalStorage from "./assets/useLocalStorage";
import {onBeforeMount} from "vue";

onBeforeMount(() => {
  useLocalStorage();
});
</script>

<template>
  <n-message-provider>
    <header-component/>
    <main-body/>
    <footer-component/>
  </n-message-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
