<script setup lang="ts">
import {useStore} from "../store";
import {Pointer} from "@element-plus/icons-vue";
import ClipboardJS from "clipboard";
import {UploadRawFile} from "element-plus";
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const store = useStore();

const {t} = useI18n({
  messages: {
    zh: {
      toAddNewFile: "新增文件",
      filePathKeyDesc: "文件夹所在路径",
      filePathValueDesc: "视频文件名",
      frameMargin: "剪切处的富裕帧数（类似于出血边）:",
      exportMode: "生成格式",
      silentThreshold: "音量阈值(%)",
      motionThreshold: "动画阈值(%)",
      whetherOpenAfterFinished: "是否在生成结束后打开文件",
      whetherUseGpuAcceleration: "是否使用GPU加速",
      copyButtonText: "复制指令到剪贴板",
      copySuccessfully: "复制成功",

      noticeToEnterFileName: "请先在上方输入文件名",

      chooseFileText: "拖拽文件 / 选择文件",
      chooseFileTip: "由于安全限制，您的文件不会被上传。因此，仅能获取到文件的名称",

      exportModeDescription: {
        default: "剪辑后的视频",
        premiere: "xml文件(支持导入premiere/达芬奇等)",
        "final-cut-pro": "final-cut-pro",
        "shotcut": "ShotCut格式",
        "json": "Json文件",
        "clip-sequence": "分别导出剪辑后的每个视频片段",
      }
    },
    en: {
      toAddNewFile: "Add new file",
      filePathKeyDesc: "Path of directory",
      filePathValueDesc: "File name",
      frameMargin: `Frame margin ("silent" frames on either side of the "loud" sections)`,
      exportMode: `Choose the export mode`,
      silentThreshold: "Threshold of audio(%)",
      motionThreshold: "Threshold of motion(%)",
      whetherOpenAfterFinished: "open the file after editing is done",
      whetherUseGpuAcceleration: "use GPU acceleration",
      copyButtonText: "copy the command to clipboard",
      copySuccessfully: "copy successfully",

      noticeToEnterFileName: `Please enter "file name"`,

      chooseFileText: "Drop file here / click to choose",
      chooseFileTip: "Due to security restrictions, your file will not be uploaded. Therefore, only the name of the file can be obtained",

      exportModeDescription: {
        default: "single video",
        premiere: "xml file(can be imported to Premiere, Sony Vegas, Davinci, etc)",
        "final-cut-pro": "for final-cut-pro",
        "shotcut": "for ShotCut",
        "json": "json file",
        "clip-sequence": "create many video clips that can be imported and manipulated like normal",
      }
    },
  },
});


new ClipboardJS("#copy-button");


const exportModeOptions = computed(() => [
  {
    label: t("exportModeDescription.default"),
    value: "default",
  },
  {
    label: t("exportModeDescription.premiere"),
    value: "premiere",
  },
  {
    label: t("exportModeDescription.final-cut-pro"),
    value: "final-cut-pro",
  },
  {
    label: t("exportModeDescription.shotcut"),
    value: "shotcut",
  },
  {
    label: t("exportModeDescription.json"),
    value: "json",
  },
  {
    label: t("exportModeDescription.clip-sequence"),
    value: "clip-sequence",
  },
]);


function beforeUpload(rawFile: UploadRawFile) {
  for (const filePath of store.filePaths) {
    // 有坑就填上
    if (!filePath.key && !filePath.value) {
      filePath.value = rawFile.name;
      return false;
    }
  }
  // 没坑就加一个
  store.filePaths.push({key: "", value: rawFile.name});
  return false;
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
        :value-placeholder="t('filePathValueDesc')">
      <template #create-button-default>
        {{ t("toAddNewFile") }}
      </template>
    </n-dynamic-input>

    <el-divider/>

    <el-form :model="store.formData">
      <el-form-item :label="t('exportMode')">
        <n-select v-model:value="store.formData.exportMode" :options="exportModeOptions"/>
      </el-form-item>

      <el-form-item :label="t('silentThreshold')">
        <el-slider v-model="store.formData.silentThreshold" show-input/>
      </el-form-item>

      <el-form-item :label="t('motionThreshold')">
        <el-slider v-model="store.formData.motionThreshold" show-input/>
      </el-form-item>

      <el-form-item :label="t('frameMargin')">
        <el-input-number v-model="store.formData.frameMargin" :min="0"/>
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