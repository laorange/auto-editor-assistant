<script setup lang="ts">
import {useStore} from "../store";

const store = useStore()

import {useI18n} from "vue-i18n";

const {t} = useI18n()


// ---

import ClipboardJS from "clipboard";
import {Pointer} from "@element-plus/icons-vue"
import {UploadRawFile} from "element-plus";

new ClipboardJS('#copy-button');

function beforeUpload(rawFile: UploadRawFile) {
  for (const filePath of store.filePaths) {
    // 有坑就填上
    if (!filePath.key && !filePath.value) {
      filePath.value = rawFile.name
      return false
    }
  }
  // 没坑就加一个
  store.filePaths.push({key: "", value: rawFile.name})
  return false
}
</script>

<template>
  <main>

    <el-upload
        class="upload-demo"
        drag
        multiple
        :before-upload="beforeUpload"
    >
      <el-icon class="el-icon--upload">
        <pointer/>
      </el-icon>
      <div style="font-size: x-large">
        {{ t("chooseFileText") }}
      </div>
      <div class="el-upload--text">
        {{ t("chooseFileTip") }}
      </div>
    </el-upload>

    <n-dynamic-input
        v-model:value="store.filePaths"
        preset="pair"
        :key-placeholder="t('filePathKeyDesc')"
        :value-placeholder="t('filePathValueDesc')"
        :min="1"
    />

    <el-form :model="store.formData">
      <el-form-item :label="t('frameMargin')">
        <el-input-number v-model="store.formData.frameMargin" :min="1"/>
      </el-form-item>

      <el-form-item :label="t('silentThreshold')">
        <el-slider v-model="store.formData.silentThreshold" show-input/>
      </el-form-item>

      <el-form-item :label="t('motionThreshold')">
        <el-slider v-model="store.formData.motionThreshold" show-input/>
      </el-form-item>

      <el-form-item :label="t('exportMode')">
        <el-select v-model="store.formData.exportMode">
          <el-option :label="t('exportModeDescription.default')" value="default"/>
          <el-option :label="t('exportModeDescription.premiere')" value="premiere"/>
          <el-option :label="t('exportModeDescription.final-cut-pro')" value="final-cut-pro"/>
          <el-option :label="t('exportModeDescription.shotcut')" value="shotcut"/>
          <el-option :label="t('exportModeDescription.json')" value="json"/>
          <el-option :label="t('exportModeDescription.clip-sequence')" value="clip-sequence"/>
        </el-select>
      </el-form-item>

      <el-form-item :label="t('whetherOpenAfterFinished')">
        <el-switch v-model="store.formData.whetherOpenAfterFinished"/>
      </el-form-item>

      <el-form-item :label="t('whetherUseGpuAcceleration')">
        <el-switch v-model="store.formData.whetherUseGpuAcceleration"/>
      </el-form-item>

    </el-form>

    <n-code id="cmd" v-show="store.whetherFilePathIsValid">{{ store.command }}</n-code>

    <n-popover trigger="click">
      <template #trigger>
        <el-button id="copy-button"
                   size="large"
                   :type="store.whetherFilePathIsValid?'success':'default'"
                   data-clipboard-action="copy"
                   data-clipboard-target="#cmd"
                   :disabled="!store.whetherFilePathIsValid">
          {{ store.whetherFilePathIsValid ? t("copyButtonText") : t("noticeToEnterFileName") }}
        </el-button>
      </template>
      <span>{{ t("copySuccessfully") }}</span>
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