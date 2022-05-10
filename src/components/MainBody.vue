<script setup lang="ts">
import {useStore} from "../store";
import ClipboardJS from "clipboard";

const store = useStore()

new ClipboardJS('#copy-button');
</script>

<template>

  <h1>{{ $t("title") }}</h1>

  <main>

    <n-dynamic-input
        v-model:value="store.filePaths"
        preset="pair"
        :key-placeholder="$t('filePathKeyDesc')"
        :value-placeholder="$t('filePathValueDesc')"
        :min="1"
    />

    <el-form :model="store.formData">
      <el-form-item :label="$t('frameMargin')">
        <el-input-number v-model="store.formData.frameMargin" :min="1"/>
      </el-form-item>
      <el-form-item :label="$t('silentThreshold')">
        <el-slider v-model="store.formData.silentThreshold" show-input/>
      </el-form-item>
      <el-form-item :label="$t('motionThreshold')">
        <el-slider v-model="store.formData.motionThreshold" show-input/>
      </el-form-item>
      <el-form-item :label="$t('exportMode')">
        <el-select v-model="store.formData.exportMode">
          <el-option :label="$t('exportModeDescription.default')" value="default"/>
          <el-option :label="$t('exportModeDescription.premiere')" value="premiere"/>
          <el-option :label="$t('exportModeDescription.final-cut-pro')" value="final-cut-pro"/>
          <el-option :label="$t('exportModeDescription.shotcut')" value="shotcut"/>
          <el-option :label="$t('exportModeDescription.json')" value="json"/>
          <el-option :label="$t('exportModeDescription.clip-sequence')" value="clip-sequence"/>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('whetherOpenAfterFinished')">
        <el-switch v-model="store.formData.whetherOpenAfterFinished"/>
      </el-form-item>
    </el-form>

    <n-code id="cmd" v-show="store.whetherFilePathIsValid">{{ store.command }}</n-code>

    <n-popover trigger="click">
      <template #trigger>
        <el-button id="copy-button" data-clipboard-action="copy" data-clipboard-target="#cmd" :disabled="!store.whetherFilePathIsValid">
          {{ store.whetherFilePathIsValid ? $t("copyButtonText") : $t("noticeToEnterFileName") }}
        </el-button>
      </template>
      <span>{{ $t("copySuccessfully") }}</span>
    </n-popover>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  margin: 0 10ch;
}

.el-form {
  margin-top: 10px;
}

#copy-button {
  width: max-content;
  align-self: center;
}

#cmd {
  resize: vertical;
  overflow: auto;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px black solid;
}

main div {
  flex-wrap: wrap;
}
</style>